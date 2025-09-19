// api/proxy.js - VERSIÓN CORREGIDA
export default async function handler(req, res) {
  // Configurar headers de seguridad CORRECTOS para Vercel
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Content-Security-Policy', "default-src 'self' https:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:;");
  
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    console.log('📨 Received request:', req.body);
    
    const response = await fetch('https://script.google.com/macros/s/AKfycbyntjG0tuiJGmhvFN8t9sxPIyJVjZyirGXiKR8qLWS5CdfxU2QvYnWM7_htJYUvDMdCzw/exec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body)
    });
    
    const data = await response.text();
    console.log('✅ Google Apps Script response:', data);
    
    // Enviar respuesta al cliente
    res.status(200).send(data);
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
