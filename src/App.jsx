import React, { useState, useEffect } from 'react';
import { storyData } from './storyData';
import { playClickSound, playGameOverSound, playSuccessSound, startBGM, stopBGM, startHeartbeat, stopHeartbeat, playTimerTick, playHiddenSuccessSound, playActionClickSound } from './audio';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hometown, setHometown] = useState('평양직할시');
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [chances, setChances] = useState(5);
  const [inventory, setInventory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);
  const [clickCount, setClickCount] = useState(0);

  const getBirthYear = (yy) => {
    const yearNum = parseInt(yy, 10);
    if (yearNum <= 24) return `20${yy}`;
    return `19${yy}`;
  };

  const parseText = (text) => {
    if (!text) return '';
    let parsed = text.replace(/{playerName}/g, playerName);
    if (birthDate && birthDate.length === 6) {
      const year = getBirthYear(birthDate.substring(0, 2));
      parsed = parsed.replace(/{birthYear}/g, year);
    }
    parsed = parsed.replace(/{hometown}/g, hometown);
    return parsed;
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() === '') {
      alert("이름을 입력해주세요!");
      return;
    }
    if (birthDate.length !== 6 || isNaN(birthDate)) {
      alert("생년월일을 숫자 6자리로 정확히 입력해주세요! (예: 900512)");
      return;
    }
    playClickSound();
    setIsGameStarted(true);
    startBGM();
  };

  const currentNode = storyData[currentNodeId];

  useEffect(() => {
    if (chances === 1) {
      startHeartbeat();
    } else {
      stopHeartbeat();
    }
  }, [chances]);

  useEffect(() => {
    if (currentNode.timeLimit) {
      setTimeLeft(currentNode.timeLimit);
    } else {
      setTimeLeft(null);
    }
    setClickCount(0);
  }, [currentNodeId, currentNode.timeLimit]);

  useEffect(() => {
    if (timeLeft === null) return;
    if (timeLeft <= 0) {
      playGameOverSound();
      handleChoice({ nextId: currentNode.timeoutNextId }, true);
      return;
    }
    const timerId = setTimeout(() => {
      playTimerTick();
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearTimeout(timerId);
  }, [timeLeft, currentNode.timeoutNextId]);

  const handleChoice = (choice, isTimeout = false, isActionSuccess = false) => {
    let nextId = choice.nextId;

    if (nextId === 'ending_korea') {
      if (chances === 5 && inventory.includes('위조 신분증') && inventory.includes('낡은 나침반')) {
        nextId = 'ending_hidden';
      }
    }

    if (nextId === 'start') {
      setChances(5);
      setInventory([]);
      startBGM();
    }

    if (choice.gainItem && !inventory.includes(choice.gainItem)) {
      setInventory([...inventory, choice.gainItem]);
    }

    const nextNode = storyData[nextId];
    
    if (nextNode.isFailure) {
      const newChances = chances - 1;
      setChances(newChances);
      if (newChances <= 0) {
        playGameOverSound();
        setCurrentNodeId('total_gameover');
        stopBGM();
        return;
      }
      if (!isTimeout) playGameOverSound();
    } else if (nextNode.isEnding || nextNode.isTotalGameOver) {
      stopBGM();
      stopHeartbeat();
      if (nextNode.isBadEnding || nextNode.isTotalGameOver) {
        playGameOverSound();
      } else if (nextNode.isHiddenEnding) {
        playHiddenSuccessSound();
      } else {
        playSuccessSound();
      }
    } else {
      if (!isTimeout && !isActionSuccess) playClickSound();
    }

    setCurrentNodeId(nextId);
  };

  const handleActionClick = () => {
    playActionClickSound();
    const newCount = clickCount + 1;
    setClickCount(newCount);
    if (newCount >= currentNode.requiredClicks) {
      handleChoice({ nextId: currentNode.successNextId }, false, true);
    }
  };

  if (!isGameStarted) {
    return (
      <div className="game-container intro-screen">
        <header className="game-header">
          <h1>약속의 땅을 향하여</h1>
          <p className="intro-subtitle">목숨을 건 자유를 향한 여정</p>
        </header>
        <main className="game-content intro-content">
          <form onSubmit={handleStartGame} className="name-form">
            <div className="input-group">
              <label htmlFor="playerName">이름</label>
              <input 
                type="text" 
                id="playerName" 
                value={playerName} 
                onChange={(e) => setPlayerName(e.target.value)} 
                placeholder="(예: 홍길동)"
                autoComplete="off"
                autoFocus
              />
            </div>
            
            <div className="input-group">
              <label htmlFor="birthDate">생년월일 (6자리)</label>
              <input 
                type="text" 
                id="birthDate" 
                value={birthDate} 
                onChange={(e) => setBirthDate(e.target.value)} 
                placeholder="(예: 900512)"
                maxLength="6"
                autoComplete="off"
              />
            </div>

            <div className="input-group">
              <label htmlFor="hometown">출신 지역</label>
              <select id="hometown" value={hometown} onChange={(e) => setHometown(e.target.value)}>
                <option value="평양직할시">평양직할시</option>
                <option value="함경북도 청진시">함경북도 청진시</option>
                <option value="량강도 혜산시">량강도 혜산시</option>
              </select>
            </div>

            <button type="submit" className="choice-button start-btn" style={{marginTop: '10px'}}>여정 시작하기</button>
          </form>
        </main>
      </div>
    );
  }

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 5; i++) {
      hearts.push(<span key={i} className={i < chances ? "heart-active" : "heart-lost"}>❤️</span>);
    }
    return hearts;
  };

  return (
    <div className={`game-container ${currentNode.isHiddenEnding ? 'hidden-ending' : ''}`}>
      <header className="game-header">
        <div className="status-bar">
          <div className="lives">생존 기회: {renderHearts()}</div>
          <div className="inventory">가방: {inventory.length === 0 ? '비어있음' : inventory.join(', ')}</div>
        </div>
        
        {timeLeft !== null && (
          <div className="timer-bar-container">
            <div className="timer-bar" style={{ width: `${(timeLeft / currentNode.timeLimit) * 100}%` }}></div>
            <div className="timer-text">{timeLeft}초 남음!</div>
          </div>
        )}

        <h1>{parseText(currentNode.title)}</h1>
      </header>

      <main className="game-content">
        <div className="image-container">
          <img src={`${import.meta.env.BASE_URL}${currentNode.image.replace(/^\//, '')}`} alt="Scene" className="scene-image" />
        </div>
        
        <div className="text-container">
          {currentNode.bibleVerse && (
            <div className="bible-verse">{currentNode.bibleVerse}</div>
          )}
          {parseText(currentNode.text).split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {currentNode.isActionEvent ? (
          <div className="action-container">
            <div className="action-progress-bg">
              <div className="action-progress-fill" style={{width: `${Math.min((clickCount / currentNode.requiredClicks) * 100, 100)}%`}}></div>
              <span className="action-progress-text">도주 게이지: {Math.min(Math.floor((clickCount / currentNode.requiredClicks) * 100), 100)}%</span>
            </div>
            <button className="action-mash-btn" onClick={handleActionClick}>
              🔥 전력 질주 (터치 연타!) 🔥
            </button>
          </div>
        ) : (
          <div className="choices-container">
            {currentNode.choices.map((choice, index) => {
              if (choice.requiredItem && !inventory.includes(choice.requiredItem)) {
                return null;
              }
              return (
                <button 
                  key={index} 
                  className={`choice-button ${currentNode.isFailure || currentNode.isTotalGameOver ? 'game-over-btn' : ''} ${currentNode.isEnding ? 'ending-btn' : ''} ${choice.requiredItem ? 'item-choice-btn' : ''}`}
                  onClick={() => handleChoice(choice)}
                >
                  {parseText(choice.text)}
                </button>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
