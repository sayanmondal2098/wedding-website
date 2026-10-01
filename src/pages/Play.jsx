import React, { useEffect, useRef, useState } from 'react';
import { MapPin, MessageCircleHeart, PartyPopper, Send, Sparkles } from 'lucide-react';
import './Play.css';

const BOTS = {
  mila: { name: 'Asha', role: 'The detail keeper', icon: MapPin, color: 'mila', greeting: 'Hello! I’m Asha, your wedding details bot. Need a time, a map, or the RSVP deadline? I’m on it.', acknowledgement: 'Let me check that for you.' },
  noor: { name: 'Rumi', role: 'The joy bringer', icon: PartyPopper, color: 'noor', greeting: 'Hi hi! I’m Rumi, your celebration bot. Ask me about arrival, attire, or just what to look forward to.', acknowledgement: 'Ooh, I love that question.' },
};

const PLACES = {
  marriage: { name: 'Subha Deep Villa', detail: 'Maheshtala · The Marriage', url: 'https://maps.app.goo.gl/DtCUizHi97hFx4Zt6', embed: 'https://www.google.com/maps?q=Subha+Deep+Villa,+Maheshtala,+West+Bengal&z=15&output=embed' },
  reception: { name: 'Bangur Avenue Town Hall', detail: 'South Dumdum · The Reception', url: 'https://maps.app.goo.gl/2w9oHvJeZHP2bTWdA', embed: 'https://www.google.com/maps?q=Bangur+Avenue+Town+Hall,+Kolkata,+West+Bengal&z=15&output=embed' },
};

const answerQuestion = (question, bot) => {
  const query = question.toLowerCase();
  let text = 'I can help with the dates, venues, arrival times, parking, attire, and RSVP. What would you like to know?';
  let places = [];
  if (query.includes('marriage') || query.includes('ceremony') || query.includes('vow')) { text = 'The marriage begins at 4:30 PM on Tuesday, 26 January at Subha Deep Villa in Maheshtala.'; places = [PLACES.marriage]; }
  else if (query.includes('reception')) { text = 'The reception starts at 7:00 PM on Thursday, 28 January at Bangur Avenue Town Hall.'; places = [PLACES.reception]; }
  else if (query.includes('all venue') || query.includes('both venue') || query.includes('all place')) { text = 'Here are both celebration venues. Tap either card to open Google Maps.'; places = [PLACES.marriage, PLACES.reception]; }
  else if (query.includes('where') || query.includes('map') || query.includes('location') || query.includes('venue')) { text = 'Here are the two places where we will celebrate. Tap a card for the full route.'; places = [PLACES.marriage, PLACES.reception]; }
  else if (query.includes('when') || query.includes('time') || query.includes('arrive')) text = 'For the marriage, arrive from 4:30 PM. For the reception, join us from 7:00 PM.';
  else if (query.includes('rsvp') || query.includes('reply') || query.includes('respond')) text = 'Please send your RSVP by 1 December 2026. We would be so happy to celebrate with you.';
  else if (query.includes('parking') || query.includes('car') || query.includes('taxi')) text = 'Valet parking is available at both venues. Taxis can use the main gate drop-off.';
  else if (query.includes('wear') || query.includes('dress') || query.includes('attire')) text = 'Wear whatever makes you feel joyful, comfortable, and ready to celebrate. Bring your brightest self.';
  if (bot === 'noor' && !text.endsWith('✨')) text = `${text} ✨`;
  return { text, places };
};

const BotAvatar = ({ name, color, size = 'regular' }) => <span className={`robot-avatar robot-avatar--${color} robot-avatar--${size}`} aria-label={`${name} bot avatar`}><i className="robot-antenna" /><span className="robot-face"><b /><b /></span><span className="robot-cheek robot-cheek--left" /><span className="robot-cheek robot-cheek--right" /></span>;
const MapCard = ({ place }) => <a className="chat-map-card" href={place.url} target="_blank" rel="noreferrer"><iframe title={`Map preview: ${place.name}`} src={place.embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" /><span className="chat-map-info"><MapPin size={15} /><span><b>{place.name}</b><small>{place.detail}</small></span><i>↗</i></span></a>;

export const WeddingQuest = ({ embedded = false }) => {
  const [activeBot, setActiveBot] = useState('mila');
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState([{ from: 'bot', bot: 'mila', text: BOTS.mila.greeting }]);
  const [isTyping, setIsTyping] = useState(false);
  const timerRef = useRef(null);
  const bot = BOTS[activeBot];

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const chooseBot = (key) => {
    window.clearTimeout(timerRef.current);
    setIsTyping(false);
    setActiveBot(key);
    setMessages([{ from: 'bot', bot: key, text: BOTS[key].greeting }]);
  };

  const sendQuestion = (rawQuestion) => {
    const text = rawQuestion.trim();
    if (!text || isTyping) return;
    setMessages((current) => [...current, { from: 'user', text }]);
    setQuestion('');
    setIsTyping(true);
    timerRef.current = window.setTimeout(() => {
      const response = answerQuestion(text, activeBot);
      setMessages((current) => [...current, { from: 'bot', bot: activeBot, text: response.text, places: response.places }]);
      setIsTyping(false);
    }, 620);
  };

  const askBot = (event) => { event.preventDefault(); sendQuestion(question); };

  return <section id="play" className={`play-page chatbot-page ${embedded ? 'play-page--embedded' : ''}`}>
    {!embedded && <header className="page-intro page-shell play-intro"><p className="eyebrow centered">A little help, always</p><h1 className="display-title">Meet the wedding bots</h1><p className="lead">Tiny digital helpers for every practical question and every happy thought.</p></header>}
    <div className="page-shell chat-wrap"><div className="chat-intro"><p className="eyebrow">Your tiny helpers</p><h2>Ask away.<br /><em>We’ve got you.</em></h2><p>Two friendly celebration bots are ready to help, from the first question to the last happy dance.</p><div className="bot-switcher">{Object.entries(BOTS).map(([key, item]) => { const BotIcon = item.icon; return <button key={key} type="button" className={`bot-choice ${activeBot === key ? 'is-active' : ''} ${item.color}`} onClick={() => chooseBot(key)}><BotAvatar name={item.name} color={item.color} size="small" /><span className="bot-choice-copy"><b>{item.name}</b><small>{item.role}</small></span><BotIcon size={16} strokeWidth={1.6} /></button>; })}</div></div>
      <section className={`chat-window ${bot.color}`} aria-label={`${bot.name} wedding chatbot`}><header className="chat-window-head"><BotAvatar name={bot.name} color={bot.color} /><div><strong>{bot.name}</strong><span><i />Online and ready to help</span></div><Sparkles size={18} /></header><div className="chat-messages" aria-live="polite">{messages.map((message, index) => message.from === 'user' ? <div className="user-message" key={`${message.text}-${index}`}><p>{message.text}</p><span>You</span></div> : <div className="bot-response" key={`${message.text}-${index}`}><div className="bot-message"><BotAvatar name={BOTS[message.bot].name} color={BOTS[message.bot].color} size="tiny" /><p>{message.text}</p></div>{message.places?.length > 0 && <div className="chat-map-list">{message.places.map((place) => <MapCard key={place.name} place={place} />)}</div>}</div>)}{isTyping && <div className="bot-message bot-typing"><BotAvatar name={bot.name} color={bot.color} size="tiny" /><p><i /><i /><i /></p></div>}</div><div className="chat-prompts"><button type="button" disabled={isTyping} onClick={() => sendQuestion('Show marriage map')}>Marriage map</button><button type="button" disabled={isTyping} onClick={() => sendQuestion('Show reception map')}>Reception map</button><button type="button" disabled={isTyping} onClick={() => sendQuestion('Show all venues')}>All venues</button></div><form className="cute-chat-form" onSubmit={askBot}><label htmlFor="bot-question">Message {bot.name}</label><div><input id="bot-question" value={question} disabled={isTyping} onChange={(event) => setQuestion(event.target.value)} placeholder={activeBot === 'mila' ? 'Where is the reception?' : 'What should I wear?'} /><button type="submit" disabled={!question.trim() || isTyping} aria-label={`Send message to ${bot.name}`}><Send size={16} /></button></div></form></section></div>
    <div className="chatbot-note"><MessageCircleHeart size={18} /><p>Asha and Rumi know the wedding details by heart.</p></div>
  </section>;
};

const Play = () => <WeddingQuest />;

export default Play;
