import React, { useEffect, useRef, useState } from 'react';
import { BotMessageSquare, CircleHelp, Heart, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import './Play.css';

const PAIRS = [
  { key: 'rings', icon: '◌', label: 'Rings' },
  { key: 'music', icon: '♫', label: 'Music' },
  { key: 'flowers', icon: '✿', label: 'Flowers' },
  { key: 'toast', icon: '✦', label: 'Toast' },
  { key: 'love', icon: '♥', label: 'Love' },
  { key: 'vows', icon: '✧', label: 'Vows' },
];

const createDeck = () => PAIRS.flatMap((pair) => [
  { ...pair, id: `${pair.key}-one` },
  { ...pair, id: `${pair.key}-two` },
]).sort(() => Math.random() - 0.5);

const conciergeReply = (question) => {
  const query = question.toLowerCase();
  if (query.includes('marriage') || query.includes('ceremony') || query.includes('vow')) return 'The marriage begins at 4:30 PM on Tuesday, 26 January at Subha Deep Villa in Maheshtala.';
  if (query.includes('reception')) return 'The reception starts at 7:00 PM on Thursday, 28 January at Bangur Avenue Town Hall.';
  if (query.includes('where') || query.includes('map') || query.includes('location') || query.includes('venue')) return 'You can find a Google Maps link for both venues on the Details and Itinerary pages.';
  if (query.includes('when') || query.includes('time') || query.includes('arrive')) return 'For the marriage, arrive from 4:30 PM; for the reception, arrive from 7:00 PM. We cannot wait to welcome you.';
  if (query.includes('rsvp') || query.includes('reply') || query.includes('respond')) return 'Please send your RSVP by 1 December 2026. The RSVP page is ready whenever you are.';
  if (query.includes('parking') || query.includes('car') || query.includes('taxi')) return 'Valet parking will be available at both venues. Taxis can use the main gate drop-off.';
  if (query.includes('wear') || query.includes('dress') || query.includes('attire')) return 'Come in whatever makes you feel festive, comfortable, and ready to celebrate.';
  return 'I can help with the wedding dates, venues, arrival times, parking, attire, and RSVP. Try asking about any of those.';
};

export const WeddingQuest = ({ embedded = false }) => {
  const [deck, setDeck] = useState(createDeck);
  const [openCards, setOpenCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);
  const [locked, setLocked] = useState(false);
  const [question, setQuestion] = useState('');
  const [reply, setReply] = useState('Hello! I’m your celebration concierge. Ask me anything about the weekend, or warm up with a quick game.');
  const timerRef = useRef(null);
  const completed = matchedIds.length === deck.length;

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const restart = () => {
    window.clearTimeout(timerRef.current);
    setDeck(createDeck());
    setOpenCards([]);
    setMatchedIds([]);
    setMoves(0);
    setLocked(false);
  };

  const flipCard = (card) => {
    if (locked || openCards.includes(card.id) || matchedIds.includes(card.id)) return;
    const nextOpen = [...openCards, card.id];
    setOpenCards(nextOpen);
    if (nextOpen.length < 2) return;
    setMoves((count) => count + 1);
    setLocked(true);
    const [firstId, secondId] = nextOpen;
    const first = deck.find((item) => item.id === firstId);
    const second = deck.find((item) => item.id === secondId);
    timerRef.current = window.setTimeout(() => {
      if (first.key === second.key) setMatchedIds((ids) => [...ids, firstId, secondId]);
      setOpenCards([]);
      setLocked(false);
    }, 680);
  };

  const askConcierge = (event) => {
    event.preventDefault();
    const trimmed = question.trim();
    if (!trimmed) return;
    setReply(conciergeReply(trimmed));
    setQuestion('');
  };

  return <section id="play" className={`play-page ${embedded ? 'play-page--embedded' : ''}`}>
    {!embedded && <header className="page-intro page-shell play-intro"><p className="eyebrow centered">A little something extra</p><h1 className="display-title">Wedding Quest</h1><p className="lead">Ask, discover, match, and unlock a little more joy before the big day.</p></header>}
    <main className="page-shell play-grid">
      <section className="concierge-card">
        <div className="concierge-mark"><BotMessageSquare size={24} strokeWidth={1.25} /><span>Smart guide</span></div>
        <div className="concierge-heading"><p className="eyebrow">Event concierge</p><h2>Need a<br /><em>little help?</em></h2></div>
        <div className="assistant-reply"><Sparkles size={16} strokeWidth={1.5} /><p>{reply}</p></div>
        <form className="concierge-form" onSubmit={askConcierge}><label htmlFor="concierge-question">Ask about the wedding</label><div><input id="concierge-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Where is the reception?" /><button type="submit" aria-label="Ask concierge">↗</button></div></form>
        <div className="question-chips"><button type="button" onClick={() => setReply(conciergeReply('Where is the marriage?'))}><CircleHelp size={13} />Marriage venue</button><button type="button" onClick={() => setReply(conciergeReply('What is the RSVP deadline?'))}><CircleHelp size={13} />RSVP deadline</button><button type="button" onClick={() => setReply(conciergeReply('Is there parking?'))}><CircleHelp size={13} />Parking</button></div>
      </section>

      <section className="memory-game" aria-label="Wedding matching game">
        <div className="game-header"><div><p className="eyebrow">Mini game</p><h2>Find the<br /><em>perfect pair.</em></h2></div><div className="game-score"><span>Pairs</span><strong>{matchedIds.length / 2} / {PAIRS.length}</strong><span>Moves</span><strong>{moves}</strong></div></div>
        {completed ? <div className="game-complete"><Trophy size={34} strokeWidth={1.25} /><p className="eyebrow centered">Quest complete</p><h3>You found every<br /><em>little moment.</em></h3><p>Thank you for playing. We saved a dance just for you.</p><button className="btn btn--outline" type="button" onClick={restart}><RotateCcw size={14} /> Play again</button></div> : <div className="memory-grid">{deck.map((card) => {
          const visible = openCards.includes(card.id) || matchedIds.includes(card.id);
          return <button className={`memory-card ${visible ? 'is-open' : ''} ${matchedIds.includes(card.id) ? 'is-match' : ''}`} key={card.id} type="button" onClick={() => flipCard(card)} aria-label={visible ? card.label : 'Reveal a card'}><span className="card-back">S <i>&amp;</i> S</span><span className="card-front"><b>{card.icon}</b><small>{card.label}</small></span></button>;
        })}</div>}
        {!completed && <button type="button" className="restart-game" onClick={restart}><RotateCcw size={14} />Restart game</button>}
      </section>
    </main>
    <section className="quest-footer"><Heart size={18} fill="currentColor" strokeWidth={1} /><p>Every celebration is better with a little play.</p></section>
  </section>;
};

const Play = () => <WeddingQuest />;

export default Play;
