const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // Inject CSS overrides to fix logo layout on landing page
  const styleOverride = `
<style>
  .lnd-logo {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 18px !important;
  }
  .lnd-logo img {
    height: 120px !important;
    display: block;
    filter: drop-shadow(0 0 28px rgba(192,39,45,.6)) drop-shadow(0 4px 16px rgba(0,0,0,.7)) !important;
  }
  .lnd-name {
    font-size: 22px !important;
    letter-spacing: 0.5px !important;
  }
  .lnd-co {
    font-size: 14px !important;
    letter-spacing: 1px !important;
    margin-top: 4px !important;
  }
</style>`;

  html = html.replace('</head>', styleOverride + '\n</head>');

  // 1. Landing page logo
  html = html.replace(
    '<div class="lnd-mark">SV</div>',
    '<img src="logo.png" alt="Shannon Valley Group">'
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
