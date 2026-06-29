import { useEffect } from 'react'

export default function RippleEffect() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const ripple = document.createElement('div')
      ripple.className = 'pointer-events-none fixed rounded-full'
      ripple.style.left = e.clientX + 'px'
      ripple.style.top = e.clientY + 'px'
      ripple.style.width = '8px'
      ripple.style.height = '8px'
      ripple.style.transform = 'translate(-50%, -50%) scale(0)'
      ripple.style.zIndex = '9999'
      ripple.style.border = '2px solid rgba(255, 51, 75, 0.6)'
      ripple.style.background = 'rgba(255, 51, 75, 0.08)'
      ripple.animate(
        [
          { transform: 'translate(-50%, -50%) scale(0)', opacity: 1, borderWidth: '2px' },
          { transform: 'translate(-50%, -50%) scale(20)', opacity: 0, borderWidth: '1px' },
        ],
        { duration: 700, easing: 'ease-out', fill: 'forwards' }
      )
      setTimeout(() => ripple.remove(), 700)
      document.body.appendChild(ripple)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
