import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Homepage from './components/Homepage';
import Layout from './components/Layout';
import PublicLayout from './components/PublicLayout';
import Dashboard from './components/Dashboard';
import Recordatorios from './components/Recordatorios';
import Planes from './components/Planes';
import Settings from './components/Settings';
import FAQ from './components/FAQ';
import Equipo from './components/Equipo';
import QuienesSomos from './components/QuienesSomos';
import Privacy from './components/Privacy';
import Terms from './components/Terms';

const AppContent = () => {
  const { currentUser, loading } = useAuth();
  
  // Tipos de vistas
  type ViewType = 'homepage' | 'login' | 'register' | 'dashboard' | 'planes' | 'recordatorios' | 'settings' | 'faq' | 'equipo' | 'quienes-somos' | 'privacy' | 'terms';
  
  const [currentView, setCurrentView] = useState<ViewType>('homepage');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const viewFromUrl = urlParams.get('view') as ViewType;

    if (window.history.state?.view) {
      setCurrentView(window.history.state.view);
    } else if (viewFromUrl) {
      setCurrentView(viewFromUrl);
    }

    const handlePopState = (event: PopStateEvent) => {
      if (event.state?.view) {
        setCurrentView(event.state.view);
      } else {
        setCurrentView('homepage');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view: ViewType) => {
    if (view !== currentView) {
      window.history.pushState({ view }, '', `?view=${view}`);
      setCurrentView(view);
      window.scrollTo(0, 0); // Scroll to top on navigation
    }
  };

  useEffect(() => {
    if (currentUser && (currentView === 'login' || currentView === 'register')) {
      navigateTo('dashboard');
    }
  }, [currentUser]);

  if (loading) return <div style={{height: '100vh', display: 'grid', placeItems: 'center'}}>Cargando...</div>;

  // RUTAS PÚBLICAS
  if (!currentUser) {
    switch (currentView) {
      case 'login': return <Login onNavigate={navigateTo} />;
      case 'register': return <Register onNavigate={navigateTo} />;
      case 'homepage': return <Homepage onNavigate={navigateTo} />;
      
      case 'planes': return <PublicLayout onNavigate={navigateTo} currentView="planes"><Planes onNavigate={navigateTo} /></PublicLayout>;
      case 'faq': return <PublicLayout onNavigate={navigateTo} currentView="faq"><FAQ /></PublicLayout>;
      case 'equipo': return <PublicLayout onNavigate={navigateTo} currentView="equipo"><Equipo /></PublicLayout>;
      case 'quienes-somos': return <PublicLayout onNavigate={navigateTo} currentView="quienes-somos"><QuienesSomos /></PublicLayout>;
      case 'privacy': return <PublicLayout onNavigate={navigateTo} currentView="privacy"><Privacy /></PublicLayout>;
      case 'terms': return <PublicLayout onNavigate={navigateTo} currentView="terms"><Terms /></PublicLayout>;
        
      default: return <Homepage onNavigate={navigateTo} />;
    }
  }

  // RUTAS PRIVADAS
  return (
    <Layout onNavigate={navigateTo} currentView={currentView}>
      {currentView === 'dashboard' && <Dashboard onNavigate={navigateTo} />}
      {currentView === 'recordatorios' && <Recordatorios />}
      {currentView === 'planes' && <div className="card"><Planes onNavigate={navigateTo} /></div>}
      {currentView === 'settings' && <Settings />}
      
      {/* Vistas públicas dentro de layout privado */}
      {currentView === 'faq' && <FAQ />} 
      {currentView === 'equipo' && <Equipo />}
      {currentView === 'quienes-somos' && <QuienesSomos />}
      {currentView === 'privacy' && <Privacy />}
      {currentView === 'terms' && <Terms />}
      
      {/* Fallback */}
      {currentView !== 'dashboard' && 
       currentView !== 'recordatorios' && 
       currentView !== 'planes' && 
       currentView !== 'settings' && 
       !['faq','equipo','quienes-somos','privacy','terms'].includes(currentView) &&
       <Dashboard onNavigate={navigateTo} />}
    </Layout>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;