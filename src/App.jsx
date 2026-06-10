import React, { useState } from 'react';
import { storyData } from './storyData';
import { playClickSound, playGameOverSound, playSuccessSound } from './audio';
import './App.css';

function App() {
  const [playerName, setPlayerName] = useState('');
  const [isGameStarted, setIsGameStarted] = useState(false);
  
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [chances, setChances] = useState(5);
  const [inventory, setInventory] = useState([]);

  // {playerName} 치환 함수
  const parseText = (text) => {
    if (!text) return '';
    return text.replace(/{playerName}/g, playerName);
  };

  const handleStartGame = (e) => {
    e.preventDefault();
    if (playerName.trim() === '') {
      alert("이름을 입력해주세요!");
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
            <label htmlFor="playerName">당신의 이름을 알려주세요</label>
            <input 
              type="text" 
              id="playerName" 
              value={playerName} 
              onChange={(e) => setPlayerName(e.target.value)} 
              placeholder="이름 입력 (예: 홍길동)"
              autoComplete="off"
              autoFocus
            />
            <button type="submit" className="choice-button start-btn">게임 시작하기</button>
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
          <img src={currentNode.image} alt="Scene" className="scene-image" />
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
