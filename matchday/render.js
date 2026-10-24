// Renderiza matchday.html a PNG (1080x1350, formato post de Instagram).
// Uso: node render.js [salida.png]
const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const out = process.argv[2] || path.join(__dirname, 'matchday-binefar-huesca-b.png');
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 2 });
  await page.goto('file://' + path.join(__dirname, 'matchday.html'));
  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: 1350 } });
  await browser.close();
  console.log('Guardado en', out);
})();
