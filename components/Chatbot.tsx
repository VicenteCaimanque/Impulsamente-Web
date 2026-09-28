
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('impulsamente_chat');
    return saved ? JSON.parse(saved) : [
      { id: '1', text: "Hola, soy tu asistente de ImpulsaMente. 🤖\nEstoy aquí para ayudarte con tu tesis o escucharte si te sientes abrumado. ¿Cómo estás hoy?", sender: 'bot', timestamp: Date.now() }
    ];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Inicializar API con process.env.API_KEY (Definido en vite.config.ts)
  const apiKey = process.env.API_KEY;
  let ai: GoogleGenAI | null = null;
  
  if (apiKey) {
    try {
      ai = new GoogleGenAI({ apiKey });
    } catch (e) {
      console.error("Error al inicializar Gemini:", e);
    }
  }

  useEffect(() => {
    localStorage.setItem('impulsamente_chat', JSON.stringify(messages));
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      let botResponse = "";

      if (ai) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          config: { temperature: 0.7 },
          contents: `Eres un asistente virtual llamado "ImpulsaBot" para una plataforma llamada ImpulsaMente.
          Tu tono es empático, cálido, motivador y académico.
          Si el usuario habla de tristeza o ansiedad, responde con contención emocional (DiverMente).
          Si el usuario habla de tesis, metodología o estudios, responde con guía académica (Impulsa Tesis).
          Sé conciso.
          
          Mensaje del usuario: ${userMsg.text}`
        });
        
        botResponse = response.text || "Lo siento, tuve un problema pensando. ¿Podrías repetirlo?";
      } else {
        botResponse = "⚠️ No has configurado tu API Key. Asegúrate de tener el archivo .env con VITE_API_KEY.";
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, botMsg]);

    } catch (error) {
      console.error("Error Gemini:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Lo siento, hubo un error de conexión con mi cerebro digital.",
        sender: 'bot',
        timestamp: Date.now()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed', bottom: '30px', right: '30px',
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: 'var(--orange)', color: 'white',
            border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            cursor: 'pointer', zIndex: 1000, fontSize: '30px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          💬
        </button>
      )}

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '100px', right: '30px',
          width: '350px', height: '500px', maxHeight: '80vh',
          backgroundColor: 'white', borderRadius: '16px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
          display: 'flex', flexDirection: 'column',
          zIndex: 1000, overflow: 'hidden', border: '1px solid #eee'
        }}>
          <div style={{
            padding: '15px', background: 'linear-gradient(90deg, var(--orange), var(--orange2))',
            color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
              <span style={{fontSize: '24px'}}>🤖</span>
              <div>
                <h4 style={{margin: 0, fontSize: '16px'}}>Asistente IA</h4>
                <small style={{opacity: 0.9}}>ImpulsaMente</small>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{background: 'none', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer'}}>✕</button>
          </div>

          <div style={{flex: 1, padding: '15px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', background: '#f9f9f9'}}>
            {messages.map(msg => (
              <div key={msg.id} style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '80%',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: msg.sender === 'user' ? 'var(--sky)' : 'white',
                color: msg.sender === 'user' ? '#005f7f' : '#333',
                boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                borderBottomRightRadius: msg.sender === 'user' ? '2px' : '12px',
                borderBottomLeftRadius: msg.sender === 'bot' ? '2px' : '12px',
                fontSize: '14px',
                whiteSpace: 'pre-wrap'
              }}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div style={{alignSelf: 'flex-start', background: 'white', padding: '10px', borderRadius: '12px', fontSize: '12px', color: '#999'}}>
                Escribiendo...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} style={{padding: '15px', borderTop: '1px solid #eee', display: 'flex', gap: '10px'}}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={apiKey ? "Escribe un mensaje..." : "Falta VITE_API_KEY"}
              disabled={!apiKey}
              style={{flex: 1, padding: '10px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none'}}
            />
            <button type="submit" disabled={!apiKey} style={{background: apiKey ? 'var(--orange)' : '#ccc', color: 'white', border: 'none', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer'}}>
              ➤
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
