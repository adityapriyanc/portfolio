import { useEffect, useRef } from 'react'

interface Stamp {
  x: number
  y: number
  born: number
  seed: number
  rmax: number
}

export function useInkReveal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const stamps: Stamp[] = []
    let running = false
    let lastPos: { x: number; y: number } | null = null
    let w = window.innerWidth
    let h = window.innerHeight

    const brushSize = 50
    const lifetime = 750
    const rStart = 3
    const rVary = 0.5
    const stampStep = 7
    const maxStamps = 180
    const segments = 24
    const wobble = [0.15, 0.08, 0.04]
    const gradientInnerRadius = 0.18
    const gradientStops = [1.0, 0.6, 0]

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()
    window.addEventListener('resize', resize)

    const carveInk = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      seed: number,
      alpha: number,
    ) => {
      const g = ctx.createRadialGradient(x, y, r * gradientInnerRadius, x, y, r)
      g.addColorStop(0, `rgba(255, 51, 75, ${gradientStops[0] * alpha * 0.7})`)
      g.addColorStop(0.5, `rgba(226, 24, 56, ${gradientStops[1] * alpha * 0.3})`)
      g.addColorStop(1, `rgba(255, 0, 0, ${gradientStops[2] * alpha})`)
      ctx.fillStyle = g

      ctx.beginPath()
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        const wob =
          0.78 +
          wobble[0] * Math.sin(a * 3 + seed) +
          wobble[1] * Math.sin(a * 5 + seed * 2.1) +
          wobble[2] * Math.sin(a * 7 + seed * 0.7)
        const px = x + Math.cos(a) * r * wob
        const py = y + Math.sin(a) * r * wob
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.fill()
    }

    const addStamp = (x: number, y: number) => {
      if (stamps.length >= maxStamps) stamps.shift()
      stamps.push({
        x,
        y,
        born: performance.now(),
        seed: Math.random() * Math.PI * 2,
        rmax: brushSize * (1 - rVary + Math.random() * rVary),
      })
    }

    const stampAlong = (x: number, y: number) => {
      if (!lastPos) {
        addStamp(x, y)
      } else {
        const dx = x - lastPos.x
        const dy = y - lastPos.y
        const dist = Math.hypot(dx, dy)
        const steps = Math.max(1, Math.ceil(dist / stampStep))
        for (let i = 1; i <= steps; i++) {
          addStamp(lastPos.x + (dx * i) / steps, lastPos.y + (dy * i) / steps)
        }
      }
      lastPos = { x, y }
    }

    let animationId: number

    const loop = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const now = performance.now()

      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'

      for (let i = stamps.length - 1; i >= 0; i--) {
        const t = (now - stamps[i].born) / lifetime
        if (t >= 1) {
          stamps.splice(i, 1)
          continue
        }
        const ease = 1 - Math.pow(1 - t, 3)
        const r = rStart + (stamps[i].rmax - rStart) * ease
        const alpha = 1 - t * t
        carveInk(ctx, stamps[i].x, stamps[i].y, r, stamps[i].seed, alpha)
      }

      if (stamps.length) {
        animationId = requestAnimationFrame(loop)
      } else {
        running = false
      }
    }

    const startLoop = () => {
      if (!running) {
        running = true
        animationId = requestAnimationFrame(loop)
      }
    }

    const onMouseMove = (e: MouseEvent) => {
      stampAlong(e.clientX, e.clientY)
      startLoop()
    }

    const onMouseLeave = () => {
      lastPos = null
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return canvasRef
}
