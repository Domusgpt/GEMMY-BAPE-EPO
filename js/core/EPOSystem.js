class EPOSystem {
    constructor() {
        this.integrativePotential = 0.5;
        this.dispersivePotential = 0.5;
        this.systemComplexity = 0.5;

        this.mouseX = 0;
        this.mouseY = 0;

        document.addEventListener('mousemove', this.onMouseMove.bind(this));
    }

    onMouseMove(event) {
        this.mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Update potentials based on mouse position
        this.integrativePotential = (this.mouseX + 1) / 2; // Map from -1 to 1 to 0 to 1
        this.dispersivePotential = (this.mouseY + 1) / 2; // Map from -1 to 1 to 0 to 1

        // Simple complexity calculation
        this.systemComplexity = (this.integrativePotential + (1 - this.dispersivePotential)) / 2;
    }

    update() {
        // Autonomous evolution (slow drift if no mouse input)
        if (Math.abs(this.mouseX) < 0.1 && Math.abs(this.mouseY) < 0.1) {
            this.integrativePotential += (Math.random() - 0.5) * 0.001;
            this.dispersivePotential += (Math.random() - 0.5) * 0.001;

            this.integrativePotential = Math.max(0, Math.min(1, this.integrativePotential));
            this.dispersivePotential = Math.max(0, Math.min(1, this.dispersivePotential));

            this.systemComplexity = (this.integrativePotential + (1 - this.dispersivePotential)) / 2;
        }
    }
}

export { EPOSystem };