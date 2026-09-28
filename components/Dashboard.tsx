import React, { useState, useEffect } from 'react';

interface DashboardProps {
  onNavigate: (view: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [progress, setProgress] = useState(() => {
    try { return parseInt(localStorage.getItem('impulsamente_progress') || '45'); } catch { return 45; }
  });
  const [moodLevel, setMoodLevel] = useState(() => {
    try { return parseInt(localStorage.getItem('impulsamente_mood') || '7'); } catch { return 7; }
  });
  const [upcomingTasks, setUpcomingTasks] = useState<any[]>([]);
  
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    localStorage.setItem('impulsamente_progress', progress.toString());
    localStorage.setItem('impulsamente_mood', moodLevel.toString());
  }, [progress, moodLevel]);

  useEffect(() => {
    const saved = localStorage.getItem('impulsamente_reminders');
    if (saved) {
      try {
        const all = JSON.parse(saved);
        if (Array.isArray(all)) {
          const pending = all.filter((r: any) => !r.done).sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
          setUpcomingTasks(pending);
        }
      } catch (e) {}
    }
  }, []);

  const handleUpdateProgress = () => {
    const val = prompt("Nuevo progreso (0-100):", progress.toString());
    if (val && !isNaN(Number(val))) setProgress(Math.min(100, Math.max(0, Number(val))));
  };

  const handleMoodChange = (newMood: number) => {
    const today = new Date().toISOString().split('T')[0];
    const lastUpdateDate = localStorage.getItem('impulsamente_last_mood_date');
    if (lastUpdateDate === today) {
      alert("Ya registraste tu estado de ánimo hoy.");
      return;
    }
    setMoodLevel(newMood);
    localStorage.setItem('impulsamente_last_mood_date', today);
    alert("Estado de ánimo registrado.");
  };

  const r = 70; const circ = 2 * Math.PI * r; const offset = circ - (progress / 100) * circ;

  const isWeekly = chartView === 'weekly';
  const labelsX = isWeekly ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] : ['S1', 'S2', 'S3', 'S4'];
  const prodPoints = isWeekly ? "0,100 66,50 132,40 198,90 264,60 330,40 400,30" : "0,130 133,90 266,60 400,20";
  const currentMoodY = 150 - (moodLevel * 15);
  const moodPoints = isWeekly ? `0,80 66,60 132,90 198,50 264,80 330,70 400,${currentMoodY}` : `0,90 133,70 266,60 400,${currentMoodY}`;
  const moodData = isWeekly ? [60, 70, 50, 80, 60, 70, moodLevel * 10] : [65, 55, 75, moodLevel * 10];

  return (
    <div>
      <div className="quote-card">
        <div className="quote-icon">💡</div>
        <div>
          <h3 style={{margin:0, fontStyle:'italic'}}>"No cuentes los días, haz que los días cuenten."</h3>
          <small>- Muhammad Ali</small>
        </div>
      </div>

      <div className="quick-actions-grid">
        <div className="action-btn" onClick={() => handleUpdateProgress()}>
          <div className="action-icon icon-blue">⬆️</div>
          <span>Subir Avance</span>
        </div>
        <div className="action-btn" onClick={() => onNavigate('planes')}> 
          <div className="action-icon icon-green">📅</div>
          <span>Agendar Sesión</span>
        </div>
        <div className="action-btn">
          <div className="action-icon icon-orange">📥</div>
          <span>Materiales</span>
        </div>
        <div className="action-btn" onClick={() => onNavigate('faq')}>
          <div className="action-icon icon-red">🎧</div>
          <span>Soporte</span>
        </div>
      </div>

      <h1 className="page-title">Tu Progreso</h1>
      
      <div className="dashboard-grid">
        <div className="left-column">
          <div className="row">
            <div className="card" style={{textAlign:'center'}}>
              <h2>Avance Tesis</h2>
              <div style={{position:'relative', width:160, height:160, margin:'0 auto'}}>
                <svg width="160" height="160" style={{transform:'rotate(-90deg)'}}>
                  <circle cx="80" cy="80" r="70" stroke="#eee" strokeWidth="10" fill="none" />
                  <circle cx="80" cy="80" r="70" stroke="var(--orange)" strokeWidth="10" fill="none" strokeDasharray={circ} strokeDashoffset={offset} style={{transition:'1s'}} />
                </svg>
                <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
                  <span style={{fontSize:'2.5rem', fontWeight:'800'}}>{progress}</span>
                  <span style={{fontSize:'1rem'}}>%</span>
                </div>
              </div>
              <button className="btn btn-secondary btn-block" style={{marginTop:20}} onClick={handleUpdateProgress}>Actualizar Porcentaje</button>
            </div>

            <div className="card">
              <h2>Próximo Hito</h2>
              {upcomingTasks.length > 0 ? (
                <div style={{textAlign:'center', padding:'20px 0'}}>
                  <strong style={{fontSize:'1.2rem', display:'block', marginBottom:'10px'}}>{upcomingTasks[0].title}</strong>
                  <div style={{color:'var(--orange)', marginBottom:'10px'}}>{upcomingTasks[0].date.split('-').reverse().join('/')}</div>
                  <div style={{background:'#dcfce7', color:'#16a34a', display:'inline-block', padding:'4px 10px', borderRadius:'10px', fontSize:'0.8rem', fontWeight:'bold'}}>Prioridad Alta</div>
                </div>
              ) : <p style={{textAlign:'center', color:'#999'}}>Todo al día 🎉</p>}
              <button className="btn btn-secondary btn-block" onClick={() => onNavigate('recordatorios')}>Ver calendario completo</button>
            </div>
          </div>

          <div className="card">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
              <div>
                <h2>Balance Académico-Emocional</h2>
                <p style={{fontSize:'0.85rem', color:'#666', margin:0}}>Compara cómo tu estado de ánimo influye en tu rendimiento.</p>
              </div>
              <div style={{display:'flex', gap:'10px'}}>
                <button className={`btn ${isWeekly ? 'btn-primary' : 'btn-secondary'}`} style={{padding:'5px 15px', fontSize:'0.8rem'}} onClick={() => setChartView('weekly')}>Semanal</button>
                <button className={`btn ${!isWeekly ? 'btn-primary' : 'btn-secondary'}`} style={{padding:'5px 15px', fontSize:'0.8rem'}} onClick={() => setChartView('monthly')}>Mensual</button>
              </div>
            </div>
            
            <div style={{display:'flex', flexDirection:'column', gap:'40px'}}>
              <div>
                <h4 style={{margin:'0 0 10px 0', color:'var(--sky)'}}>📈 Productividad vs Ánimo</h4>
                <div style={{position:'relative', height:'150px', borderLeft:'1px solid #eee', borderBottom:'1px solid #eee'}}>
                  <div style={{position:'absolute', left:'-25px', top:0, height:'100%', display:'flex', flexDirection:'column', justifyContent:'space-between', fontSize:'0.7rem', color:'#ccc'}}>
                    <span>Alto</span><span>Medio</span><span>Bajo</span>
                  </div>
                  <svg width="100%" height="100%" viewBox="0 0 400 150" preserveAspectRatio="none" style={{overflow:'visible'}}>
                    {[0, 37, 75, 112, 150].map(y => <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#f9f9f9" strokeWidth="1" />)}
                    <polyline points={prodPoints} fill="none" stroke="var(--sky)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    <polyline points={moodPoints} fill="none" stroke="var(--orange)" strokeWidth="3" strokeLinecap="round" strokeDasharray="6,4" />
                    <circle cx="400" cy={isWeekly ? "30" : "20"} r="5" fill="var(--sky)" stroke="white" strokeWidth="2" />
                    <circle cx="400" cy={currentMoodY} r="5" fill="var(--orange)" />
                  </svg>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.8rem', color:'#666', marginTop:5}}>
                  {labelsX.map((l, i) => <span key={i} style={{width:'14%', textAlign:'center'}}>{l}</span>)}
                </div>
                <div style={{display:'flex', justifyContent:'center', gap:'20px', marginTop:'20px'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem'}}><span style={{width:'12px', height:'12px', borderRadius:'50%', background:'var(--sky)'}}></span><span>Productividad</span></div>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', fontSize:'0.9rem'}}><span style={{width:'12px', height:'12px', borderRadius:'50%', background:'var(--orange)'}}></span><span>Estado de Ánimo</span></div>
                </div>
              </div>

              <div>
                <h4 style={{margin:'0 0 10px 0', color:'var(--orange)'}}>😊 Historial de Ánimo</h4>
                <div style={{height:150, display:'flex', alignItems:'flex-end', justifyContent:'space-around', borderBottom:'1px solid #eee', paddingBottom:'0'}}>
                  {moodData.map((val, idx) => (
                    <div key={idx} style={{width:'10%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'flex-end', alignItems:'center'}}>
                      <div style={{
                        width:'100%', 
                        height:`${val}%`, 
                        background: idx === moodData.length - 1 ? 'var(--orange)' : '#eee', 
                        borderRadius:'4px 4px 0 0',
                        transition:'height 0.5s ease',
                      }}></div>
                    </div>
                  ))}
                </div>
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'5px'}}>
                  {labelsX.map((l, i) => (
                    <span key={i} style={{fontSize:'0.8rem', color: i === labelsX.length -1 ? 'var(--orange)' : '#666', fontWeight: i === labelsX.length -1 ? 'bold' : 'normal', width:'14%', textAlign:'center'}}>
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="card" style={{textAlign:'center'}}>
            <h3>¿Cómo te sientes hoy?</h3>
            <div style={{display:'flex', justifyContent:'center', gap:'20px', fontSize:'2rem', marginTop:'15px'}}>
              <span style={{cursor:'pointer', opacity: moodLevel<=4?1:0.4}} onClick={()=>handleMoodChange(3)}>😫</span>
              <span style={{cursor:'pointer', opacity: moodLevel>4&&moodLevel<=7?1:0.4}} onClick={()=>handleMoodChange(6)}>😐</span>
              <span style={{cursor:'pointer', opacity: moodLevel>7?1:0.4}} onClick={()=>handleMoodChange(10)}>🚀</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;