import React from 'react';

interface PlanesProps {
  onNavigate?: (view: any) => void;
}

const Planes: React.FC<PlanesProps> = ({ onNavigate }) => {
  const handleSelectPlan = (planName: string, price: string) => {
    localStorage.setItem('planSeleccionado', planName);
    localStorage.setItem('precioPlan', price);
    alert(`Has seleccionado el plan ${planName}.`);
    if (onNavigate) {
      onNavigate('register'); 
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="hero-planes" style={{textAlign:'center', marginBottom:'40px'}}>
        <h2>Invierte en tu futuro</h2>
        <p>Planes flexibles para cada etapa.</p>
      </div>

      <div className="plans-grid">
        <div className="card plan-card">
          <div className="card-header">
            <h3>Inicial</h3>
            <p className="desc">Para empezar.</p>
          </div>
          <div className="plan-price">$19.990 <span>/ mes</span></div>
          <ul className="plan-features">
            <li>Acceso a comunidad</li>
            <li>Checklist semanal</li>
            <li style={{color:'#ccc', textDecoration:'line-through'}}>Revisión de tesis</li>
          </ul>
          <button className="btn btn-secondary btn-block" onClick={() => handleSelectPlan('Inicial', '19990')}>Elegir Inicial</button>
        </div>

        <div className="card plan-card popular">
          <div className="badge-popular">POPULAR</div>
          <div className="card-header">
            <h3>Impulso</h3>
            <p className="desc">Equilibrio perfecto.</p>
          </div>
          <div className="plan-price">$34.990 <span>/ mes</span></div>
          <ul className="plan-features">
            <li>Todo lo del plan Inicial</li>
            <li><strong>2 Tutorías personalizadas</strong></li>
            <li>Soporte WhatsApp</li>
          </ul>
          <button className="btn btn-primary btn-block" onClick={() => handleSelectPlan('Impulso', '34990')}>Elegir Impulso</button>
        </div>

        <div className="card plan-card">
          <div className="card-header">
            <h3>Maestría</h3>
            <p className="desc">Acompañamiento total.</p>
          </div>
          <div className="plan-price">$59.990 <span>/ mes</span></div>
          <ul className="plan-features">
            <li>Tutorías ilimitadas</li>
            <li><strong>Revisión completa</strong></li>
            <li>Sesiones psicólogo</li>
          </ul>
          <button className="btn btn-secondary btn-block" onClick={() => handleSelectPlan('Maestría', '59990')}>Elegir Maestría</button>
        </div>
      </div>

      <div className="comparison-section">
        <h3>Comparativa Detallada</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th style={{textAlign:'left'}}>Característica</th>
              <th>Inicial</th>
              <th className="highlight-col">Impulso</th>
              <th>Maestría</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Acceso 24/7</td><td><span className="check-ok">✓</span></td><td className="highlight-col"><span className="check-ok">✓</span></td><td><span className="check-ok">✓</span></td></tr>
            <tr><td>Recursos</td><td>Limitados</td><td className="highlight-col">Ilimitados</td><td>Ilimitados</td></tr>
            <tr><td>Tutorías</td><td>Grupales</td><td className="highlight-col">2 al mes</td><td>Ilimitadas</td></tr>
            <tr><td>Psicólogo</td><td><span className="check-no">✕</span></td><td className="highlight-col"><span className="check-ok">✓</span></td><td>Prioridad</td></tr>
          </tbody>
        </table>
      </div>

      <div className="trust-bar">
        <div className="trust-item">🔒 Pagos 100% Seguros</div>
        <div className="trust-item">↩️ Garantía 7 días</div>
        <div className="trust-item">🎧 Soporte 24/7</div>
      </div>
    </div>
  );
};

export default Planes;