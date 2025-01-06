import React from 'react';

interface KeyboardProps {
  guessedLetters: Set<string>;
  onGuess: (letter: string) => void;
  disabled: boolean;
}

export const Keyboard: React.FC<KeyboardProps> = ({ guessedLetters, onGuess, disabled }) => {
  const rows = [
    ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'],
    ['J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R'],
    ['S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  ];

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((letter) => {
            const isGuessed = guessedLetters.has(letter);
            return (
              <button
                key={letter}
                onClick={() => onGuess(letter)}
                disabled={isGuessed || disabled}
                className={`w-10 h-10 rounded font-bold transition-colors
                  ${isGuessed 
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-violet-500 text-white hover:bg-violet-600 active:bg-violet-700'
                  } disabled:opacity-50`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
};