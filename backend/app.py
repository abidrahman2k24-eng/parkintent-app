from dotenv import load_dotenv
load_dotenv()

import os
from flask import Flask, jsonify, request
from supabase import create_client

app = Flask(__name__)

url = os.environ.get("SUPABASE_URL")
key = os.environ.get("SUPABASE_SECRET_KEY")
supabase = create_client(url, key)

REQUIRED_FIELDS = [
    "destination",
    "trip_date",
    "arrival_time",
    "flexibility",
    "pressure",
    "recommended_area",
    "parking_duration",
    "what_happened",
]


@app.route("/api/trips", methods=["GET"])
def get_trips():
    """Return the 10 most recent trip records."""
    try:
        result = (
            supabase.table("trips")
            .select(
                "id, destination, trip_date, arrival_time, "
                "flexibility, preferred_area, pressure, "
                "recommended_area, parking_duration, "
                "what_happened, created_at"
            )
            .order("created_at", desc=True)
            .limit(10)
            .execute()
        )
        return jsonify({"trips": result.data})
    except Exception:
        return jsonify({"trips": []})


@app.route("/api/trips", methods=["POST"])
def create_trip():
    """Save a new trip record to Supabase."""
    try:
        data = request.get_json()
        if not data:
            return jsonify({"success": False, "error": "No data received"}), 400

        for field in REQUIRED_FIELDS:
            if field not in data or not str(data[field]).strip():
                return jsonify({
                    "success": False,
                    "error": f"Missing required field: {field}",
                }), 400

        trip = {
            "destination": data["destination"],
            "trip_date": data["trip_date"],
            "arrival_time": data["arrival_time"],
            "flexibility": data["flexibility"],
            "preferred_area": data.get("preferred_area") or None,
            "pressure": data["pressure"],
            "recommended_area": data["recommended_area"],
            "parking_duration": data["parking_duration"],
            "what_happened": data["what_happened"],
        }

        result = supabase.table("trips").insert(trip).execute()

        if result.data and len(result.data) > 0:
            return jsonify({"success": True, "trip": result.data[0]}), 201
        else:
            return jsonify({"success": False, "error": "Database save failed"}), 500

    except Exception:
        return jsonify({"success": False, "error": "Database save failed"}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5000)