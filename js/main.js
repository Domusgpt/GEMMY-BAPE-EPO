import { SceneManager } from './core/SceneManager.js';
import { EPOSystem } from './core/EPOSystem.js';
import { Hypercube } from './visuals/Hypercube.js';
import { ParticleField } from './visuals/ParticleField.js';
import { HUD } from './ui/HUD.js';

const appContainer = document.getElementById('app-container');
const sceneManager = new SceneManager(appContainer);
const epoSystem = new EPOSystem();
const hud = new HUD();

const hypercube = new Hypercube();
sceneManager.addObject(hypercube);

const particleField = new ParticleField();
sceneManager.addObject(particleField);

function animate() {
    requestAnimationFrame(animate);

    epoSystem.update();
    hypercube.update(epoSystem.integrativePotential, sceneManager.getRendererSize());
    particleField.update(epoSystem.dispersivePotential);
    hud.update(epoSystem.integrativePotential, epoSystem.dispersivePotential, epoSystem.systemComplexity);

    sceneManager.render();
}

animate();