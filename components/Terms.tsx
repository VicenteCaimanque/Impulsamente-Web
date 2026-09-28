import React from 'react';

const Terms: React.FC = () => {
  return (
    <div className="container" style={{ padding: '40px 0', maxWidth: '800px' }}>
      <h1 className="page-title">Términos de Uso</h1>
      <div className="card">
        <p>Bienvenido a ImpulsaMente.</p>

        <h3>1. Aceptación de los términos</h3>
        <p>Al acceder y utilizar nuestra plataforma, aceptas cumplir con estos términos. Si no estás de acuerdo, no debes utilizar nuestros servicios.</p>

        <h3>2. Servicios Académicos y Psicológicos</h3>
        <p>ImpulsaMente ofrece herramientas de gestión y conexión con profesionales. No garantizamos la aprobación de tu tesis, ya que esto depende de tu desempeño académico, pero te brindamos todas las herramientas para facilitarlo.</p>
        <p>El servicio de apoyo emocional (DiverMente) es de acompañamiento y contención, no sustituye un tratamiento psiquiátrico clínico de urgencia.</p>

        <h3>3. Responsabilidades del Usuario</h3>
        <p>Te comprometes a utilizar la plataforma de manera ética, respetuosa y legal. No debes compartir tu cuenta con terceros.</p>

        <h3>4. Pagos y Reembolsos</h3>
        <p>Ofrecemos una garantía de satisfacción de 7 días. Si no estás conforme con el servicio, puedes solicitar la devolución de tu dinero dentro de este plazo.</p>

        <h3>5. Modificaciones</h3>
        <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Te notificaremos sobre cambios significativos.</p>
      </div>
    </div>
  );
};

export default Terms;