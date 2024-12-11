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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Göttinger Nordmensa Hype Counter",
          text: `I just voted! Current hype count is ${count}. Join in!`,
          url: window.location.href, // Link to the current page
        });
        console.log("Share was successful.");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that do not support the Web Share API
      alert(
        "Sharing is not supported in this browser. You can copy the link: " +
          window.location.href
      );
    }
  };

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-4xl mb-8 font-bold">
        Göttinger Nordmensa Hype Counter
      </h1>
      <div aria-live="polite" className="text-6xl font-bold mb-8">
        {count}
      </div>
      <button
        onClick={handleClick}
        disabled={isLoading || hasVoted}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-6 px-12 rounded-xl text-xl disabled:opacity-50 transition-all mb-4"
      >
        {isLoading
          ? "Lädt..."
          : hasVoted
          ? "Du hast bereits abgestimmt"
          : "Hype +1"}
      </button>
      <button
        onClick={handleShare}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-6 px-12 rounded-xl text-xl transition-all"
      >
        Teile den Hype!
      </button>
    </main>
  );
}
