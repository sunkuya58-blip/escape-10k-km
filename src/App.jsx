import React, { useState } from 'react';
import { storyData } from './storyData';
import { playClickSound, playGameOverSound, playSuccessSound } from './audio';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [hometown, setHometown] = useState('평양직할시');
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [chances, setChances] = useState(5);
  const [inventory, setInventory] = useState([]);

  // 생년월일에서 연도 4자리 추출 (예: 90 -> 1990, 05 -> 2005)
  const getBirthYear = (yy) => {
    const yearNum = parseInt(yy, 10);
    if (yearNum <= 24) return `20${yy}`;
    return `19${yy}`;
  };

  // {playerName}, {birthYear}, {hometown} 치환 함수
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

  const currentNode = storyData[currentNodeId];

  const handleChoice = (choice) => {
    if (choice.nextId === 'start') {
      setChances(5);
      setInventory([]);
    }

    if (choice.gainItem && !inventory.includes(choice.gainItem)) {
      setInventory([...inventory, choice.gainItem]);
    }

    const nextNode = storyData[choice.nextId];
    
    if (nextNode.isFailure) {
      const newChances = chances - 1;
      setChances(newChances);
      if (newChances <= 0) {
        playGameOverSound();
        setCurrentNodeId('total_gameover');
        return;
      }
      playGameOverSound();
    } else if (nextNode.isEnding || nextNode.isTotalGameOver) {
      if (nextNode.isBadEnding || nextNode.isTotalGameOver) {
        playGameOverSound();
      } else {
        playSuccessSound();
      }
    } else {
      playClickSound();
    }

    setCurrentNodeId(choice.nextId);
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 5; i++) {
      hearts.push(<span key={i} className={i < chances ? "heart-active" : "heart-lost"}>❤️</span>);
    }
    return hearts;
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="status-bar">
          <div className="lives">생존 기회: {renderHearts()}</div>
          <div className="inventory">가방: {inventory.length === 0 ? '비어있음' : inventory.join(', ')}</div>
        </div>
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
      </main>

    </div>
  );
}

export default App;
