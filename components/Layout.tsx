import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Chatbot from './Chatbot';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (view: any) => void; 
  currentView: string;
}

const Layout: React.FC<LayoutProps> = ({ children, onNavigate, currentView }) => {
  const { currentUser, logout } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => window.innerWidth > 850);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 850) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    await logout();
    onNavigate('homepage'); 
  };

  const navItems = [
    { id: 'dashboard', label: 'Inicio', icon: '🏠' }, 
    { id: 'recordatorios', label: 'Recordatorios', icon: '📅' },
  ];

  return (
    <div className="app-layout">
      <aside className={`app-sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <a href="#" className="brand" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
            <img src="/logo.jpeg" alt="Logo" className="brand-logo" />
            <span className="brand-text">Impulsamente</span>
          </a>
          <button className="menu-btn mobile-close" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>
        
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={() => { 
                onNavigate(item.id); 
                if (window.innerWidth <= 850) setIsSidebarOpen(false); 
              }}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: '20px' }}>
          <div style={{ padding: '15px', background: 'var(--orange-soft)', borderRadius: '12px', marginBottom: '10px' }}>
            <small style={{display: 'block', color: 'var(--orange2)', fontWeight: 'bold', marginBottom: '5px'}}>Plan Gratuito</small>
            {/* CORRECCIÓN: onNavigate('planes') en lugar de settings */}
            <button className="btn btn-primary btn-block" style={{fontSize: '12px', padding: '8px'}} onClick={() => onNavigate('planes')}>Mejorar Plan</button>
          </div>
        </div>
      </aside>

      <main className={`app-main ${isSidebarOpen ? 'sidebar-open' : ''}`}>
        <header className="app-header">
          <button 
            className="menu-btn" 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            style={{ background: 'transparent', border: '1px solid #ddd', borderRadius: '8px', padding: '5px 10px', fontSize: '1.2rem', cursor: 'pointer' }}
            title={isSidebarOpen ? "Cerrar menú" : "Abrir menú"}
          >
            ☰
          </button>
          
          <h2 style={{ fontSize: '1.2rem', margin: 0, marginLeft: '16px' }}>
            {currentView === 'dashboard' ? 'Panel Principal' : 
             currentView === 'settings' ? 'Configuración' :
             currentView === 'faq' ? 'Ayuda' :
             currentView.charAt(0).toUpperCase() + currentView.slice(1)}
          </h2>

          <div style={{ marginLeft: 'auto', position: 'relative' }}>
            <button 
              className="user-pill" 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              style={{ cursor: 'pointer', position: 'relative', zIndex: 101 }}
            >
              <div className="avatar">
                {currentUser?.photoURL ? <img src={currentUser.photoURL} alt="User" style={{width:'100%', height:'100%', borderRadius:'50%'}} /> : 'U'}
              </div>
              <span className="user-name-text">{currentUser?.displayName || 'Usuario'}</span>
              <span style={{ fontSize: '10px', marginLeft: '5px' }}>▼</span>
            </button>

            {isUserMenuOpen && (
              <>
                <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsUserMenuOpen(false)} />
                <div style={{
                  position: 'absolute', top: '120%', right: 0, background: 'white',
                  border: '1px solid #ddd', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  width: '200px', zIndex: 102, padding: '8px 0', overflow: 'hidden'
                }}>
                  <div style={{ padding: '10px 16px', borderBottom: '1px solid #eee' }}>
                    <small style={{ color: '#666', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{currentUser?.email}</small>
                  </div>
                  <button onClick={() => { onNavigate('settings'); setIsUserMenuOpen(false); }} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)' }}>⚙️ Configuración</button>
                  <button onClick={handleLogout} style={{ width: '100%', textAlign: 'left', padding: '12px 16px', background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}>🚪 Cerrar Sesión</button>
                </div>
              </>
            )}
          </div>
        </header>

        <div className="content-wrapper">
          {children}
        </div>

        <Chatbot />
      </main>
      
      {isSidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;