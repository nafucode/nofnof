(function () {
  var WA_PHONE = '8619537757775';
  var options = [
    'Cars / EV',
    'Mirrors',
    'Home lift',
    'Passenger lift',
    'Cargo / goods lift',
    'Flooring',
    'Other / not sure'
  ];
  var modal;
  var activeCategory = '';
  var requirementTemplates = {
    'Cars / EV': 'Vehicle type:\nBrand / model / year:\nQuantity:\nBudget:\nDestination country / port:',
    'Mirrors': 'Mirror size / shape:\nLED / anti-fog function:\nFrame color:\nQuantity:\nDestination country:',
    'Home lift': 'Home lift floors / stops:\nLoad capacity:\nShaft size or drawing:\nPreferred style:\nInstallation country:',
    'Passenger lift': 'Passenger lift floors / stops:\nLoad capacity:\nSpeed:\nProject drawing available:\nDestination country:',
    'Cargo / goods lift': 'Cargo / goods lift capacity:\nFloors / stops:\nPlatform size:\nGoods type:\nDestination country:',
    'Flooring': 'Flooring material:\nProject area:\nThickness / color:\nIndoor or outdoor:\nDestination country:',
    'Other / not sure': 'Product name:\nQuantity:\nTarget specification:\nBudget:\nDestination country:'
  };

  function inferCategory(link) {
    var text = ((link && link.textContent) || '').toLowerCase();
    var href = ((link && link.getAttribute('href')) || '').toLowerCase();
    var path = window.location.pathname.toLowerCase();
    var haystack = [text, href, path].join(' ');

    if (/(^|[^a-z0-9])(cars?|ev)([^a-z0-9]|$)/.test(haystack)) return 'Cars / EV';
    if (haystack.indexOf('mirror') !== -1) return 'Mirrors';
    if (haystack.indexOf('home') !== -1) return 'Home lift';
    if (haystack.indexOf('cargo') !== -1 || haystack.indexOf('goods') !== -1) return 'Cargo / goods lift';
    if (haystack.indexOf('floor') !== -1) return 'Flooring';
    if (haystack.indexOf('elevator') !== -1 || haystack.indexOf('lift') !== -1) return 'Passenger lift';
    return '';
  }

  function buildMessage(category, details) {
    var lines = [
      'Hi NOFNOF, I am interested in: ' + category + '.'
    ];
    if (details) lines.push('Requirement: ' + details);
    lines.push('Please send product options and quotation details.');
    lines.push('Page: ' + document.title);
    return lines.join('\n');
  }

  function makeWhatsAppUrl(category, details) {
    return 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(buildMessage(category, details));
  }

  function getTemplate(category) {
    return requirementTemplates[category] || requirementTemplates['Other / not sure'];
  }

  function addStyles() {
    if (document.getElementById('wa-inquiry-style')) return;
    var style = document.createElement('style');
    style.id = 'wa-inquiry-style';
    style.textContent = [
      '.wa-inquiry-lock{overflow:hidden}',
      '.wa-inquiry-overlay{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:1.2rem;background:rgba(8,18,38,.54);backdrop-filter:blur(8px)}',
      '.wa-inquiry-overlay.is-open{display:flex}',
      '.wa-inquiry-box{width:min(540px,100%);background:#fff;color:#1d1d1f;border-radius:14px;box-shadow:0 28px 80px rgba(0,0,0,.28);overflow:hidden}',
      '.wa-inquiry-head{display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;padding:1.35rem 1.45rem 1rem;border-bottom:1px solid rgba(0,0,0,.08)}',
      '.wa-inquiry-title{margin:0;font-size:1.15rem;line-height:1.25;font-weight:800;letter-spacing:-.01em}',
      '.wa-inquiry-sub{margin:.35rem 0 0;color:#68686d;font-size:.84rem;line-height:1.55}',
      '.wa-inquiry-close{width:34px;height:34px;border:1px solid rgba(0,0,0,.12);border-radius:50%;background:#fff;color:#1d1d1f;cursor:pointer;font-size:1.2rem;line-height:1;display:flex;align-items:center;justify-content:center}',
      '.wa-inquiry-body{padding:1.25rem 1.45rem 1.45rem}',
      '.wa-inquiry-options{display:grid;grid-template-columns:repeat(2,1fr);gap:.65rem;margin-bottom:1rem}',
      '.wa-inquiry-option{border:1px solid rgba(0,0,0,.13);border-radius:8px;background:#f7f8fb;color:#1d1d1f;padding:.78rem .85rem;text-align:left;font-size:.84rem;font-weight:700;cursor:pointer;transition:border-color .16s,background .16s,color .16s,box-shadow .16s}',
      '.wa-inquiry-option:hover{border-color:#0071e3;background:#eef6ff}',
      '.wa-inquiry-option.is-selected{border-color:#0071e3;background:#e8f1fd;color:#0071e3;box-shadow:0 0 0 3px rgba(0,113,227,.1)}',
      '.wa-inquiry-label{display:block;margin:0 0 .45rem;color:#1d1d1f;font-size:.78rem;font-weight:800}',
      '.wa-inquiry-text{width:100%;min-height:92px;resize:vertical;border:1px solid rgba(0,0,0,.16);border-radius:8px;padding:.8rem .9rem;font:inherit;font-size:.86rem;line-height:1.55;outline:none}',
      '.wa-inquiry-text:focus{border-color:#0071e3;box-shadow:0 0 0 3px rgba(0,113,227,.12)}',
      '.wa-inquiry-actions{display:flex;gap:.75rem;margin-top:1rem}',
      '.wa-inquiry-secondary,.wa-inquiry-primary{min-height:44px;border-radius:8px;padding:.75rem 1rem;font-size:.86rem;font-weight:800;cursor:pointer}',
      '.wa-inquiry-secondary{flex:0 0 auto;background:#fff;border:1px solid rgba(0,0,0,.16);color:#1d1d1f}',
      '.wa-inquiry-primary{flex:1;border:0;background:#25D366;color:#fff}',
      '.wa-inquiry-hint{margin:.75rem 0 0;color:#8a8a91;font-size:.72rem;line-height:1.45;text-align:center}',
      '@media(max-width:520px){.wa-inquiry-options{grid-template-columns:1fr}.wa-inquiry-actions{flex-direction:column-reverse}.wa-inquiry-secondary,.wa-inquiry-primary{width:100%}}'
    ].join('');
    document.head.appendChild(style);
  }

  function ensureModal() {
    if (modal) return modal;
    addStyles();
    modal = document.createElement('div');
    modal.className = 'wa-inquiry-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'wa-inquiry-title');
    modal.innerHTML = [
      '<div class="wa-inquiry-box">',
      '  <div class="wa-inquiry-head">',
      '    <div>',
      '      <h2 class="wa-inquiry-title" id="wa-inquiry-title">What are you sourcing?</h2>',
      '      <p class="wa-inquiry-sub">Choose a product type and add a short note. We will send it to WhatsApp for you.</p>',
      '    </div>',
      '    <button class="wa-inquiry-close" type="button" aria-label="Close">x</button>',
      '  </div>',
      '  <div class="wa-inquiry-body">',
      '    <div class="wa-inquiry-options" role="group" aria-label="Product type"></div>',
      '    <label class="wa-inquiry-label" for="wa-inquiry-text">Short requirement</label>',
      '    <textarea class="wa-inquiry-text" id="wa-inquiry-text" placeholder="Edit the checklist before opening WhatsApp."></textarea>',
      '    <div class="wa-inquiry-actions">',
      '      <button class="wa-inquiry-secondary" type="button">Cancel</button>',
      '      <button class="wa-inquiry-primary" type="button">Continue to WhatsApp</button>',
      '    </div>',
      '    <p class="wa-inquiry-hint">WhatsApp will open with your message already filled in.</p>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(modal);

    var optionWrap = modal.querySelector('.wa-inquiry-options');
    options.forEach(function (option) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'wa-inquiry-option';
      button.textContent = option;
      button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', function () {
        selectCategory(option);
      });
      optionWrap.appendChild(button);
    });

    modal.querySelector('.wa-inquiry-close').addEventListener('click', closeModal);
    modal.querySelector('.wa-inquiry-secondary').addEventListener('click', closeModal);
    modal.querySelector('.wa-inquiry-primary').addEventListener('click', submitInquiry);
    modal.addEventListener('click', function (event) {
      if (event.target === modal) closeModal();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
    return modal;
  }

  function selectCategory(category) {
    activeCategory = category;
    var box = ensureModal();
    box.querySelectorAll('.wa-inquiry-option').forEach(function (button) {
      var selected = button.textContent === category;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
    box.querySelector('.wa-inquiry-text').value = getTemplate(category);
  }

  function openModal(link) {
    var box = ensureModal();
    selectCategory(inferCategory(link) || 'Other / not sure');
    box.classList.add('is-open');
    document.body.classList.add('wa-inquiry-lock');
    window.setTimeout(function () {
      var selected = box.querySelector('.wa-inquiry-option.is-selected');
      if (selected) selected.focus();
    }, 0);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.body.classList.remove('wa-inquiry-lock');
  }

  function submitInquiry() {
    var details = ensureModal().querySelector('.wa-inquiry-text').value.trim();
    var category = activeCategory || 'Other / not sure';
    var url = makeWhatsAppUrl(category, details);
    closeModal();
    window.open(url, '_blank', 'noopener');
  }

  document.addEventListener('click', function (event) {
    var link = event.target.closest && event.target.closest('a[href*="wa.me/"]');
    if (!link) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openModal(link);
  });
})();
