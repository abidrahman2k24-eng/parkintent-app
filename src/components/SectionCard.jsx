import './SectionCard.css'

function SectionCard({ title, subtitle, children, variant = 'default' }) {
  return (
    <div className={`section-card section-card-${variant}`}>
      {title && <h2 className="section-card-title">{title}</h2>}
      {subtitle && <p className="section-card-subtitle">{subtitle}</p>}
      <div className="section-card-content">
        {children}
      </div>
    </div>
  )
}

export default SectionCard