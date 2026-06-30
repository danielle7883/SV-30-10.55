const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // 1. Landing page — large centred logo with glow
  html = html.replace(
    '<div class="lnd-mark">SV</div>',
    '<img src="logo.png" alt="Shannon Valley Group" style="height:110px;object-fit:contain;filter:drop-shadow(0 0 24px rgba(192,39,45,.55)) drop-shadow(0 4px 12px rgba(0,0,0,.6));display:block;">'
  );

  // 2. Shell bar logos — white-tinted, small
  html = html.replace(
    /<span class="shell-mark">SV<\/span>/g,
    '<img src="logo.png" alt="SVG" style="height:28px;object-fit:contain;filter:brightness(0) invert(1)">'
  );

  // 3. Admin sidebar logo
  html = html.replace(
    '<div class="adm-mark">SV</div>',
    '<img src="logo.png" alt="Shannon Valley Group" style="height:36px;object-fit:contain;display:block;margin-bottom:6px">'
  );

  // 4. Mobile wireframe login screen — replace SV app icon with logo
  html = html.replace(
    '<div class="login-mark"><span>SV</span></div>',
    '<img src="logo.png" alt="Shannon Valley Group" style="height:80px;object-fit:contain;display:block;margin:0 auto 12px;filter:drop-shadow(0 2px 10px rgba(192,39,45,.4))">'
  );

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`SVG Portal running on port ${PORT}`);
});
