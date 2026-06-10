import React, { useState } from 'react';
import { storyData } from './storyData';
import { playClickSound, playGameOverSound, playSuccessSound } from './audio';
import './App.css';

function App() {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [chances, setChances] = useState(5);

  const currentNode = storyData[currentNodeId];

  const handleChoice = (nextId) => {
    if (nextId === 'start') {
      setChances(5);
    }

    const nextNode = storyData[nextId];
    
    if (nextNode.isFailure) {
      const newChances = chances - 1;
      setChances(newChances);
      if (newChances <= 0) {
        playGameOverSound();
        setCurrentNodeId('total_gameover');
        return;
      }
      playGameOverSound();
    } else if (nextNode.isEnding) {
      if (nextNode.isBadEnding) {
        playGameOverSound();
      } else {
        playSuccessSound();
      }
    } else if (nextNode.isTotalGameOver) {
      playGameOverSound();
    } else {
      playClickSound();
    }

    setCurrentNodeId(nextId);
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
        </div>
        <h1>{currentNode.title}</h1>
      </header>

      <main className="game-content">
        <div className="image-container">
          <img src={currentNode.image} alt="Scene" className="scene-image" />
        </div>
        
        <div className="text-container">
          {currentNode.text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        <div className="choices-container">
          {currentNode.choices.map((choice, index) => (
            <button 
              key={index} 
              className={`choice-button ${currentNode.isFailure || currentNode.isTotalGameOver ? 'game-over-btn' : ''} ${currentNode.isEnding ? 'ending-btn' : ''}`}
              onClick={() => handleChoice(choice.nextId)}
            >
              {choice.text}
            </button>
          ))}
        </div>
      </main>

      <footer className="game-footer">
        <p>제작: 태희아빠</p>
      </footer>
    </div>
  );
}

export default App;
