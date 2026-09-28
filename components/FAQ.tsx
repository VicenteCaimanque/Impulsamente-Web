import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const questions = [
    { cat: 'cuenta', q: '¿Cómo recupero mi contraseña?', a: 'Ve al inicio de sesión y pulsa en "¿Olvidaste tu contraseña?".' },
    { cat: 'cuenta', q: '¿Cómo cambio mi correo?', a: 'Desde Configuración > Perfil puedes editar tu correo.' },
    { cat: 'pagos', q: '¿Métodos de pago?', a: 'Tarjetas de crédito, débito y transferencias.' },
    { cat: 'pagos', q: '¿Reembolsos?', a: 'Garantía de 7 días de satisfacción.' },
    { cat: 'plataforma', q: '¿Certificados?', a: 'Sí, al completar el 100% de los hitos.' },
    { cat: 'plataforma', q: '¿Acceso móvil?', a: 'Sí, la plataforma es 100% responsive.' },
  ];

  const filtered = questions.filter(item => {
    const matchesFilter = filter === 'all' || item.cat === filter;
    const matchesSearch = item.q.toLowerCase().includes(searchTerm.toLowerCase()) || item.a.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>¿Cómo podemos ayudarte?</h1>
        <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
          <input 
            type="text" 
            placeholder="Buscar..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '12px 20px', borderRadius: '50px', border: '1px solid #ddd', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
          />
        </div>
      </div>

      <div className="categories-grid">
        <div className={`cat-card ${filter==='all'?'active':''}`} onClick={() => setFilter('all')}>🌐 Ver Todo</div>
        <div className={`cat-card ${filter==='cuenta'?'active':''}`} onClick={() => setFilter('cuenta')}>👤 Cuenta</div>
        <div className={`cat-card ${filter==='pagos'?'active':''}`} onClick={() => setFilter('pagos')}>💳 Pagos</div>
        <div className={`cat-card ${filter==='plataforma'?'active':''}`} onClick={() => setFilter('plataforma')}>💻 Plataforma</div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {filtered.map((item, idx) => (
          <details key={idx} className="acc-item">
            <summary className="acc-summary">{item.q}</summary>
            <div className="acc-content">{item.a}</div>
          </details>
        ))}
        {filtered.length === 0 && <p style={{textAlign:'center', color:'#999'}}>No se encontraron resultados.</p>}
      </div>
    </div>
  );
};

export default FAQ;