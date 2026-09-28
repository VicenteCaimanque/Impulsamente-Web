import React, { useState, useEffect } from 'react';

interface Reminder {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  done: boolean;
}

const Recordatorios: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('impulsamente_reminders');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Entrega de Borrador', date: '2025-10-25', done: false },
      { id: '2', title: 'Cita con Tutor', date: '2025-10-28', done: true }
    ];
  });

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    localStorage.setItem('impulsamente_reminders', JSON.stringify(reminders));
  }, [reminders]);

  const changeMonth = (delta: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + delta));
    setCurrentDate(new Date(newDate));
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: days }, (_, i) => i + 1);
  };

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  const days = getDaysInMonth(currentDate);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleAddReminder = () => {
    const formattedDate = selectedDate.split('-').reverse().join('/');
    // CORRECCIÓN: Backticks agregados aquí
    const title = prompt(`Nueva tarea para el ${formattedDate}:`, "");
    if (!title) return;
    
    const newRem: Reminder = {
      id: Date.now().toString(),
      title,
      date: selectedDate,
      done: false
    };
    setReminders([newRem, ...reminders]);
  };

  const handleEditReminder = (id: string, oldTitle: string) => {
    const newTitle = prompt("Editar tarea:", oldTitle);
    if (newTitle && newTitle !== oldTitle) {
      setReminders(reminders.map(r => r.id === id ? { ...r, title: newTitle } : r));
    }
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, done: !r.done } : r));
  };

  const deleteReminder = (id: string) => {
    if (confirm("¿Eliminar tarea permanentemente?")) {
      setReminders(reminders.filter(r => r.id !== id));
    }
  };

  const activeReminders = reminders.filter(r => !r.done);
  const completedReminders = reminders.filter(r => r.done);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 className="page-title" style={{ marginBottom: 0 }}>Calendario</h1>
        <button className="btn btn-primary" onClick={handleAddReminder}>+ Tarea el {selectedDate.split('-').reverse().slice(0,2).join('/')}</button>
      </div>

      <div className="dashboard-grid">
        {/* CALENDARIO */}
        <div className="card" style={{ gridColumn: 'span 2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
            <button className="btn btn-secondary" onClick={() => changeMonth(-1)}>◀</button>
            <h3 style={{ margin: 0 }}>{currentDate.toLocaleString('es-ES', { month: 'long', year: 'numeric' }).toUpperCase()}</h3>
            <button className="btn btn-secondary" onClick={() => changeMonth(1)}>▶</button>
          </div>
          
          <div className="calendar-grid">
            {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(d => <div key={d} className="cal-day-header">{d}</div>)}
            {emptyDays.map(d => <div key={`empty-${d}`} className="cal-day empty"></div>)}
            {days.map(d => {
              const dayString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
              const hasEvent = reminders.some(r => r.date === dayString && !r.done);
              const isSelected = dayString === selectedDate;
              return (
                <div key={d} className={`cal-day ${hasEvent ? 'has-event' : ''} ${isSelected ? 'selected' : ''}`}
                  onClick={() => setSelectedDate(dayString)}
                  style={{ 
                    backgroundColor: isSelected ? 'var(--orange-soft)' : undefined, 
                    borderColor: isSelected ? 'var(--orange)' : undefined,
                    fontWeight: isSelected ? '800' : undefined
                  }}
                >
                  {d}
                </div>
              );
            })}
          </div>
          <p style={{marginTop: '10px', fontSize: '12px', color: '#666', textAlign: 'center'}}>💡 Haz clic en un día para ver o añadir tareas</p>
        </div>

        {/* LISTA TAREAS */}
        <div className="card">
          <h2 style={{border: 'none', marginBottom: '15px'}}>
            {selectedDate.split('-').reverse().slice(0,2).join('/')}
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {activeReminders.filter(r => r.date === selectedDate).length === 0 && <p style={{ color: '#999', fontSize: '14px', fontStyle: 'italic' }}>Nada pendiente para hoy.</p>}
            
            {activeReminders.filter(r => r.date === selectedDate).map(rem => (
              <div key={rem.id} className="reminder-item" style={{borderLeft: '4px solid var(--orange)', background: '#fff9f0'}}>
                <div style={{flex: 1, cursor: 'pointer'}} onClick={() => handleEditReminder(rem.id, rem.title)} title="Clic para editar">
                  <strong>{rem.title}</strong>
                </div>
                <div style={{display: 'flex', gap: '5px'}}>
                  <input type="checkbox" checked={rem.done} onChange={() => toggleReminder(rem.id)} style={{ width: '20px', height: '20px', cursor: 'pointer' }} />
                  <button onClick={() => deleteReminder(rem.id)} style={{border:'none', background:'none', cursor:'pointer', fontSize: '1.2rem'}}>🗑️</button>
                </div>
              </div>
            ))}
          </div>

          <h3 style={{fontSize: '1rem', color: '#666', borderTop: '1px solid #eee', paddingTop: '15px', marginTop: '10px'}}>Historial</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {completedReminders.length === 0 && <p style={{ color: '#ccc', fontSize: '12px' }}>Aún no hay tareas completadas.</p>}
            {completedReminders.slice(0, 5).map(rem => (
              <div key={rem.id} className="reminder-item done" style={{opacity: 0.6, padding: '8px'}}>
                <div style={{flex: 1}}>
                  <span style={{textDecoration: 'line-through'}}>{rem.title}</span>
                  <div style={{ fontSize: '10px', color: '#999' }}>{rem.date}</div>
                </div>
                <input type="checkbox" checked={rem.done} onChange={() => toggleReminder(rem.id)} style={{cursor: 'pointer'}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recordatorios;