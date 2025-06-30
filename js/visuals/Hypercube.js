import * as THREE from '../lib/three.module.js';
import { MoireShader } from '../shaders/moireShader.js';

class Hypercube extends THREE.Object3D {
    constructor() {
        super();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhysicalMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.2,
            roughness: 0.1,
            metalness: 0.1,
            transmission: 0.9, // For glass-like refraction
            clearcoat: 1.0,
            clearcoatRoughness: 0.1
        });
        this.cube = new THREE.Mesh(geometry, material);
        this.add(this.cube);

        // Moire effect layer
        const moireMaterial = new THREE.ShaderMaterial({
            uniforms: {
                color: { value: new THREE.Color(0xff00ff) },
                moireDensity: { value: 10.0 },
                moireSpeed: { value: 0.5 },
                time: { value: 0.0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
            },
            vertexShader: MoireShader.vertexShader,
            fragmentShader: MoireShader.fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        this.moireCube = new THREE.Mesh(geometry, moireMaterial);
        this.moireCube.scale.set(1.01, 1.01, 1.01); // Slightly larger to avoid z-fighting
        this.add(this.moireCube);
    }

    update(integrativePotential, resolution) {
        // Scale and rotate based on integrative potential
        const scale = 0.5 + integrativePotential * 1.5;
        this.cube.scale.set(scale, scale, scale);
        this.moireCube.scale.set(scale * 1.01, scale * 1.01, scale * 1.01);

        this.cube.rotation.x += 0.01 * integrativePotential;
        this.cube.rotation.y += 0.01 * integrativePotential;
        this.moireCube.rotation.copy(this.cube.rotation);

        // Adjust glassmorphism properties based on integrative potential
        this.cube.material.opacity = 0.1 + integrativePotential * 0.4; // More integrated = less opaque
        this.cube.material.transmission = 0.5 + integrativePotential * 0.4; // More integrated = more transmissive
        this.cube.material.needsUpdate = true;

        // Update moire shader uniforms
        this.moireCube.material.uniforms.time.value += 0.05;
        this.moireCube.material.uniforms.moireDensity.value = 5.0 + integrativePotential * 15.0;
        this.moireCube.material.uniforms.moireSpeed.value = 0.2 + integrativePotential * 0.8;
        this.moireCube.material.uniforms.resolution.value.copy(resolution);
    }
}

export { Hypercube };