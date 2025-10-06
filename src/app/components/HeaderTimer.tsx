"use client";
import React from "react";
import { useCountdown } from "@/app/hooks/useCountdown";

export default function HeaderTimer({
  startSeconds = 960,
  onExpire,
}: {
  startSeconds?: number;
  onExpire?: () => void;
}) {
  const { secondsLeft, minutes, seconds } = useCountdown(startSeconds);

  React.useEffect(() => {
    if (secondsLeft === 0 && onExpire) onExpire();
  }, [secondsLeft, onExpire]);

  let timerColor = "#FFBB00";
  if (secondsLeft <= 2 * 60 + 59 && secondsLeft > 0) timerColor = "#FF4E4E";
  if (secondsLeft === 0) timerColor = "#FFFFFF";

  return (
    <header
      className="
        w-full
        bg-[#1D5B43]
        rounded-t-[60px]
        flex flex-col items-center justify-center
        py-4
        max-[430px]:rounded-none
  "
    >
      <div
        className="
          font-semibold
          text-white
          text-center
          mb-2
          text-[24px]
          leading-[130%]
          max-[375px]:text-[18px]
          max-[320px]:text-[14px]
          max-[320px]:uppercase
    "
      >
        Успейте открыть пробную неделю
      </div>

      <div
          className={`
           flex items-center
           font-bold 
           text-[32px]    
           leading-[110%] 
           max-[320px]:text-[28px]
    `}
          style={{color: timerColor}}
      >
        <div className="text-[14px] pr-[8px]">✦</div>
        <span>{String(minutes).padStart(2, "0")}</span>
        <span>:</span>
        <span>{String(seconds).padStart(2, "0")}</span>
        <div className="text-[14px] pl-[8px]">✦</div>
      </div>
    </header>
  );
  }
