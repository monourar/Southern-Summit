import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Scene3DProps {
  scrollProgress: number; // 0.0 (blueprint) to 1.0 (reality)
  mousePos: { x: number; y: number };
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress, mousePos }) => {
  const { camera } = useThree();
  const poolWaterRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);

  useFrame((state, delta) => {
    // Smooth camera rotation lerp driven by mouse offset and scroll
    const targetX = (mousePos.x * 2.5);
    const targetY = 4 + (-mousePos.y * 1.5) + (scrollProgress * 2.0);
    const targetZ = 12 - (scrollProgress * 3.0);

    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.position.z += (targetZ - camera.position.z) * 0.05;

    camera.lookAt(0, 0.5, 0);

    // Animate pool water ripple rotation
    if (poolWaterRef.current) {
      poolWaterRef.current.rotation.z += delta * 0.08;
    }

    // Light bounce animation
    if (lightRef.current) {
      lightRef.current.intensity = 15 + Math.sin(state.clock.elapsedTime * 2) * 2;
    }
  });

  // Calculate blend factor (0 = wireframe blueprint, 1 = luxury reality)
  const isWireframe = scrollProgress < 0.45;
  const wireOpacity = Math.max(0, 1 - scrollProgress * 1.5);

  return (
    <>
      {/* Ambient & Volumetric Lighting */}
      <ambientLight intensity={0.4} color="#F5F1EA" />
      <directionalLight position={[10, 15, 10]} intensity={1.2} color="#F5F1EA" castShadow />
      
      {/* Warm Spotlights over pool & fire pit */}
      <spotLight
        ref={lightRef}
        position={[-4, 8, -2]}
        angle={0.6}
        penumbra={0.8}
        intensity={20}
        color="#B5652E"
        castShadow
      />
      
      <pointLight position={[5, 1, 2]} intensity={8} color="#38BDF8" distance={10} />
      <pointLight position={[-3, 0.5, 3]} intensity={12} color="#B5652E" distance={8} />

      {/* Floating dust/ember particles for depth */}
      <Sparkles
        count={80}
        scale={[15, 10, 15]}
        size={2.5}
        speed={0.4}
        color={scrollProgress > 0.5 ? '#B5652E' : '#38BDF8'}
      />

      <group ref={groupRef}>
        {/* Ground & Hardscape Patio Plane */}
        <mesh position={[0, -0.5, 0]} receiveShadow>
          <boxGeometry args={[18, 0.2, 14]} />
          <meshStandardMaterial
            color={scrollProgress > 0.4 ? '#24211D' : '#1C1A17'}
            roughness={0.4}
            metalness={0.1}
            wireframe={isWireframe}
          />
        </mesh>

        {/* Blueprint Grid Overlay Ground */}
        {wireOpacity > 0.05 && (
          <mesh position={[0, -0.48, 0]}>
            <planeGeometry args={[20, 16, 20, 16]} />
            <meshBasicMaterial
              color="#38BDF8"
              wireframe
              transparent
              opacity={wireOpacity * 0.6}
            />
          </mesh>
        )}

        {/* 1. Heated Plunge Pool & Spa Zone */}
        <group position={[3, 0, -1]}>
          {/* Pool Cavity Shell */}
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[7, 0.6, 4.5]} />
            <meshStandardMaterial
              color={scrollProgress > 0.4 ? '#182E38' : '#0F172A'}
              roughness={0.2}
              wireframe={isWireframe}
            />
          </mesh>

          {/* Water Surface */}
          <mesh ref={poolWaterRef} position={[0, 0.05, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[6.8, 4.3]} />
            <meshStandardMaterial
              color="#38BDF8"
              roughness={0.05}
              metalness={0.8}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Pool Underwater Glow */}
          <pointLight position={[0, -0.2, 0]} intensity={15} color="#38BDF8" distance={6} />
        </group>

        {/* 2. Sunken Fire Pit Seating Sanctuary */}
        <group position={[-4, 0.1, 2]}>
          {/* Circular Seating Base */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[2.2, 2.4, 0.4, 32]} />
            <meshStandardMaterial
              color={scrollProgress > 0.4 ? '#302C27' : '#1C1A17'}
              roughness={0.6}
              wireframe={isWireframe}
            />
          </mesh>

          {/* Fire Bowl Center Piece */}
          <mesh position={[0, 0.3, 0]}>
            <cylinderGeometry args={[0.7, 0.5, 0.4, 24]} />
            <meshStandardMaterial color="#1C1A17" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* Flame Glow */}
          <Float speed={3} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh position={[0, 0.6, 0]}>
              <sphereGeometry args={[0.3, 16, 16]} />
              <meshBasicMaterial color="#B5652E" transparent opacity={0.9} />
            </mesh>
          </Float>
        </group>

        {/* 3. Teak Timber Pergola Architectural Structure */}
        <group position={[-3, 1.8, -4]}>
          {/* Support Columns */}
          <mesh position={[-3, 0, -2]}>
            <boxGeometry args={[0.3, 3.6, 0.3]} />
            <meshStandardMaterial color="#B5652E" roughness={0.3} wireframe={isWireframe} />
          </mesh>
          <mesh position={[3, 0, -2]}>
            <boxGeometry args={[0.3, 3.6, 0.3]} />
            <meshStandardMaterial color="#B5652E" roughness={0.3} wireframe={isWireframe} />
          </mesh>
          <mesh position={[-3, 0, 2]}>
            <boxGeometry args={[0.3, 3.6, 0.3]} />
            <meshStandardMaterial color="#B5652E" roughness={0.3} wireframe={isWireframe} />
          </mesh>
          <mesh position={[3, 0, 2]}>
            <boxGeometry args={[0.3, 3.6, 0.3]} />
            <meshStandardMaterial color="#B5652E" roughness={0.3} wireframe={isWireframe} />
          </mesh>

          {/* Roof Beams */}
          <mesh position={[0, 1.8, 0]}>
            <boxGeometry args={[6.5, 0.25, 4.5]} />
            <meshStandardMaterial color="#2E2924" roughness={0.4} wireframe={isWireframe} />
          </mesh>
        </group>
      </group>
    </>
  );
};
