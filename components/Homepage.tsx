import React from 'react';

interface HomepageProps {
  onNavigate: (view: any) => void;
}

const TESTIMONIALS = [
  { text: "Me ayudó a organizar mi avance de tesis sin sentirme culpable por ir lento. El eco es cero invasivo.", author: "Martina, 24" },
  { text: "Antes evitaba el tema de la tesis. Ahora entro todos los días aunque sea a revisar mi estado emocional.", author: "Carlos, 26" },
  { text: "Lo que más me gustó fue el termómetro emocional. Recién entendí que no era flojera, era estrés.", author: "Valentina, 23" }
];

const Homepage: React.FC<HomepageProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => setCurrentTestimonial((p) => (p + 1) % TESTIMONIALS.length);
  const prevTestimonial = () => setCurrentTestimonial((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

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
              <li><a onClick={() => scrollToSection('inicio')}>Inicio</a></li>
              <li><a onClick={() => onNavigate('quienes-somos')}>Quiénes Somos</a></li>
              <li><a onClick={() => scrollToSection('equipo')}>Equipo</a></li>
              <li><a onClick={() => onNavigate('planes')}>Planes</a></li>
              <li><a onClick={() => onNavigate('faq')}>Ayuda</a></li>
            </ul>
          </nav>

          <div className="header-actions">
            <button className="btn btn-secondary" onClick={() => onNavigate('login')}>Inicia sesión</button>
            <button className="btn btn-primary" onClick={() => onNavigate('register')}>Regístrate</button>
            <button className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
          </div>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="container hero-inner">
          <div className="hero-copy">
            <h1>Tu tesis y tu salud mental, <span style={{color: 'var(--orange)'}}>en un solo lugar</span></h1>
            <p className="lead">
              Transformamos ideas en títulos y cuidamos tu bienestar. ImpulsaMente combina tutorías académicas con apoyo psicológico para que termines tu tesis sin descuidarte a ti mismo.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" onClick={() => onNavigate('register')}>Comenzar ahora</button>
              <button className="btn btn-secondary" onClick={() => onNavigate('quienes-somos')}>Conocer más</button>
            </div>
          </div>
          
          <div className="hero-illu" style={{display:'flex', alignItems:'center', justifyContent:'center', gap:'20px'}}>
            <div style={{width:'120px', height:'120px', borderRadius:'50%', overflow:'hidden', border:'4px solid white', boxShadow:'var(--shadow)'}}>
               <img src="/logodivermente.jpg" alt="DiverMente" style={{width:'100%', height:'100%', objectFit:'cover'}} />
            </div>
            <span style={{fontSize:'3rem', color:'white', fontWeight:'bold', textShadow:'0 2px 4px rgba(0,0,0,0.2)'}}>+</span>
            <div style={{width:'120px', height:'120px', borderRadius:'50%', overflow:'hidden', border:'4px solid white', boxShadow:'var(--shadow)'}}>
               <img src="/logoimpulsatesis.jpg" alt="Impulsa Tesis" style={{width:'100%', height:'100%', objectFit:'cover'}} />
            </div>
          </div>
        </div>
      </section>

      <section className="quote-band">
        <div className="container">
          <blockquote>
            “Nadie debería atravesar este proceso en soledad. Y que detrás de cada título, hay una historia que merece ser cuidada.”
          </blockquote>
        </div>
      </section>

      <section id="pilares" className="section" style={{background: '#fafafa'}}>
        <div className="container">
          <header className="section-head">
            <h2>Pilares fundamentales</h2>
            <p>Nuestra metodología se basa en 6 disciplinas clave</p>
          </header>
          <div className="pillars-grid">
            <article className="pillar">
              <h4>Disciplina académica</h4>
              <p>Aseguramos la rigurosidad científica y la correcta aplicación de métodos de investigación.</p>
            </article>
            <article className="pillar">
              <h4>Planificación</h4>
              <p>Ayudamos a organizar el proceso de tesis en etapas manejables y optimizar los plazos.</p>
            </article>
            <article className="pillar">
              <h4>Comunicación efectiva</h4>
              <p>Fomentamos habilidades para presentar ideas de forma clara y defender el trabajo con confianza.</p>
            </article>
            <article className="pillar">
              <h4>Resiliencia</h4>
              <p>Ofrecemos herramientas para enfrentar los desafíos emocionales y mantener la motivación.</p>
            </article>
            <article className="pillar">
              <h4>Trabajo colaborativo</h4>
              <p>Conectamos a estudiantes para compartir experiencias y construir una red de apoyo.</p>
            </article>
            <article className="pillar">
              <h4>Proyección profesional</h4>
              <p>Orientamos sobre cómo la tesis impulsa el futuro laboral y el crecimiento personal.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="equipo" className="section section-equipo">
        <div className="container">
          <header className="section-head">
            <h2>Conoce a los expertos</h2>
            <p>Un equipo multidisciplinario dedicado a tu éxito.</p>
          </header>

          <div style={{marginBottom: '50px'}}>
            <h3 style={{color: 'var(--sky)', borderBottom: '2px solid var(--sky)', paddingBottom: '10px', display:'inline-block'}}>Equipo DiverMente (Salud Mental)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '20px' }}>
              <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--sky)' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e1f5fe' }}>
                   <img src="/logodivermente.jpg" alt="DiverMente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ margin: '0 0 5px' }}>Dra. María López</h3>
                <span className="badge badge-psico" style={{ marginBottom: '15px' }}>Psicología Clínica</span>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Especialista en ansiedad académica y autocuidado.</p>
              </div>
              <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--sky)' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e1f5fe' }}>
                   <img src="/logodivermente.jpg" alt="DiverMente" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ margin: '0 0 5px' }}>Ps. Camila Rojas</h3>
                <span className="badge badge-psico" style={{ marginBottom: '15px' }}>Psicología Educacional</span>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Enfocada en gestión del tiempo y hábitos de estudio.</p>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{color: 'var(--green)', borderBottom: '2px solid var(--green)', paddingBottom: '10px', display:'inline-block'}}>Equipo Impulsa Tesis (Académico)</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '20px' }}>
              <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--green)' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e1f3d8' }}>
                   <img src="/logoimpulsatesis.jpg" alt="Impulsa Tesis" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ margin: '0 0 5px' }}>Mg. Diego Herrera</h3>
                <span className="badge badge-tesis" style={{ marginBottom: '15px' }}>Metodología</span>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Experto en estructuración de tesis y redacción académica.</p>
              </div>
              <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--green)' }}>
                <div style={{ width: '80px', height: '80px', margin: '0 auto 15px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #e1f3d8' }}>
                   <img src="/logoimpulsatesis.jpg" alt="Impulsa Tesis" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <h3 style={{ margin: '0 0 5px' }}>Ing. Karen Díaz</h3>
                <span className="badge badge-tesis" style={{ marginBottom: '15px' }}>Análisis de Datos</span>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>Especialista en estadística y validación de resultados.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-testimonios">
        <div className="container">
          <header className="section-head">
            <h2>Lo que dicen nuestros tesistas</h2>
          </header>
          <div className="carousel">
            <button className="carousel-btn prev" onClick={prevTestimonial}>‹</button>
            <div className="carousel-viewport">
              <div className="slide active" style={{ animation: 'none', transform: 'none', opacity: 1, display: 'block' }}>
                <blockquote style={{ fontSize: '1.2rem', fontStyle: 'italic', marginBottom: '20px' }}>
                  “{TESTIMONIALS[currentTestimonial].text}”
                </blockquote>
                <div style={{ fontWeight: 'bold', color: 'var(--orange2)' }}>
                  — {TESTIMONIALS[currentTestimonial].author}
                </div>
              </div>
            </div>
            <button className="carousel-btn next" onClick={nextTestimonial}>›</button>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-col">
            <a className="brand" onClick={() => onNavigate('homepage')} style={{color: '#fff', marginBottom: '20px', display: 'block', cursor:'pointer'}}>
              <img src="/logo.jpeg" alt="Logo" className="brand-logo" />
              <span className="brand-text">Impulsamente</span>
            </a>
            <p style={{opacity:0.8}}>Acompañamiento integral para estudiantes universitarios. Transformamos ideas en títulos.</p>
          </div>
          <div className="footer-col">
            <h4>Navegación</h4>
            <ul className="footer-links">
              <li><a onClick={() => scrollToSection('inicio')}>Inicio</a></li>
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
              <li><a href="mailto:Impulsamente.inacap@gmail.com">Impulsamente.inacap@gmail.com</a></li>
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

export default Homepage;