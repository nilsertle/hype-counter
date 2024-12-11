"use client";

import { useState, useEffect } from "react";
import { getCount, incrementCount } from "./actions";

export default function Home() {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    // Check if user has already voted
    const voted = localStorage.getItem("hasVoted") === "true";
    setHasVoted(voted);
    getCount().then(setCount);
  }, []);

  const handleClick = async () => {
    if (hasVoted) return;

    setIsLoading(true);
    const newCount = await incrementCount();
    setCount(newCount);
    setIsLoading(false);

    // Save vote status to localStorage
    localStorage.setItem("hasVoted", "true");
    setHasVoted(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl mb-8 font-bold">
        Göttinger Nordmensa Hype Counter
      </h1>
      <div className="text-6xl font-bold mb-8">{count}</div>
      <button
        onClick={handleClick}
        disabled={isLoading || hasVoted}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-xl text-xl disabled:opacity-50 transition-all"
      >
        {isLoading
          ? "Lädt..."
          : hasVoted
          ? "Du hast bereits abgestimmt"
          : "Hype +1"}
      </button>
    </main>
  );
}
