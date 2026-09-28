import React from 'react';

const Privacy: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
      <h1 className="page-title">Política de Privacidad</h1>
      <div className="card">
        <p>Última actualización: Diciembre 2025</p>
        
        <h3>1. Información que recopilamos</h3>
        <p>En ImpulsaMente, recopilamos información que nos proporcionas directamente, como tu nombre, correo electrónico, número de teléfono y datos relacionados con tu progreso académico y estado emocional.</p>

        <h3>2. Uso de la información</h3>
        <p>Utilizamos tu información para:</p>
        <ul>
          <li>Proveer y mantener nuestros servicios de tutoría y apoyo psicológico.</li>
          <li>Personalizar tu experiencia en el dashboard.</li>
          <li>Enviarte recordatorios y actualizaciones importantes.</li>
        </ul>

        <h3>3. Protección de datos sensibles</h3>
        <p>Entendemos la sensibilidad de los datos de salud mental. Toda la información emocional se almacena de forma encriptada y solo es accesible por los profesionales asignados a tu caso (bajo estricto secreto profesional) y por ti.</p>

        <h3>4. Compartir información</h3>
        <p>No vendemos ni compartimos tus datos personales con terceros para fines comerciales. Solo compartimos datos necesarios con nuestros proveedores de infraestructura tecnológica (ej. Firebase) bajo acuerdos de confidencialidad.</p>

        <h3>5. Contacto</h3>
        <p>Si tienes dudas sobre nuestra política, escríbenos a <a href="mailto:Impulsamente.inacap@gmail.com" style={{color:'var(--orange)'}}>Impulsamente.inacap@gmail.com</a>.</p>
      </div>
    </div>
  );
};

export default Privacy;