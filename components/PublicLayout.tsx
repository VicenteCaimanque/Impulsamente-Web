import React, { useState } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
  onNavigate: (view: any) => void;
  currentView: string;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children, onNavigate, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="homepage">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" onClick={() => onNavigate('homepage')}>
            <img src="/logo.jpeg" alt="Logo" className="brand-logo" />
            <span className="brand-text">Impulsamente</span>
          </a>

          <nav className={`main-nav ${isMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><a className={currentView === 'homepage' ? 'active' : ''} onClick={() => onNavigate('homepage')}>Inicio</a></li>
              <li><a className={currentView === 'quienes-somos' ? 'active' : ''} onClick={() => onNavigate('quienes-somos')}>Quiénes Somos</a></li>
              <li><a className={currentView === 'equipo' ? 'active' : ''} onClick={() => onNavigate('equipo')}>Equipo</a></li>
              <li><a className={currentView === 'planes' ? 'active' : ''} onClick={() => onNavigate('planes')}>Planes</a></li>
              <li><a className={currentView === 'faq' ? 'active' : ''} onClick={() => onNavigate('faq')}>Ayuda</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => onNavigate('login')}>Inicia sesión</button>
            <button className="btn btn-primary" onClick={() => onNavigate('register')}>Regístrate</button>
            <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <div className="mobile-menu">
          <a onClick={() => { setIsMenuOpen(false); onNavigate('homepage'); }}>Inicio</a>
          <a onClick={() => { setIsMenuOpen(false); onNavigate('quienes-somos'); }}>Quiénes Somos</a>
          <a onClick={() => { setIsMenuOpen(false); onNavigate('equipo'); }}>Equipo</a>
          <a onClick={() => { setIsMenuOpen(false); onNavigate('planes'); }}>Planes</a>
          <a onClick={() => { setIsMenuOpen(false); onNavigate('faq'); }}>Ayuda</a>
          <hr style={{ borderColor: 'var(--line)' }} />
          <button className="btn btn-secondary btn-block" onClick={() => onNavigate('login')}>Inicia sesión</button>
          <button className="btn btn-primary btn-block" onClick={() => onNavigate('register')}>Regístrate</button>
        </div>
      )}

      <main style={{minHeight: '60vh'}}>
        {children}
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <a className="brand" onClick={() => onNavigate('homepage')} style={{color: '#fff', marginBottom: '20px', display: 'block', cursor:'pointer'}}>
              <img src="/logo.jpeg" alt="Logo" className="brand-logo" />
              <span className="brand-text">Impulsamente</span>
            </a>
            <p style={{opacity:0.8}}>Acompañamiento integral para estudiantes universitarios.</p>
          </div>
          <div className="footer-col">
            <h4>Navegación</h4>
            <ul className="footer-links">
              <li><a onClick={() => onNavigate('homepage')}>Inicio</a></li>
              <li><a onClick={() => onNavigate('planes')}>Planes</a></li>
              <li><a onClick={() => onNavigate('quienes-somos')}>Quiénes Somos</a></li>
              <li><a onClick={() => onNavigate('faq')}>Centro de Ayuda</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul className="footer-links">
              <li><a onClick={() => onNavigate('privacy')}>Política de Privacidad</a></li>
              <li><a onClick={() => onNavigate('terms')}>Términos de Uso</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Contacto</h4>
            <ul className="footer-links">
              <li><a href="mailto:Impulsamente.inacap@gmail.com">Soporte Email</a></li>
              <li><a href="https://instagram.com/impulsatesis" target="_blank">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="container footer-copy">
          <p style={{textAlign: 'center', opacity: 0.5, fontSize: '0.8rem', borderTop: '1px solid #333', paddingTop: '20px'}}>
            © 2025 Impulsamente. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;