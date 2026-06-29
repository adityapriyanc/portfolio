import { useInkReveal } from '../hooks/useInkReveal'

const isTouchDevice = typeof window !== 'undefined' && !matchMedia('(hover: hover) and (pointer: fine)').matches

export default function InkCursorTrail() {
  const canvasRef = useInkReveal()

  if (isTouchDevice) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    />
  )
}
