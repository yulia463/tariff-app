'use client'
import { useEffect, useState, useRef } from 'react'

export function useCountdown(initialSeconds: number) {
    const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds)
    const timerRef = useRef<number | null>(null)

    useEffect(() => {
        timerRef.current = window.setInterval(() => {
            setSecondsLeft(prev => {
                if (prev <= 1) {
                    if (timerRef.current) clearInterval(timerRef.current)
                    return 0
                }
                return prev - 1
            })
        }, 1000)

        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
        }
    }, [])

    const minutes = Math.floor(secondsLeft / 60)
    const seconds = secondsLeft % 60

    return {
        secondsLeft,
        minutes,
        seconds,
    }
}
