const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ args: ['--disable-web-security'] });
    const page = await browser.newPage();

    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => {
      console.log('PAGE ERROR:', error.message);
    });

    await page.goto('http://localhost:8669/index.html');

    try {
        await page.waitForFunction(() => window.VIB34D_SYSTEM && window.VIB34D_SYSTEM.isInitialized, { timeout: 60000 });

        const epoAgentController = await page.evaluate(() => window.VIB34D_SYSTEM.epoAgentController);
        if (!epoAgentController) {
            console.error('EPOAgentController not found!');
            await browser.close();
            process.exit(1);
        }

        const initialIntegration = await page.evaluate(() => window.VIB34D_SYSTEM.epoAgentController.agents[0].integration);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const nextIntegration = await page.evaluate(() => window.VIB34D_SYSTEM.epoAgentController.agents[0].integration);

        if (initialIntegration === nextIntegration) {
            console.error('Agents are not being updated!');
            await browser.close();
            process.exit(1);
        }

        console.log('EPO Agent Multi-Mode test passed!');
    } catch (e) {
        console.error('Test failed with error:', e.message);
    } finally {
        await browser.close();
    }
})();
