import React, { useEffect, useRef, useState } from 'react';
import { MapPin, MessageCircleHeart, PartyPopper, Send, Sparkles } from 'lucide-react';
import './Play.css';

const BOTS = {
  mila: { name: 'Pakhi', role: 'The detail keeper', icon: MapPin, color: 'mila', greeting: 'Hello! I’m Pakhi, your wedding details bot. Need a time, a map, or the RSVP deadline? I’m on it.', acknowledgement: 'Let me check that for you.' },
  noor: { name: 'Piku', role: 'The joy bringer', icon: PartyPopper, color: 'noor', greeting: 'Hi hi! I’m Piku, your celebration bot. Ask me about arrival, attire, or just what to look forward to.', acknowledgement: 'Ooh, I love that question.' },
};

const PLACES = {
  marriage: { name: 'Subha Deep Villa', detail: 'Maheshtala · The Marriage', url: 'https://maps.app.goo.gl/DtCUizHi97hFx4Zt6', embed: 'https://www.google.com/maps?q=Subha+Deep+Villa,+Maheshtala,+West+Bengal&z=15&output=embed' },
  reception: { name: 'Bangur Avenue Town Hall', detail: 'South Dumdum · The Reception', url: 'https://maps.app.goo.gl/2w9oHvJeZHP2bTWdA', embed: 'https://www.google.com/maps?q=Bangur+Avenue+Town+Hall,+Kolkata,+West+Bengal&z=15&output=embed' },
};

const basicAnswer = (question, bot) => {
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

const normaliseQuestion = (value) => value
  .toLowerCase()
  .replace(/[^a-z0-9\s]/g, ' ')
  .replace(/\bmarraige\b/g, 'marriage')
  .replace(/\brec(?:e|ie)?ption\b/g, 'reception')
  .replace(/\bwher\b/g, 'where')
  .replace(/\bwhn\b/g, 'when')
  .replace(/\s+/g, ' ')
  .trim();

const hasAny = (query, ...phrases) => phrases.some((phrase) => query.includes(phrase));

const QUICK_QUESTIONS = [
  { label: 'Marriage details', question: 'Tell me about the marriage ceremony' },
  { label: 'Reception details', question: 'Tell me about the reception' },
  { label: 'Both maps', question: 'Show all venue maps' },
  { label: 'Arrival & parking', question: 'How should I arrive and where can I park?' },
  { label: 'What to wear?', question: 'What should I wear?' },
  { label: 'Food & dietary', question: 'Can I share dietary restrictions?' },
  { label: 'RSVP deadline', question: 'When should I RSVP?' },
  { label: 'Gift ideas', question: 'What should I bring as a gift?' },
];

const answerQuestion = (question, botKey) => {
  const query = normaliseQuestion(question);
  const bot = BOTS[botKey];
  const asksLocation = hasAny(query, 'map', 'where', 'location', 'venue', 'address', 'direction', 'route', 'navigate');
  const asksMarriage = hasAny(query, 'marriage', 'ceremony', 'vow', 'subha deep', 'maheshtala');
  const asksReception = hasAny(query, 'reception', 'bangur', 'south dumdum', 'dance', 'party');
  const asksBoth = hasAny(query, 'both venues', 'all venues', 'all place', 'both places', 'all locations', 'both locations', 'all maps', 'both maps', 'marriage and reception', 'reception and marriage');
  let text = '';
  let places = [];

  if (!query || hasAny(query, 'hello', 'hi ', 'hey', 'good morning', 'good evening')) {
    text = `Hi! I am ${bot.name}. Ask me anything about the marriage, reception, maps, arrival, attire, food, gifts, or RSVPs.`;
  } else if (hasAny(query, 'who are you', 'your name', 'what is your name', 'are you a bot')) {
    text = `I am ${bot.name}, one of Sayan and Sukanya's wedding helpers. I only share confirmed celebration details, so I will never make something up.`;
  } else if (hasAny(query, 'rsvp', 'reply', 'respond', 'confirm attendance', 'attending', 'coming')) {
    text = 'Please send your RSVP by 1 December 2026 using the RSVP page. Add every guest name and any dietary requirements there so the couple can plan with care.';
  } else if (hasAny(query, 'parking', 'park', 'car', 'cab', 'taxi', 'uber', 'ola', 'transport', 'ride', 'drive', 'drop off')) {
    text = 'Valet parking is available at both venues. Taxis and rideshares can use the main-gate drop-off. Leave a little extra time around peak arrival.';
  } else if (hasAny(query, 'wear', 'dress', 'attire', 'outfit', 'clothes', 'saree', 'suit', 'lehenga', 'colour', 'color')) {
    text = 'Wear whatever makes you feel joyful, comfortable, and ready to celebrate. A light layer can be lovely for the January evening.';
  } else if (hasAny(query, 'food', 'meal', 'menu', 'vegetarian', 'vegan', 'allergy', 'allergies', 'dietary', 'gluten', 'halal')) {
    text = 'Please add allergies, vegetarian or other dietary needs to your RSVP. The hosts will use those notes while finalising the celebration details.';
  } else if (hasAny(query, 'gift', 'present', 'bring anything', 'registry')) {
    text = 'Your presence is the greatest gift. A warm wish and your happy dancing shoes are more than enough.';
  } else if (hasAny(query, 'plus one', 'guest', 'kids', 'children', 'child', 'family member')) {
    text = 'Please RSVP for the people named on your invitation. If your guest list needs a change, contact Sayan or Sukanya directly so they can help.';
  } else if (hasAny(query, 'wheelchair', 'accessib', 'elderly', 'mobility', 'lift', 'stairs')) {
    text = 'We want everyone to feel comfortable. Please note any access or mobility needs in your RSVP, then contact Sayan or Sukanya so they can help with the best arrival plan.';
  } else if (hasAny(query, 'hotel', 'stay', 'accommodation', 'room', 'nearby')) {
    text = 'There is no official accommodation list on the invitation yet. Choose a stay that suits your route, and feel free to ask the couple for a personal suggestion.';
  } else if (hasAny(query, 'weather', 'rain', 'cold', 'hot', 'jacket', 'coat')) {
    text = 'Kolkata evenings in January can feel cooler. We cannot promise the weather, but a light layer is a comfortable idea.';
  } else if (hasAny(query, 'photo', 'photograph', 'camera', 'picture', 'video', 'social media', 'instagram')) {
    text = 'Capture the joy and share the love. Please be mindful during the important moments and follow any guidance from the couple or photographers on the day.';
  } else if (hasAny(query, 'contact', 'help', 'call', 'phone', 'email')) {
    text = 'For a detail that is not on the invitation, please contact Sayan or Sukanya directly. I can instantly help with dates, venues, maps, arrival, attire, food, gifts, and RSVPs.';
  } else if (asksLocation) {
    if (asksMarriage && !asksReception) {
      text = 'The marriage is at Subha Deep Villa in Maheshtala. Tap the card below for the live Google Maps route.';
      places = [PLACES.marriage];
    } else if (asksReception && !asksMarriage) {
      text = 'The reception is at Bangur Avenue Town Hall in South Dumdum. Tap the card below for the live Google Maps route.';
      places = [PLACES.reception];
    } else {
      text = 'Here are both celebration venues. Tap either card to open the live Google Maps route.';
      places = [PLACES.marriage, PLACES.reception];
    }
  } else if (asksMarriage && !asksReception) {
    text = 'The marriage begins at 4:30 PM on Tuesday, 26 January at Subha Deep Villa in Maheshtala.';
    places = [PLACES.marriage];
  } else if (asksReception && !asksMarriage) {
    text = 'The reception begins at 7:00 PM on Thursday, 28 January at Bangur Avenue Town Hall in South Dumdum.';
    places = [PLACES.reception];
  } else if (asksBoth || hasAny(query, 'when', 'time', 'date', 'schedule', 'itinerary', 'timeline', 'start', 'begin', 'program', 'events')) {
    text = 'The marriage is Tuesday, 26 January at 4:30 PM at Subha Deep Villa. The reception is Thursday, 28 January at 7:00 PM at Bangur Avenue Town Hall.';
  } else if (hasAny(query, 'thank', 'thanks', 'love this', 'excited', 'cant wait', 'cannot wait')) {
    text = `That makes ${bot.name} very happy. We cannot wait to celebrate with you!`;
  } else {
    const basic = basicAnswer('help', botKey);
    text = `I do not have a confirmed answer for that yet, and I do not want to guess. Try asking about maps, dates, parking, attire, food, gifts, or RSVPs. ${basic.text}`;
  }

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
      <section className={`chat-window ${bot.color}`} aria-label={`${bot.name} wedding chatbot`}><header className="chat-window-head"><BotAvatar name={bot.name} color={bot.color} /><div><strong>{bot.name}</strong><span><i />Online and ready to help</span></div><Sparkles size={18} /></header><div className="chat-messages" aria-live="polite">{messages.map((message, index) => message.from === 'user' ? <div className="user-message" key={`${message.text}-${index}`}><p>{message.text}</p><span>You</span></div> : <div className="bot-response" key={`${message.text}-${index}`}><div className="bot-message"><BotAvatar name={BOTS[message.bot].name} color={BOTS[message.bot].color} size="tiny" /><p>{message.text}</p></div>{message.places?.length > 0 && <div className="chat-map-list">{message.places.map((place) => <MapCard key={place.name} place={place} />)}</div>}</div>)}{isTyping && <div className="bot-message bot-typing"><BotAvatar name={bot.name} color={bot.color} size="tiny" /><p><i /><i /><i /></p></div>}</div><div className="chat-prompts" aria-label="Suggested wedding questions">{QUICK_QUESTIONS.map((item) => <button key={item.label} type="button" disabled={isTyping} onClick={() => sendQuestion(item.question)}>{item.label}</button>)}</div><form className="cute-chat-form" onSubmit={askBot}><label htmlFor="bot-question">Message {bot.name}</label><div><input id="bot-question" value={question} disabled={isTyping} onChange={(event) => setQuestion(event.target.value)} placeholder={activeBot === 'mila' ? 'Ask about maps, timings, or RSVP' : 'Ask about attire, food, or gifts'} /><button type="submit" disabled={!question.trim() || isTyping} aria-label={`Send message to ${bot.name}`}><Send size={16} /></button></div></form></section></div>
    <div className="chatbot-note"><MessageCircleHeart size={18} /><p>Pakhi and Piku know the wedding details by heart.</p></div>
  </section>;
};

const Play = () => <WeddingQuest />;

export default Play;
