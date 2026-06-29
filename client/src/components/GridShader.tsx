import { useEffect, useRef } from 'react'

export default function GridShader() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isTouchDevice = !matchMedia('(hover: hover) and (pointer: fine)').matches

  useEffect(() => {
    const container = containerRef.current
    if (!container || isTouchDevice) return

    let cleanup: (() => void) | null = null

    const init = async () => {
      const THREE = await import('three')

      const scene = new THREE.Scene()
      const camera = new THREE.Camera()
      camera.position.z = 1

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(renderer.domElement)

      const geometry = new THREE.PlaneGeometry(2, 2)

      const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
      }

      const vertexShader = `
        void main() {
          gl_Position = vec4( position, 1.0 );
        }
      `

      const fragmentShader = `
        precision highp float;
        uniform vec2 resolution;
        uniform float time;
        
        #define FC gl_FragCoord.xy
        #define R resolution
        #define T time
        #define MN min(R.x,R.y)

        void main(void) {
            vec2 uv = (FC - 0.5 * R) / MN;
            uv.x += T * 0.12;
            uv.y += T * 0.04;
            vec3 col = vec3(0.0);
            float s = 13.0, e = 9e-4;
            col += e / (sin(uv.x * s) * cos(uv.y * s));
            vec3 redGlow = col * vec3(1.0, 0.16, 0.26);
            gl_FragColor = vec4(redGlow, 1.0);
        }
      `

      const material = new THREE.ShaderMaterial({
        uniforms,
        vertexShader,
        fragmentShader,
        transparent: true,
      })

      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      const onResize = () => {
        const width = window.innerWidth
        const height = window.innerHeight
        renderer.setSize(width, height)
        uniforms.resolution.value.set(
          renderer.domElement.width,
          renderer.domElement.height,
        )
      }

      onResize()
      window.addEventListener('resize', onResize)

      let animId: number
      const animate = () => {
        animId = requestAnimationFrame(animate)
        uniforms.time.value += 0.008
        renderer.render(scene, camera)
      }
      animate()

      cleanup = () => {
        cancelAnimationFrame(animId)
        window.removeEventListener('resize', onResize)
        renderer.dispose()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }
    }

    init()

    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        opacity: 0.5,
      }}
    />
  )
}
