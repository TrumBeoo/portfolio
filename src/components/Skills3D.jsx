import React, { useRef, useEffect, useState } from 'react';
import { Box, Container, Typography, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { Image, Environment, ScrollControls, useScroll, useTexture } from '@react-three/drei';
import { easing } from 'maath';
import { useSound } from '../hooks/useSound';

// Custom geometries and materials from skills folder
class BentPlaneGeometry extends THREE.PlaneGeometry {
  constructor(radius, ...args) {
    super(...args)
    let p = this.parameters
    let hw = p.width * 0.5
    let a = new THREE.Vector2(-hw, 0)
    let b = new THREE.Vector2(0, radius)
    let c = new THREE.Vector2(hw, 0)
    let ab = new THREE.Vector2().subVectors(a, b)
    let bc = new THREE.Vector2().subVectors(b, c)
    let ac = new THREE.Vector2().subVectors(a, c)
    let r = (ab.length() * bc.length() * ac.length()) / (2 * Math.abs(ab.cross(ac)))
    let center = new THREE.Vector2(0, radius - r)
    let baseV = new THREE.Vector2().subVectors(a, center)
    let baseAngle = baseV.angle() - Math.PI * 0.5
    let arc = baseAngle * 2
    let uv = this.attributes.uv
    let pos = this.attributes.position
    let mainV = new THREE.Vector2()
    for (let i = 0; i < uv.count; i++) {
      let uvRatio = 1 - uv.getX(i)
      let y = pos.getY(i)
      mainV.copy(c).rotateAround(center, arc * uvRatio)
      pos.setXYZ(i, mainV.x, y, -mainV.y)
    }
    pos.needsUpdate = true
  }
}

class MeshSineMaterial extends THREE.MeshBasicMaterial {
  constructor(parameters = {}) {
    super(parameters)
    this.setValues(parameters)
    this.time = { value: 0 }
  }
  onBeforeCompile(shader) {
    shader.uniforms.time = this.time
    shader.vertexShader = `
      uniform float time;
      ${shader.vertexShader}
    `
    shader.vertexShader = shader.vertexShader.replace(
      '#include <begin_vertex>',
      `vec3 transformed = vec3(position.x, position.y + sin(time + uv.x * PI * 4.0) / 4.0, position.z);`
    )
  }
}

extend({ MeshSineMaterial, BentPlaneGeometry })

const Skills3D = () => {
  const skills = [
    { name: 'Jira', icon: '⚙️', level: 'Advanced', color: '#61DAFB' },
    { name: 'Python', icon: '🐍', level: 'Expert', color: '#3776AB' },
    { name: 'MySQL', icon: '🗄️', level: 'Advanced', color: '#339933' },
    { name: 'GitHub', icon: '🐙', level: 'Expert', color: '#181717' },
    { name: 'MongoDB', icon: '🍃', level: 'Intermediate', color: '#2496ED' },
    { name: 'Canva', icon: '🎨', level: 'Expert', color: '#F7DF1E' },
    { name: 'AI', icon: '🤖', level: 'Intermediate', color: '#FF9900' },
    { name: 'Power BI', icon: '📊', level: 'Intermediate', color: '#E97627' },
  ];

  // Generate SVG data URL for skill cards front
  const generateSkillImageFront = (skill) => {
    const svg = `
      <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${skill.color};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${skill.color}88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="400" height="400" fill="url(#grad)" rx="20"/>
        <text x="200" y="180" text-anchor="middle" font-size="80" fill="white">${skill.icon}</text>
        <text x="200" y="250" text-anchor="middle" font-size="32" fill="white" font-family="Arial, sans-serif" font-weight="bold">${skill.name}</text>
        <text x="200" y="290" text-anchor="middle" font-size="20" fill="rgba(255,255,255,0.8)" font-family="Arial, sans-serif">${skill.level}</text>
      </svg>
    `;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };



  // 3D Scene Components
  function Rig(props) {
    const ref = useRef()
    const scroll = useScroll()
    const { playWhooshSound } = useSound()
    const lastRotation = useRef(0)
    
    useFrame((state, delta) => {
      const newRotation = -scroll.offset * (Math.PI * 2)
      const rotationDiff = Math.abs(newRotation - lastRotation.current)
      
      if (rotationDiff > 0.02) {
        playWhooshSound()
        lastRotation.current = newRotation
      }
      
      ref.current.rotation.y = newRotation
      state.events.update()
      easing.damp3(state.camera.position, [-state.pointer.x * 2, state.pointer.y + 1.5, 10], 0.3, delta)
      state.camera.lookAt(0, 0, 0)
    })
    return <group ref={ref} {...props} />
  }

  function Carousel({ radius = 2.5, count = 8 }) {
    return Array.from({ length: count }, (_, i) => (
      <SkillCard
        key={i}
        skill={skills[i % skills.length]}
        position={[Math.sin((i / count) * Math.PI * 2) * radius, 0, Math.cos((i / count) * Math.PI * 2) * radius]}
        rotation={[0, Math.PI + (i / count) * Math.PI * 2, 0]}
      />
    ))
  }

  function SkillCard({ skill, ...props }) {
    const groupRef = useRef()
    const frontRef = useRef()
    const backRef = useRef()
    const [hovered, hover] = useState(false)
    const pointerOver = (e) => (e.stopPropagation(), hover(true))
    const pointerOut = () => hover(false)
    
    useFrame((state, delta) => {
      if (groupRef.current) {
        easing.damp3(groupRef.current.scale, hovered ? 1.15 : 1, 0.1, delta)
        //groupRef.current.rotation.y += delta * 0.5
      }
      if (frontRef.current?.material) {
        easing.damp(frontRef.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(frontRef.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
      }
      if (backRef.current?.material) {
        easing.damp(backRef.current.material, 'radius', hovered ? 0.25 : 0.1, 0.2, delta)
        easing.damp(backRef.current.material, 'zoom', hovered ? 1 : 1.5, 0.2, delta)
      }
    })
    
    return (
      <group 
        ref={groupRef}
        onPointerOver={pointerOver} 
        onPointerOut={pointerOut}
        {...props}
      >
        {/* Front side */}
        <Image 
          ref={frontRef}
          url={generateSkillImageFront(skill)}
          transparent 
          position={[0, 0, 0.01]}
        >
          <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
        </Image>
        
        {/* Back side */}
        <Image 
          ref={backRef}
          url={generateSkillImageFront(skill)}
          transparent 
          position={[0, 0, -0.01]}
          rotation={[0, Math.PI, 0]}
        >
          <bentPlaneGeometry args={[0.1, 1, 1, 20, 20]} />
        </Image>
      </group>
    )
  }

  function Banner(props) {
    const ref = useRef()
    const scroll = useScroll()
    
    useFrame((state, delta) => {
      if (ref.current?.material?.time) {
        ref.current.material.time.value += Math.abs(scroll.delta) * 4
      }
    })
    
    return (
      <mesh ref={ref} {...props}>
        <cylinderGeometry args={[2.2, 2.2, 0.14, 128, 16, true]} />
        <meshSineMaterial 
          color="#4f46e5" 
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide} 
        />
      </mesh>
    )
  }

  return (
    <Box
      id="skills"
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e40af 100%)',
        overflow: 'hidden',
      }}
    >
      {/* 3D Canvas with React Three Fiber */}
      <Canvas 
        camera={{ position: [0, 0, 100], fov: 15 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <fog attach="fog" args={['#1e1b4b', 8.5, 12]} />
        <ScrollControls pages={4} infinite>
          <Rig rotation={[0, 0, 0.15]}>
            <Carousel />
          </Rig>
          <Banner position={[0, -0.15, 0]} />
        </ScrollControls>
        <Environment preset="dawn" background={false} blur={0.5} />
      </Canvas>

      {/* UI Overlay */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography
            variant="h2"
            sx={{
              color: 'white',
              fontWeight: 700,
              fontSize: '4rem',
              textAlign: 'center',
              mb: 2,
              textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            }}
          >
            Kỹ Năng Công Nghệ
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255,255,255,0.8)',
              textAlign: 'center',
              maxWidth: 600,
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
           
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
};

export default Skills3D;