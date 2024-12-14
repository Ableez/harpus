'use client'

import { useRef, useEffect } from 'react'

interface WaveformDisplayProps {
  audioUrl: string
}

export default function WaveformDisplay({ audioUrl }: WaveformDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
      .then(audioBuffer => {
        const width = canvas.width
        const height = canvas.height
        const data = audioBuffer.getChannelData(0)
        const step = Math.ceil(data.length / width)

        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillRect(0, 0, width, height)

        ctx.lineWidth = 2
        ctx.strokeStyle = 'rgb(0, 0, 0)'
        ctx.beginPath()

        for (let i = 0; i < width; i++) {
          const min = Math.min(...data.slice(i * step, (i + 1) * step))
          const max = Math.max(...data.slice(i * step, (i + 1) * step))
          ctx.moveTo(i, (1 + min) * (height / 2))
          ctx.lineTo(i, (1 + max) * (height / 2))
        }

        ctx.stroke()
      })
      .catch(err => console.error('Error loading audio:', err))

    return () => {
      audioContext.close()
    }
  }, [audioUrl])

  return (
    <div className="mt-4">
      <canvas ref={canvasRef} width="400" height="100" className="w-full h-24 bg-white rounded" />
    </div>
  )
}

