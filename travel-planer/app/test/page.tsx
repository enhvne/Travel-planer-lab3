'use client'

import React from "react";
import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateCurrentTime = () => {
      if (!isSeeking) setCurrentTime(audio.currentTime);
    };

    const setAudioDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", setAudioDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", setAudioDuration);
    };
  }, [isSeeking]);

  // Range-г хөдөлгөх үед (гар ажиллагаа)
  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  // Range-ээс хуруу салгах үед — реалаар seek хийх
  const handleSeekCommit = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
    setIsSeeking(false);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500 }}>
      <h2>🎵 Гараар удирдах дуу</h2>

      <audio ref={audioRef}>
        <source src="/sound/duu.mp3" type="audio/mpeg" />
        Таны browser дуу тоглуулахгүй байна.
      </audio>

      {/* Тоглуулах товч */}
      <div style={{ marginTop: 20 }}>
        <button onClick={() => audioRef.current?.play()}>▶️ Тоглуулах</button>
        <button onClick={() => audioRef.current?.pause()}>⏸️ Түр зогсоох</button>
      </div>

      {/* Урсдаг бар (гараар удирдах) */}
      <div style={{ marginTop: 20 }}>
        <input
          type="range"
          min={0}
          max={duration}
          step={0.1}
          value={currentTime}
          onChange={handleSeekChange}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={handleSeekCommit}
          onTouchStart={() => setIsSeeking(true)}
          onTouchEnd={handleSeekCommit}
          style={{ width: "100%" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}

// Тухайн хугацааг минут:секунд формат руу хөрвүүлэх
function formatTime(time: number): string {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
