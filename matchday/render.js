// Renderiza los carteles a PNG.
// Uso: node render.js            -> post (1080x1350) e historia (1080x1920)
//      node render.js post|story [salida.png]
const path = require('path');
const { chromium } = require('playwright');

const formats = {
  post: { html: 'matchday.html', height: 1350, out: 'matchday-binefar-huesca-b.png' },
  story: { html: 'matchday-story.html', height: 1920, out: 'matchday-binefar-huesca-b-story.png' },
};

(async () => {
  const [which, customOut] = process.argv.slice(2);
  const selected = which ? [which] : Object.keys(formats);
  const browser = await chromium.launch();
  for (const name of selected) {
    const f = formats[name];
    const out = customOut || path.join(__dirname, f.out);
    const page = await browser.newPage({ viewport: { width: 1080, height: f.height }, deviceScaleFactor: 2 });
    await page.goto('file://' + path.join(__dirname, f.html));
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: out, clip: { x: 0, y: 0, width: 1080, height: f.height } });
    await page.close();
    console.log('Guardado en', out);
  }
  await browser.close();
})();
