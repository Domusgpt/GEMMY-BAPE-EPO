import * as THREE from '../lib/three.module.js';

class ParticleField extends THREE.Points {
    constructor(numParticles = 50000) {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        const colors = [];
        const sizes = [];

        const color = new THREE.Color();

        for (let i = 0; i < numParticles; i++) {
            // Random position within a sphere
            const x = (Math.random() * 2 - 1) * 20;
            const y = (Math.random() * 2 - 1) * 20;
            const z = (Math.random() * 2 - 1) * 20;
            positions.push(x, y, z);

            // Random color
            color.setHSL(Math.random(), 1.0, 0.5);
            colors.push(color.r, color.g, color.b);

            // Random size
            sizes.push(Math.random() * 0.5 + 0.1);
        }

        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

        const material = new THREE.PointsMaterial({
            size: 0.1,
            vertexColors: true,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: 0.8
        });

        super(geometry, material);
    }

    update(dispersivePotential) {
        // Animate particles based on dispersive potential
        const positions = this.geometry.attributes.position.array;
        const sizes = this.geometry.attributes.size.array;
        const colors = this.geometry.attributes.color.array;

        const speed = 0.1 + dispersivePotential * 0.5;
        const colorShift = dispersivePotential * 0.2;

        for (let i = 0; i < positions.length; i += 3) {
            positions[i] += (Math.random() - 0.5) * speed;
            positions[i + 1] += (Math.random() - 0.5) * speed;
            positions[i + 2] += (Math.random() - 0.5) * speed;

            // Keep particles within bounds
            if (positions[i] > 20 || positions[i] < -20) positions[i] *= -1;
            if (positions[i + 1] > 20 || positions[i + 1] < -20) positions[i + 1] *= -1;
            if (positions[i + 2] > 20 || positions[i + 2] < -20) positions[i + 2] *= -1;

            // Rotate particles around the center (subtle effect)
            const angle = Date.now() * 0.0001 * dispersivePotential;
            const x = positions[i];
            const z = positions[i + 2];
            positions[i] = x * Math.cos(angle) - z * Math.sin(angle);
            positions[i + 2] = x * Math.sin(angle) + z * Math.cos(angle);

            // Color shift based on dispersive potential
            colors[i] = Math.min(1, Math.max(0, colors[i] + (Math.random() - 0.5) * colorShift));
            colors[i + 1] = Math.min(1, Math.max(0, colors[i + 1] + (Math.random() - 0.5) * colorShift));
            colors[i + 2] = Math.min(1, Math.max(0, colors[i + 2] + (Math.random() - 0.5) * colorShift));
        }
        this.geometry.attributes.position.needsUpdate = true;
        this.geometry.attributes.color.needsUpdate = true;

        // Adjust opacity based on dispersive potential
        this.material.opacity = 0.2 + dispersivePotential * 0.8;
        this.material.size = 0.1 + dispersivePotential * 0.2; // Adjust overall size
    }
}

export { ParticleField };