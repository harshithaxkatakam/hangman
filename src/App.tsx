import React, { useState, useEffect, useCallback } from 'react';
import { carBrands } from './data/carBrands';
import { Hangman } from './components/Hangman';
import { Keyboard } from './components/Keyboard';
import { Car } from 'lucide-react';

function App() {
  const [word, setWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const initGame = useCallback(() => {
    const randomWord = carBrands[Math.floor(Math.random() * carBrands.length)];
    setWord(randomWord);
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameStatus('playing');
  }, []);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGuess = (letter: string) => {
    if (gameStatus !== 'playing') return;

    setGuessedLetters(prev => new Set([...prev, letter]));
    
    if (!word.includes(letter)) {
      const newWrongGuesses = wrongGuesses + 1;
      setWrongGuesses(newWrongGuesses);
      if (newWrongGuesses >= 6) {
        setGameStatus('lost');
      }
    } else {
      const isWon = [...word].every(char => 
        char === ' ' || guessedLetters.has(char) || char === letter
      );
      if (isWon) {
        setGameStatus('won');
      }
    }
  };

  const maskedWord = word
    .split('')
    .map(letter => (letter === ' ' ? ' ' : guessedLetters.has(letter) ? letter : '_'))
    .join(' ');

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center gap-2 mb-8">
            <Car className="w-8 h-8 text-violet-500" />
            <h1 className="text-3xl font-bold text-gray-800">Guess the Car Brand</h1>
          </div>

          <div className="flex justify-center mb-8">
            <Hangman wrongGuesses={wrongGuesses} />
          </div>

          <div className="text-center mb-8">
            <p className="text-2xl font-mono tracking-wider mb-4">{maskedWord}</p>
            <p className="text-gray-600">
              Wrong guesses: {wrongGuesses} / 6
            </p>
          </div>

          {gameStatus !== 'playing' && (
            <div className="text-center mb-8">
              <p className={`text-xl font-bold ${gameStatus === 'won' ? 'text-green-600' : 'text-red-600'}`}>
                {gameStatus === 'won' ? 'Congratulations! You won!' : `Game Over! The word was: ${word}`}
              </p>
              <button
                onClick={initGame}
                className="mt-4 px-6 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
              >
                Play Again
              </button>
            </div>
          )}

          <Keyboard
            guessedLetters={guessedLetters}
            onGuess={handleGuess}
            disabled={gameStatus !== 'playing'}
          />
        </div>
      </div>
    </div>
  );
}

export default App;