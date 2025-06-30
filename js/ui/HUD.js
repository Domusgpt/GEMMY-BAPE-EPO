class HUD {
    constructor() {
        this.integrativePotentialElement = document.getElementById('integrative-potential');
        this.dispersivePotentialElement = document.getElementById('dispersive-potential');
        this.systemComplexityElement = document.getElementById('system-complexity');
    }

    update(integrativePotential, dispersivePotential, systemComplexity) {
        this.integrativePotentialElement.textContent = integrativePotential.toFixed(2);
        this.dispersivePotentialElement.textContent = dispersivePotential.toFixed(2);
        this.systemComplexityElement.textContent = systemComplexity.toFixed(2);
    }
}

export { HUD };