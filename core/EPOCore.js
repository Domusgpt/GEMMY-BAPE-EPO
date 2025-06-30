class EPOCore {
    constructor() {
        this.integrativePotential = 0.5; // Represents EPO-I, tendency towards order/complexity
        this.dispersivePotential = 0.5;  // Represents EPO-D, tendency towards chaos/homogeneity
        this.systemComplexity = 0.5;     // Derived from the balance of EPO-I and EPO-D

        this.time = 0;
        this.deltaTime = 0;

        // Internal dynamics parameters
        this.integrationRate = 0.001; // How fast EPO-I grows
        this.dispersionRate = 0.001;  // How fast EPO-D grows
        this.interactionStrength = 0.05; // How much EPO-I and EPO-D influence each other
    }

    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.time += deltaTime;

        // Autonomous evolution of potentials
        // EPO-I tends to increase complexity, but is also influenced by EPO-D
        this.integrativePotential += (this.integrationRate * (1.0 - this.integrativePotential) - this.dispersivePotential * this.interactionStrength) * deltaTime;
        // EPO-D tends to increase chaos, but is also influenced by EPO-I
        this.dispersivePotential += (this.dispersionRate * (1.0 - this.dispersivePotential) - this.integrativePotential * this.interactionStrength) * deltaTime;

        // Clamp potentials to [0, 1]
        this.integrativePotential = Math.max(0, Math.min(1, this.integrativePotential));
        this.dispersivePotential = Math.max(0, Math.min(1, this.dispersivePotential));

        // System Complexity is a balance between integration and dispersion
        // A higher integrative potential and lower dispersive potential leads to higher complexity
        this.systemComplexity = (this.integrativePotential + (1.0 - this.dispersivePotential)) / 2.0;

        // Allometric Scaling: Derived from system complexity
        // A higher complexity leads to a larger scale factor, representing growth or increased organization
        // Using a non-linear mapping to emphasize the effect of complexity
        this.scaleFactor = 0.5 + (this.systemComplexity * this.systemComplexity) * 1.5; // Range from 0.5 to 2.0
    }

    // Method to allow external influence (e.g., user interaction) on potentials
    influence(integrativeDelta, dispersiveDelta) {
        this.integrativePotential += integrativeDelta;
        this.dispersivePotential += dispersiveDelta;

        this.integrativePotential = Math.max(0, Math.min(1, this.integrativePotential));
        this.dispersivePotential = Math.max(0, Math.min(1, this.dispersivePotential));
    }

    getPotentials() {
        return {
            integrative: this.integrativePotential,
            dispersive: this.dispersivePotential,
            complexity: this.systemComplexity,
            scaleFactor: this.scaleFactor
        };
    }
}

export { EPOCore };