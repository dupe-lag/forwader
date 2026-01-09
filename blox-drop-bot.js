// Simple Telegram Bot Backend
const BOT_TOKEN = '7983638744:AAEI1es84RBpsLD3Lg2RSE0CVzeZQguhOWY';
const SECRET_TOKEN = 'LOTBLOX_PROTECTED_EXTENSION7X9A2P5R8S3V6Y1Z4';

export default {
  async fetch(request, env, ctx) {
    // Check if request has secret token
    const secret = request.headers.get('x-telegram-bot-api-secret-token');
    if (secret !== SECRET_TOKEN) {
      return new Response('Wrong secret!', { status: 401 });
    }
    
    // Get the message from Telegram
    const data = await request.json();
    
    // If it's a message
    if (data.message && data.message.text) {
      const chatId = data.message.chat.id;
      const text = data.message.text;
      
      // Reply back
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `You said: ${text}`
        })
      });
    }
    
    return new Response('OK');
  }
};
