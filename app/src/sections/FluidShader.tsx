import { useRef, useEffect, useCallback } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uPrevMouse;
  uniform vec2 uResolution;
  uniform float uIntensity;
  varying vec2 vUv;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float fbm(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * snoise(p);
      p *= 2.0; a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouseVel = (uMouse - uPrevMouse) * 8.0;
    float mouseSpeed = length(mouseVel);
    vec2 mousePos = uMouse;
    float mouseDist = length((uv - mousePos) * aspect);
    float mouseInfluence = smoothstep(0.4, 0.0, mouseDist) * (0.5 + mouseSpeed * 2.0);
    float angle = atan(uv.y - mousePos.y, uv.x - mousePos.x);
    float swirl = mouseInfluence * sin(angle * 3.0 + uTime * 2.0) * 0.03;
    vec2 distortedUv = uv + vec2(cos(angle), sin(angle)) * swirl;
    float flowTime = uTime * 0.15;
    vec2 flowUv = distortedUv * 3.0;
    float n1 = fbm(flowUv + vec2(flowTime, flowTime * 0.5));
    float n2 = fbm(flowUv + vec2(-flowTime * 0.7, flowTime * 0.3) + 10.0);
    float n3 = fbm(flowUv * 0.5 + vec2(flowTime * 0.2, -flowTime * 0.4) + 20.0);
    float noise = n1 * 0.5 + n2 * 0.3 + n3 * 0.2;
    float trail = fbm((uv - mousePos * 0.5) * 5.0 + flowTime) * mouseInfluence * 0.5;
    noise += trail;

    // iOS 26 palette: warm coral, violet, mint accents on deep purple-warm void
    vec3 baseColor = vec3(0.024, 0.016, 0.04);
    vec3 coral = vec3(1.0, 0.42, 0.21);
    vec3 violet = vec3(0.655, 0.545, 0.98);
    vec3 mint = vec3(0.024, 0.835, 0.627);
    vec3 amber = vec3(0.984, 0.749, 0.141);
    vec3 midColor = vec3(0.06, 0.04, 0.1);

    float colorMix = smoothstep(-0.5, 0.5, noise);
    float accentMix = smoothstep(0.2, 0.6, noise + mouseInfluence * 0.3);
    vec3 color = mix(baseColor, midColor, colorMix);

    // Blend coral → violet → mint based on noise
    vec3 accent1 = mix(coral, violet, sin(noise * 3.14159 + uTime * 0.3) * 0.5 + 0.5);
    vec3 accent2 = mix(violet, mint, cos(noise * 2.094 + uTime * 0.2) * 0.5 + 0.5);
    vec3 accentColor = mix(accent1, accent2, sin(uv.x * 3.14159) * 0.5 + 0.5);
    color = mix(color, accentColor, accentMix * 0.3 * uIntensity);

    // Warm glow near mouse
    vec3 glowColor = mix(coral, amber, sin(uTime * 0.3) * 0.5 + 0.5);
    float glowStrength = smoothstep(0.3, 0.0, mouseDist) * 0.2 * uIntensity;
    color += glowColor * glowStrength;

    color = mix(baseColor, color, uIntensity);
    float vignette = 1.0 - smoothstep(0.3, 1.2, length((uv - 0.5) * aspect));
    color *= 0.7 + vignette * 0.3;

    gl_FragColor = vec4(color, 1.0);
  }
`;

interface FluidShaderProps {
  intensity?: number;
}

export default function FluidShader({ intensity = 1 }: FluidShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5 });
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current.prevX = mouseRef.current.x;
    mouseRef.current.prevY = mouseRef.current.y;
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(1);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uPrevMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        uIntensity: { value: intensity },
      },
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const startTime = Date.now();
    let lastTime = 0;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const delta = elapsed - lastTime;
      if (delta >= 0.016) {
        lastTime = elapsed;
        material.uniforms.uTime.value = elapsed;
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
        material.uniforms.uPrevMouse.value.set(mouseRef.current.prevX, mouseRef.current.prevY);
        material.uniforms.uIntensity.value = intensityRef.current;
        mouseRef.current.prevX += (mouseRef.current.x - mouseRef.current.prevX) * 0.1;
        mouseRef.current.prevY += (mouseRef.current.y - mouseRef.current.prevY) * 0.1;
        renderer.render(scene, camera);
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    window.addEventListener("mousemove", handleMouseMove);
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [handleMouseMove, intensity]);

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
