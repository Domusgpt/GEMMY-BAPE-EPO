import * as THREE from '../lib/three.module.js';

class SceneManager {
    constructor(container) {
        this.container = container;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);

        this.camera.position.z = 5;

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addObject(object) {
        this.scene.add(object);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    getRendererSize() {
        return new THREE.Vector2(window.innerWidth, window.innerHeight);
    }
}

export { SceneManager };