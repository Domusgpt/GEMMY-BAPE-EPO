import { EPOAgent } from '/GEMMY-BAPE-EPO/src/ai/EPOAgent.js';

class EPOAgentController {
    constructor(visualizers) {
        this.agents = [];
        this.visualizers = visualizers;
    }

    initialize(numAgents) {
        for (let i = 0; i < numAgents; i++) {
            const agent = new EPOAgent(i, {});
            this.agents.push(agent);
        }
    }

    update() {
        this.agents.forEach(agent => {
            agent.update();
        });
    }

    render() {
        this.agents.forEach(agent => {
            const visualizer = this.visualizers.get(`holographic-card-visualizer-${agent.id + 1}`);
            if (visualizer) {
                visualizer.updateChaos(agent.dispersiveDrive);
                visualizer.updateDensity(agent.integrativeDrive);
            }
        });
    }
}

export { EPOAgentController };
