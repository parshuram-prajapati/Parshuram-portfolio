import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameIdRef = useRef<number>(0);
  
  // Interaction Refs
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const scrollRef = useRef(0);
  const burstRef = useRef(0); // For click explosion effect
  const shapeIndexRef = useRef(0); // Track current shape

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuration ---
    const PARTICLE_COUNT = 4000;
    const PARTICLE_SIZE = 0.25;
    const TRANSITION_SPEED = 0.04;
    
    // --- Scene Setup ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.03); 

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    // Clear & Attach
    while (containerRef.current.firstChild) {
      containerRef.current.removeChild(containerRef.current.firstChild);
    }
    containerRef.current.appendChild(renderer.domElement);

    // --- Particle System ---
    const geometry = new THREE.BufferGeometry();
    const initialPositions = new Float32Array(PARTICLE_COUNT * 3);
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const targetColors = new Float32Array(PARTICLE_COUNT * 3);

    // Initial Random Positions
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random() - 0.5) * 50;
        const y = (Math.random() - 0.5) * 50;
        const z = (Math.random() - 0.5) * 50;
        
        initialPositions[i * 3] = x;
        initialPositions[i * 3 + 1] = y;
        initialPositions[i * 3 + 2] = z;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        targetPositions[i * 3] = x;
        targetPositions[i * 3 + 1] = y;
        targetPositions[i * 3 + 2] = z;
        
        // Start White
        colors[i*3] = 1; colors[i*3+1] = 1; colors[i*3+2] = 1;
        targetColors[i*3] = 1; targetColors[i*3+1] = 1; targetColors[i*3+2] = 1;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Custom Glow Texture
    const getTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32; canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.5)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const material = new THREE.PointsMaterial({
      size: PARTICLE_SIZE,
      vertexColors: true,
      map: getTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // --- Palette Generators ---
    const getPalette = (type: string) => {
        if (type === 'Heart') return [new THREE.Color('#ff0055'), new THREE.Color('#ff4444'), new THREE.Color('#ffcccc')];
        if (type === 'Galaxy') return [new THREE.Color('#00ffff'), new THREE.Color('#ff00ff'), new THREE.Color('#4400ff')];
        if (type === 'Flower') return [new THREE.Color('#ffd700'), new THREE.Color('#ff8800'), new THREE.Color('#ffffff')];
        if (type === 'Fireworks') return [new THREE.Color('#00ff00'), new THREE.Color('#ffff00'), new THREE.Color('#ff0000')];
        return [new THREE.Color('#ffffff'), new THREE.Color('#aaaaaa'), new THREE.Color('#4444ff')]; // Sphere default
    };

    // --- Shape Algorithms ---
    const shapes = ['Sphere', 'Galaxy', 'Heart', 'Flower', 'Fireworks'];
    
    const calculateShape = (type: string) => {
      const posArr = new Float32Array(PARTICLE_COUNT * 3);
      const colArr = new Float32Array(PARTICLE_COUNT * 3);
      const palette = getPalette(type);

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = 0, y = 0, z = 0;
        const idx = i * 3;
        const color = palette[Math.floor(Math.random() * palette.length)];

        if (type === 'Sphere') {
          const r = 12;
          const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
          const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
          x = r * Math.cos(theta) * Math.sin(phi);
          y = r * Math.sin(theta) * Math.sin(phi);
          z = r * Math.cos(phi);
        } 
        else if (type === 'Galaxy') {
            const angle = i * 0.02; // Spiral density
            const r = (i / PARTICLE_COUNT) * 15; 
            const arms = 3;
            const spin = angle * arms;
            x = r * Math.cos(spin + angle) + (Math.random()-0.5)*2;
            y = (Math.random() - 0.5) * 2; // Flat galaxy
            z = r * Math.sin(spin + angle) + (Math.random()-0.5)*2;
        }
        else if (type === 'Heart') {
            const t = Math.random() * Math.PI * 2;
            const hx = 16 * Math.pow(Math.sin(t), 3);
            const hy = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
            const scale = 0.7;
            x = hx * scale + (Math.random()-0.5);
            y = hy * scale + (Math.random()-0.5);
            z = (Math.random() - 0.5) * 4;
        } 
        else if (type === 'Flower') {
            const r_base = 10;
            const u = Math.random() * Math.PI * 2;
            const v = Math.random() * Math.PI;
            const petal = Math.abs(Math.cos(u * 3)) + 0.2; // 3 petals
            x = (r_base * petal) * Math.sin(v) * Math.cos(u);
            y = (r_base * petal) * Math.sin(v) * Math.sin(u);
            z = (r_base * petal) * Math.cos(v) * 0.5;
        }
        else if (type === 'Fireworks') {
            const r = Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            x = r * Math.sin(phi) * Math.cos(theta);
            y = r * Math.sin(phi) * Math.sin(theta);
            z = r * Math.cos(phi);
        }

        posArr[idx] = x;
        posArr[idx+1] = y;
        posArr[idx+2] = z;
        
        colArr[idx] = color.r;
        colArr[idx+1] = color.g;
        colArr[idx+2] = color.b;
      }
      return { pos: posArr, col: colArr };
    };

    const transitionToShape = (index: number) => {
        if (index === shapeIndexRef.current) return;
        shapeIndexRef.current = index;
        const type = shapes[index % shapes.length];
        const data = calculateShape(type);
        
        for(let i=0; i < PARTICLE_COUNT * 3; i++) {
            targetPositions[i] = data.pos[i];
            targetColors[i] = data.col[i];
        }
    };

    // Initialize with Sphere
    transitionToShape(0);

    // --- Interaction Handlers ---
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
        // Calculate scroll percentage (0.0 to 1.0)
        const scrollY = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(1, Math.max(0, scrollY / maxScroll));
        
        // Map scroll to shape index (5 shapes)
        const targetIndex = Math.floor(scrollPercent * (shapes.length - 0.01));
        scrollRef.current = scrollPercent;
        
        // Trigger morph based on scroll section
        transitionToShape(targetIndex);
    };

    const handleClick = () => {
        burstRef.current = 2.0; // Trigger expansion
        // Randomize shape on click too, just for fun
        transitionToShape(shapeIndexRef.current + 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    // --- Animation Loop ---
    const clock = new THREE.Clock();

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      // Physics Update
      // Decay burst effect
      burstRef.current *= 0.92;
      const totalExpansion = 1 + burstRef.current;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ix = i * 3;
          const iy = i * 3 + 1;
          const iz = i * 3 + 2;

          // 1. Morphing (Lerp towards target shape)
          let tx = targetPositions[ix];
          let ty = targetPositions[iy];
          let tz = targetPositions[iz];

          // 2. Apply Expansion (Burst)
          tx *= totalExpansion;
          ty *= totalExpansion;
          tz *= totalExpansion;

          // 3. Mouse Repulsion (Magic Dust Effect)
          // Convert 3D world pos to normalized screen pos to check distance to mouse
          const v = new THREE.Vector3(positions[ix], positions[iy], positions[iz]);
          v.project(camera); // Project to 2D screen space
          
          const dx = v.x - mouseRef.current.x;
          const dy = v.y - mouseRef.current.y;
          const dist = dx*dx + dy*dy;
          
          if (dist < 0.05) {
              const force = (0.05 - dist) * 15;
              tx += dx * force * 10;
              ty += dy * force * 10;
          }
          
          // 4. Add Idle floating "breathing"
          ty += Math.sin(time + positions[ix] * 0.05) * 0.02;

          // 5. Update Positions (Soft transition)
          positions[ix] += (tx - positions[ix]) * TRANSITION_SPEED;
          positions[iy] += (ty - positions[iy]) * TRANSITION_SPEED;
          positions[iz] += (tz - positions[iz]) * TRANSITION_SPEED;

          // 6. Update Colors
          colors[ix] += (targetColors[ix] - colors[ix]) * 0.02;
          colors[iy] += (targetColors[iy] - colors[iy]) * 0.02;
          colors[iz] += (targetColors[iz] - colors[iz]) * 0.02;
      }

      // Global Rotation (Parallax feel)
      particleSystem.rotation.y = time * 0.05 + scrollRef.current * 2; // Spin faster on scroll
      particleSystem.rotation.z = scrollRef.current * 0.5;

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.color.needsUpdate = true;
      renderer.render(scene, camera);
    };
    
    animate();

    // Resize Handler
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('click', handleClick);
        cancelAnimationFrame(frameIdRef.current);
        if (containerRef.current) containerRef.current.innerHTML = '';
        renderer.dispose();
        geometry.dispose();
        material.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100vw', 
        height: '100vh', 
        zIndex: -1, 
        pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, #1a1a2e 0%, #000000 100%)' // Deep space gradient
      }} 
    />
  );
};

export default ParticleBackground;