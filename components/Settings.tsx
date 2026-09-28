import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security'>('profile');

  return (
    <div className="container" style={{padding:'20px 0'}}>
      <h1 className="page-title">Configuración</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '30px' }}>
        
        {/* Menu */}
        <div className="card" style={{ height: 'fit-content', padding: '10px' }}>
          <button className={`nav-item ${activeTab==='profile'?'active':''}`} onClick={()=>setActiveTab('profile')}>👤 Perfil</button>
          <button className={`nav-item ${activeTab==='notifications'?'active':''}`} onClick={()=>setActiveTab('notifications')}>🔔 Notificaciones</button>
          <button className={`nav-item ${activeTab==='security'?'active':''}`} onClick={()=>setActiveTab('security')}>🔒 Seguridad</button>
        </div>

        {/* Content */}
        <div className="card">
          {activeTab === 'profile' && (
            <form onSubmit={e=>e.preventDefault()}>
              <h2>Información Personal</h2>
              <div style={{display:'grid', gap:'15px', marginTop:'20px'}}>
                <div style={{textAlign:'center', marginBottom:'10px'}}>
                  <div className="avatar" style={{width:80, height:80, margin:'0 auto', fontSize:'2rem'}}>👤</div>
                  <button className="btn btn-secondary" style={{marginTop:'10px', fontSize:'0.8rem'}}>Cambiar Foto</button>
                </div>
                <label>Nombre Completo <input type="text" defaultValue={currentUser?.displayName||''} /></label>
                <label>Email <input type="email" defaultValue={currentUser?.email||''} disabled style={{background:'#f5f5f5'}} /></label>
                <label>Teléfono <input type="tel" placeholder="+56 9 ..." /></label>
                <label>Universidad / Carrera <input type="text" placeholder="Ej. Ingeniería..." /></label>
                <div style={{textAlign:'right', marginTop:'20px'}}><button className="btn btn-primary">Guardar Cambios</button></div>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <div>
              <h2>Preferencias de Notificación</h2>
              <div style={{display:'grid', gap:'15px', marginTop:'20px'}}>
                <label style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <span>📧 Notificaciones por Correo</span> <input type="checkbox" defaultChecked />
                </label>
                <label style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <span>📱 Notificaciones por SMS</span> <input type="checkbox" />
                </label>
                <label style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                  <span>🔔 Alertas en el sitio</span> <input type="checkbox" defaultChecked />
                </label>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div>
              <h2>Seguridad de la Cuenta</h2>
              <div style={{display:'grid', gap:'20px', marginTop:'20px'}}>
                <div>
                  <h3>Contraseña</h3>
                  <button className="btn btn-secondary">Cambiar Contraseña</button>
                </div>
                <div>
                  <h3>Autenticación de Dos Factores (2FA)</h3>
                  <p style={{color:'#666', fontSize:'0.9rem'}}>Añade una capa extra de seguridad.</p>
                  <button className="btn btn-secondary">Activar 2FA</button>
                </div>
                <div>
                  <h3>Sesiones Activas</h3>
                  <div style={{background:'#f9f9f9', padding:'10px', borderRadius:'8px', fontSize:'0.9rem'}}>
                    <div>💻 Windows - Chrome (Actual)</div>
                    <div style={{color:'#666'}}>Santiago, Chile</div>
                  </div>
                </div>
                <div style={{borderTop:'1px solid #eee', paddingTop:'20px', marginTop:'20px'}}>
                  <h3 style={{color:'var(--red)'}}>Zona de Peligro</h3>
                  <button className="btn" style={{background:'var(--red)', color:'white', border:'none'}}>Eliminar Cuenta</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;