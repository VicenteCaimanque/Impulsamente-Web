import React from 'react';

const Equipo: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>Conoce a los expertos</h1>
        <p>Un equipo multidisciplinario dedicado a tu éxito.</p>
      </div>

      <div className="team-legend">
        <span className="badge badge-psico">Psicología (DiverMente)</span>
        <span className="badge badge-tesis">Tutoría (Impulsa Tesis)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div className="card pro-card pro-psico">
          <div style={{fontSize:'2.5rem', marginBottom:'10px'}}>🧠</div>
          <h4>Dra. María López</h4>
          <p className="badge badge-psico">Especialista Clínica</p>
          <p style={{color:'#666', fontSize:'0.9rem'}}>Ansiedad académica | Autocuidado</p>
        </div>

        <div className="card pro-card pro-psico">
          <div style={{fontSize:'2.5rem', marginBottom:'10px'}}>🌱</div>
          <h4>Ps. Camila Rojas</h4>
          <p className="badge badge-psico">Psicóloga Educacional</p>
          <p style={{color:'#666', fontSize:'0.9rem'}}>Gestión del estrés | Hábitos</p>
        </div>

        <div className="card pro-card pro-tesis">
          <div style={{fontSize:'2.5rem', marginBottom:'10px'}}>📚</div>
          <h4>Mg. Diego Herrera</h4>
          <p className="badge badge-tesis">Metodólogo</p>
          <p style={{color:'#666', fontSize:'0.9rem'}}>Metodología | Marco teórico</p>
        </div>

        <div className="card pro-card pro-tesis">
          <div style={{fontSize:'2.5rem', marginBottom:'10px'}}>📊</div>
          <h4>Ing. Karen Díaz</h4>
          <p className="badge badge-tesis">Analista de Datos</p>
          <p style={{color:'#666', fontSize:'0.9rem'}}>Análisis de datos | Redacción</p>
        </div>
      </div>
    </div>
  );
};

export default Equipo;