'use client'
import React from 'react'
import { useCountdown } from '@/app/hooks/useCountdown'
import './HeaderTimer.css'

export default function HeaderTimer({
                                      startSeconds = 960, // 16 минут
                                      onExpire,
                                    }: {
  startSeconds?: number
  onExpire?: () => void
}) {
  const { secondsLeft, minutes, seconds } = useCountdown(startSeconds)

  React.useEffect(() => {
    if (secondsLeft === 0 && onExpire) onExpire()
  }, [secondsLeft, onExpire])

  // Цвет таймера
  let timerColor = '#FFBB00'
  if (secondsLeft <= 2 * 60 + 59 && secondsLeft > 0) timerColor = '#FF4E4E'
  if (secondsLeft === 0) timerColor = '#FFFFFF'

  return (
      <header className="header-timer">
        <div className="header-text">
          Успейте открыть пробную неделю
        </div>

        <div className="timer-wrapper" style={{ color: timerColor }}>
          <span className="star">✦</span>
          <span className="timer-number">{String(minutes).padStart(2, '0')}</span>
          <span className="timer-number">:</span>
          <span className="timer-number">{String(seconds).padStart(2, '0')}</span>
          <span className="star">✦</span>
        </div>
      </header>
  )
}
