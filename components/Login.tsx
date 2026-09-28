import React, { useState } from 'react';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

interface LoginProps {
  onNavigate: (view: any) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setError('Error al iniciar con Google: ' + err.message);
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      setError('Credenciales incorrectas. Nota: Si creaste tu cuenta con Google, usa el botón de Google arriba.');
      setLoading(false);
    }
  };

  return (
    <main className="form-page-wrapper">
      <section className="login-container" style={{position:'relative'}}>
        <button 
          onClick={() => onNavigate('homepage')}
          style={{position:'absolute', top:'20px', left:'20px', background:'none', border:'none', cursor:'pointer', fontSize:'1.2rem', color:'#666'}}
          title="Volver al inicio"
        >
          ←
        </button>

        <a className="brand form-brand" onClick={() => onNavigate('homepage')}>
          <img src="/logo.jpeg" alt="Logo" className="brand-logo big" />
          <span className="brand-text">Impulsamente</span>
        </a>
        <h1>Inicia sesión</h1>

        {error && <div className="error-message">{error}</div>}

        <button 
          type="button" 
          className="btn-google" 
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google G" />
          {loading ? 'Conectando...' : 'Continuar con Google'}
        </button>

        <div className="separator">
          <span>o ingresa con tu correo</span>
        </div>

        <form onSubmit={handleEmailLogin}>
          <label>
            Correo Electrónico
            <input 
              type="email" 
              placeholder="tucorreo@ejemplo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </label>
          <label>
            Contraseña
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </label>
          <div className="form-options">
            <a href="#" onClick={(e) => e.preventDefault()}>¿Olvidaste tu contraseña?</a>
          </div>
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
          <p className="register-link">
            ¿No tienes cuenta? <a onClick={() => onNavigate('register')} style={{cursor:'pointer', color:'var(--orange)'}}>Crea una aquí</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Login;