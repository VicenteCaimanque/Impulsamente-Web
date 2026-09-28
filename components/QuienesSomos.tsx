import React from 'react';

const QuienesSomos: React.FC = () => {
  return (
    <div>
      <section className="about-hero" style={{padding:'60px 20px', textAlign:'center', background:'#fff'}}>
        <div className="container">
          <span className="pill" style={{background:'var(--orange-soft)', color:'var(--orange)', fontWeight:'bold'}}>Nuestra Esencia</span>
          <h1 style={{fontSize:'2.5rem', margin:'20px 0'}}>Impulsa Tesis + DiverMente = <br/><span style={{color:'var(--orange)'}}>ImpulsaMente</span></h1>
          
          <div style={{maxWidth:'800px', margin:'0 auto', textAlign:'left', fontSize:'1.1rem', lineHeight:'1.8', color:'var(--text)'}}>
            <p>
              Nacimos de una realidad innegable: <strong>la tesis no se hace sola, ni se vive sola.</strong> 
              En América Latina, cerca del 50% de los estudiantes no logra titularse, y muchas veces no es por falta de capacidad intelectual, 
              sino por el abrumador peso emocional, la soledad y la falta de guía estructurada.
            </p>
            <p>
              Fusionamos la rigurosidad metodológica de <strong>Impulsa Tesis</strong> con la calidez humana y psicológica de <strong>DiverMente</strong>. 
              No somos solo una plataforma de gestión; somos tu red de apoyo. Queremos cambiar la historia de la titulación, 
              transformando un proceso traumático en un viaje de crecimiento personal y profesional.
            </p>
            <div style={{marginTop:'30px', padding:'20px', background:'var(--bg)', borderRadius:'12px', borderLeft:'4px solid var(--orange)'}}>
              <strong>Nuestra Misión:</strong> Lograr que cada estudiante que pase por ImpulsaMente se titule no solo con un buen documento, 
              sino con salud mental, orgullo y herramientas para su futuro.
            </div>
          </div>
        </div>
      </section>

      <section className="contact-section" style={{padding:'60px 0', background:'var(--card)'}}>
        <div className="container">
          <h2 style={{textAlign:'center', marginBottom:'40px'}}>Hablemos</h2>
          <div className="contact-grid">
            <a href="https://wa.me/56912345678" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="icon-circle" style={{background:'#dcfce7', color:'#16a34a'}}>📱</div>
              <h3>WhatsApp</h3>
              <p>Respuesta rápida para dudas puntuales.</p>
              <span style={{color:'var(--green)', fontWeight:'bold'}}>Chat directo →</span>
            </a>
            
            <a href="https://instagram.com/impulsatesis" target="_blank" rel="noopener noreferrer" className="contact-card">
              <div className="icon-circle" style={{background:'#fce7f3', color:'#db2777'}}>📸</div>
              <h3>Instagram</h3>
              <p>Tips, comunidad y motivación diaria.</p>
              <span style={{color:'#db2777', fontWeight:'bold'}}>Síguenos →</span>
            </a>
            
            <a href="mailto:Impulsamente.inacap@gmail.com" className="contact-card">
              <div className="icon-circle" style={{background:'#e0f2fe', color:'#0284c7'}}>✉️</div>
              <h3>Correo</h3>
              <p>Consultas formales y soporte técnico.</p>
              <span style={{color:'#0284c7', fontWeight:'bold'}}>Escribir correo →</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuienesSomos;