import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';

interface RegisterProps {
  onNavigate: (view: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('Las contraseñas no coinciden.');
    }
    
    if (formData.password.length < 6) {
      return setError('La contraseña debe tener al menos 6 caracteres.');
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
          displayName: formData.nombre
        });
      }
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setError('Este correo ya está registrado.');
      } else {
        setError('Error al registrar: ' + err.message);
      }
      setLoading(false);
    }
  };

  return (
    <main className="form-page-wrapper">
      <section className="register-container" style={{position:'relative'}}>
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
        <h1>Crea tu cuenta</h1>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} id="registerForm">
          <label>
            Nombre Completo
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} required />
          </label>
          <label>
            Correo Electrónico
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </label>
          <label>
            Teléfono
            <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
          </label>
          <label>
            Tipo de atención
            <select name="tipo" value={formData.tipo} onChange={handleChange} required>
              <option value="">Selecciona…</option>
              <option value="tutorias">Tutorías</option>
              <option value="psicologia">Psicólogo</option>
              <option value="mixto">Mixto</option>
            </select>
          </label>
          <label>
            Contraseña
            <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Mínimo 6 caracteres" />
          </label>
          <label>
            Confirmar Contraseña
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repite tu contraseña" />
          </label>
          
          <label style={{flexDirection:'row', alignItems:'center', gap:'10px'}}>
            <input type="checkbox" required style={{width:'auto', margin:0}} /> 
            <span style={{fontWeight:'normal'}}>Acepto Términos y Política de Privacidad</span>
          </label>
          
          <button className="btn btn-primary btn-block" type="submit" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear cuenta'}
          </button>
          
          <p className="login-link">
            ¿Ya tienes cuenta? <a onClick={() => onNavigate('login')} style={{cursor:'pointer', color:'var(--orange)'}}>Inicia sesión</a>
          </p>
        </form>
      </section>
    </main>
  );
};

export default Register;