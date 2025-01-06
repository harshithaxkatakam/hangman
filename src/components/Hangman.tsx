import React from 'react';

interface HangmanProps {
  wrongGuesses: number;
}

export const Hangman: React.FC<HangmanProps> = ({ wrongGuesses }) => {
  return (
    <div className="w-48 h-48 relative">
      {/* Base */}
      <div className="absolute bottom-0 w-full h-1 bg-gray-800" />
      {/* Pole */}
      <div className="absolute bottom-0 left-24 w-1 h-48 bg-gray-800" />
      {/* Top */}
      <div className="absolute top-0 left-24 w-24 h-1 bg-gray-800" />
      {/* Rope */}
      <div className="absolute top-0 right-0 w-1 h-8 bg-gray-800" />
      
      {/* Head */}
      {wrongGuesses > 0 && (
        <div className="absolute top-8 right-[-10px] w-[22px] h-[22px] rounded-full border-4 border-gray-800" />
      )}
      {/* Body */}
      {wrongGuesses > 1 && (
        <div className="absolute top-[64px] left-[190px] w-1 h-16 bg-gray-800" />
      )}
      {/* Left Arm */}
      {wrongGuesses > 2 && (
        <div className="absolute top-[87px] left-48 w-8 h-1 bg-gray-800 origin-right rotate-45" />
      )}
      {/* Right Arm */}
      {wrongGuesses > 3 && (
        <div className="absolute top-16 right-2 w-8 h-1 bg-gray-800 origin-right -rotate-45" />
      )}
      {/* Left Leg */}
      {wrongGuesses > 4 && (
        <div className="absolute top-[150px] left-48 w-8 h-1 bg-gray-800 origin-right rotate-45" />
      )}
      {/* Right Leg */}
      {wrongGuesses > 5 && (
        <div className="absolute top-[128px] right-2 w-8 h-1 bg-gray-800 origin-right -rotate-45" />
      )}
    </div>
  );
};