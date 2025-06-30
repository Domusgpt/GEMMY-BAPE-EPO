class EPOAgent {
    constructor(id, initialState) {
        this.id = id;
        this.state = initialState;
        this.integration = 0.5; // 0 = fully dispersed, 1 = fully integrated
        this.dispersiveDrive = 0.5; // Tendency towards chaos
        this.integrativeDrive = 0.5; // Tendency towards order
    }

    update() {
        // Update the agent's state based on its drives
        this.integration += (this.integrativeDrive - this.dispersiveDrive) * 0.01;
        this.integration = Math.max(0, Math.min(1, this.integration));

        // The drives themselves can also evolve over time
        this.dispersiveDrive += (Math.random() - 0.5) * 0.01;
        this.integrativeDrive += (Math.random() - 0.5) * 0.01;
        this.dispersiveDrive = Math.max(0, Math.min(1, this.dispersiveDrive));
        this.integrativeDrive = Math.max(0, Math.min(1, this.integrativeDrive));
    }
}

export { EPOAgent };
