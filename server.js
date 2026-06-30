const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

// Route MUST come before express.static
app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

  // ── LOGO CSS + MOBILE RESPONSIVE STYLES ──────────────────────────────
  const styleOverride = `
<style>
  /* Logo layout fix */
  .lnd-logo {
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    gap: 14px !important;
  }
  .lnd-logo img {
    height: 120px !important;
    object-fit: contain !important;
    display: block !important;
    filter: drop-shadow(0 0 28px rgba(192,39,45,.6)) drop-shadow(0 4px 16px rgba(0,0,0,.6)) !important;
  }

  /* ── MOBILE OVERLAY ── */
  .mob-overlay {
    display: none;
    position: fixed; inset: 0;
    background: rgba(0,0,0,.5);
    z-index: 199;
  }
  .mob-overlay.on { display: block; }

  /* ── MOBILE MENU BUTTON ── */
  .mob-menu-btn {
    display: none;
    background: rgba(255,255,255,.1);
    border: 1px solid rgba(255,255,255,.15);
    color: rgba(255,255,255,.85);
    font-size: 16px;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 6px;
    margin-right: 8px;
    font-family: inherit;
    line-height: 1;
  }

  @media (max-width: 768px) {

    /* Allow scrolling on mobile */
    body { overflow: auto; }
    .sect { height: auto; min-height: 100vh; overflow: visible; }
    .sect.on { display: flex; }

    /* ── LANDING ── */
    .landing-inner { padding: 28px 16px 40px; justify-content: flex-start; padding-top: 48px; }
    .lnd-logo img { height: 90px !important; }
    .lnd-grid {
      grid-template-columns: 1fr !important;
      gap: 12px;
      width: 100%;
      max-width: 100%;
    }
    .lnd-tagline { margin-bottom: 28px; }
    .lnd-card { padding: 20px 18px; }

    /* ── SHELL BAR ── */
    .shell-bar { padding: 0 12px; }
    .shell-sect-label { display: none; }
    .mob-menu-btn { display: inline-flex !important; align-items: center; }

    /* ── PORTAL SUB-BAR ── */
    .portal-sub-bar { overflow-x: auto; -webkit-overflow-scrolling: touch; gap: 2px; padding: 0 10px; }
    .psb-btn { white-space: nowrap; font-size: 10px; padding: 5px 10px; }

    /* ── ADMIN SIDEBAR → slide-in drawer ── */
    .sidebar {
      position: fixed !important;
      left: -220px !important; top: 0; bottom: 0;
      z-index: 200;
      transition: left .25s ease;
      width: 220px !important;
      height: 100vh;
    }
    .sidebar.mob-open { left: 0 !important; }
    .admin-layout { display: block; }
    .admin-main { width: 100%; overflow-y: auto; max-height: 100vh; }
    .admin-topbar { padding: 0 12px; }
    .admin-topbar h1 { font-size: 13px; }
    .admin-topbar .tb-right { gap: 6px; }
    .atb-select { font-size: 10px; padding: 5px 7px; max-width: 110px; }
    .admin-content { padding: 12px; }

    /* ── SUPPLIER SIDEBAR → slide-in drawer ── */
    .sup-sidebar {
      position: fixed !important;
      left: -210px !important; top: 0; bottom: 0;
      z-index: 200;
      transition: left .25s ease;
      width: 210px !important;
      height: 100vh;
    }
    .sup-sidebar.mob-open { left: 0 !important; }
    .supplier-layout { display: block; }
    .sup-main { width: 100%; overflow-y: auto; max-height: 100vh; }
    .sup-topbar { padding: 0 12px; }
    .sup-topbar h1 { font-size: 13px; }
    .sup-content { padding: 12px; }

    /* ── STAT / METRIC GRIDS ── */
    .stat-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 8px; }
    .sup-met-strip { grid-template-columns: repeat(2, 1fr) !important; gap: 8px; }
    .stat-val { font-size: 18px; }

    /* ── CONTENT GRIDS ── */
    .two-col { grid-template-columns: 1fr !important; }
    .three-col { grid-template-columns: 1fr !important; }
    .form-grid { grid-template-columns: 1fr !important; }
    .form-grid.three { grid-template-columns: 1fr !important; }
    .sup-access-grid { grid-template-columns: 1fr !important; }
    .dn-meta-grid { grid-template-columns: 1fr 1fr !important; }
    .sup-expanded-inner { grid-template-columns: 1fr 1fr !important; }

    /* ── TABLES → horizontal scroll ── */
    .a-card { overflow-x: auto; }
    .data-table { min-width: 540px; }
    .mini-tbl { min-width: 360px; }

    /* ── MISC ── */
    .po-bar-wrap { display: none; }
    .alert-item { flex-wrap: wrap; }
    .alert-date { width: 100%; text-align: right; margin-top: 4px; }
    .shell-name { font-size: 11px; }
    .btn-red, .btn-outline { padding: 6px 10px; font-size: 10px; }
  }

  @media (max-width: 480px) {
    .lnd-logo img { height: 75px !important; }
    .stat-strip { grid-template-columns: 1fr 1fr !important; }
    .sup-met-strip { grid-template-columns: 1fr 1fr !important; }
    .lnd-card-title { font-size: 14px; }
  }
</style>`;
  html = html.replace('</head>', styleOverride + '\n</head>');

  // ── LOGO REPLACEMENTS ─────────────────────────────────────────────────

  // Landing page
  html = html.replace(
    /<div class="lnd-mark">SV<\/div>/g,
    '<img src="logo.png" alt="Shannon Valley Group">'
  );
  // Shell bars
  html = html.replace(
    /<span class="shell-mark">SV<\/span>/g,
    '<img src="logo.png" alt="SVG" style="height:28px;object-fit:contain;filter:brightness(0) invert(1)">'
  );
  // Admin sidebar
  html = html.replace(
    /<div class="adm-mark">SV<\/div>/g,
    '<img src="logo.png" alt="Shannon Valley Group" style="height:36px;object-fit:contain;display:block;margin-bottom:6px">'
  );
  // Mobile login screen
  html = html.replace(
    /<div class="login-mark"><span>SV<\/span><\/div>/g,
    '<img src="logo.png" alt="Shannon Valley Group" style="height:80px;object-fit:contain;display:block;margin:0 auto 12px;filter:drop-shadow(0 2px 10px rgba(192,39,45,.4))">'
  );

  // ── ADD MOBILE MENU BUTTONS to topbars ───────────────────────────────

  // Admin topbar — add hamburger before h1
  html = html.replace(
    /<div class="admin-topbar">\s*<h1>/,
    '<div class="admin-topbar"><button class="mob-menu-btn" onclick="toggleSidebar(\'admin\')">☰</button><h1>'
  );

  // Supplier topbar — add hamburger before h1
  html = html.replace(
    /<div class="sup-topbar">\s*<h1>/,
    '<div class="sup-topbar"><button class="mob-menu-btn" onclick="toggleSidebar(\'sup\')">☰</button><h1>'
  );

  // ── MOBILE OVERLAY + JS ──────────────────────────────────────────────
  const mobileJS = `
<div class="mob-overlay" id="mob-overlay" onclick="closeSidebars()"></div>
<script>
function toggleSidebar(type) {
  var overlay = document.getElementById('mob-overlay');
  if (type === 'admin') {
    var sb = document.querySelector('.sidebar');
    if (sb) { sb.classList.toggle('mob-open'); overlay.classList.toggle('on'); }
  } else if (type === 'sup') {
    var sb = document.querySelector('.sup-sidebar');
    if (sb) { sb.classList.toggle('mob-open'); overlay.classList.toggle('on'); }
  }
}
function closeSidebars() {
  document.querySelectorAll('.sidebar, .sup-sidebar').forEach(function(el) {
    el.classList.remove('mob-open');
  });
  document.getElementById('mob-overlay').classList.remove('on');
}
<\/script>`;
  html = html.replace('</body>', mobileJS + '\n</body>');

  res.send(html);
});

// Static files — index:false ensures / goes through route above
app.use(express.static(__dirname, { index: false }));

app.listen(PORT, () => {
  console.log(`SVG Portal running on port ${PORT}`);
});
