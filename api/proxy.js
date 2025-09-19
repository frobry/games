// api/proxy.js
export default async function handler(req, res) {
  // Habilitar CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
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
    
    res.status(200).send(data);
    
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message 
    });
  }
}
