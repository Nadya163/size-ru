(function () {

  /* ─── ТАБЛИЦЫ РАЗМЕРОВ ─── */

  // Женская одежда: RU / EU / US / INT
  const WOMEN_CLOTHES = [
    { ru: 40, eu: 34, us: '0/XS', int: 'XS', chest: 80, waist: 60, hips: 86 },
    { ru: 42, eu: 36, us: '2/XS', int: 'XS', chest: 84, waist: 64, hips: 90 },
    { ru: 44, eu: 38, us: '4/S',  int: 'S',  chest: 88, waist: 68, hips: 94 },
    { ru: 46, eu: 40, us: '6/S',  int: 'S',  chest: 92, waist: 72, hips: 98 },
    { ru: 48, eu: 42, us: '8/M',  int: 'M',  chest: 96, waist: 76, hips: 102 },
    { ru: 50, eu: 44, us: '10/M', int: 'M',  chest: 100, waist: 80, hips: 106 },
    { ru: 52, eu: 46, us: '12/L', int: 'L',  chest: 104, waist: 84, hips: 110 },
    { ru: 54, eu: 48, us: '14/L', int: 'L',  chest: 108, waist: 88, hips: 114 },
    { ru: 56, eu: 50, us: '16/XL', int: 'XL', chest: 112, waist: 92, hips: 118 },
    { ru: 58, eu: 52, us: '18/XL', int: 'XL', chest: 116, waist: 96, hips: 122 },
    { ru: 60, eu: 54, us: '20/2XL', int: '2XL', chest: 120, waist: 100, hips: 126 },
    { ru: 62, eu: 56, us: '22/2XL', int: '2XL', chest: 124, waist: 104, hips: 130 },
  ];

  // Мужская одежда: RU / EU / US / INT
  const MEN_CLOTHES = [
    { ru: 44, eu: 44, us: 'XS', int: 'XS', chest: 88, waist: 72 },
    { ru: 46, eu: 46, us: 'S',  int: 'S',  chest: 92, waist: 76 },
    { ru: 48, eu: 48, us: 'M',  int: 'M',  chest: 96, waist: 80 },
    { ru: 50, eu: 50, us: 'M',  int: 'M',  chest: 100, waist: 84 },
    { ru: 52, eu: 52, us: 'L',  int: 'L',  chest: 104, waist: 88 },
    { ru: 54, eu: 54, us: 'L',  int: 'L',  chest: 108, waist: 92 },
    { ru: 56, eu: 56, us: 'XL', int: 'XL', chest: 112, waist: 96 },
    { ru: 58, eu: 58, us: 'XL', int: 'XL', chest: 116, waist: 100 },
    { ru: 60, eu: 60, us: '2XL', int: '2XL', chest: 120, waist: 104 },
    { ru: 62, eu: 62, us: '2XL', int: '2XL', chest: 124, waist: 108 },
    { ru: 64, eu: 64, us: '3XL', int: '3XL', chest: 128, waist: 112 },
  ];

  // Женская обувь: RU/EU / US / UK / CM
  const WOMEN_SHOES = [
    { eu: 35, us: '5',   uk: '3',   cm: 22.5 },
    { eu: 35.5, us: '5.5', uk: '3.5', cm: 23 },
    { eu: 36, us: '6',   uk: '4',   cm: 23.5 },
    { eu: 36.5, us: '6.5', uk: '4.5', cm: 23.5 },
    { eu: 37, us: '7',   uk: '5',   cm: 24 },
    { eu: 37.5, us: '7.5', uk: '5.5', cm: 24 },
    { eu: 38, us: '8',   uk: '6',   cm: 24.5 },
    { eu: 38.5, us: '8.5', uk: '6.5', cm: 25 },
    { eu: 39, us: '9',   uk: '7',   cm: 25.5 },
    { eu: 40, us: '9.5', uk: '7.5', cm: 26 },
    { eu: 40.5, us: '10', uk: '8',  cm: 26.5 },
    { eu: 41, us: '10.5', uk: '8.5', cm: 27 },
    { eu: 42, us: '11',  uk: '9',   cm: 27.5 },
  ];

  // Мужская обувь: RU/EU / US / UK / CM
  const MEN_SHOES = [
    { eu: 39, us: '6.5', uk: '6',   cm: 25 },
    { eu: 40, us: '7',   uk: '6.5', cm: 25.5 },
    { eu: 40.5, us: '7.5', uk: '7', cm: 26 },
    { eu: 41, us: '8',   uk: '7.5', cm: 26.5 },
    { eu: 42, us: '8.5', uk: '8',   cm: 27 },
    { eu: 42.5, us: '9', uk: '8.5', cm: 27.5 },
    { eu: 43, us: '9.5', uk: '9',   cm: 28 },
    { eu: 44, us: '10',  uk: '9.5', cm: 28.5 },
    { eu: 44.5, us: '10.5', uk: '10', cm: 29 },
    { eu: 45, us: '11',  uk: '10.5', cm: 29.5 },
    { eu: 46, us: '12',  uk: '11',  cm: 30 },
    { eu: 47, us: '12.5', uk: '11.5', cm: 30.5 },
    { eu: 48, us: '13',  uk: '12',  cm: 31 },
  ];

  /* ─── СОСТОЯНИЕ ─── */
  let currentCat = 'women-clothes';

  /* ─── UI ─── */

  function switchCat(cat) {
    currentCat = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    document.querySelectorAll('.cat-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + cat));
    // скрыть все результаты
    document.querySelectorAll('.result-block').forEach(r => r.classList.remove('show'));
  }

  function buildOptions(select, items, valueKey, labelFn) {
    select.innerHTML = '<option value="">— выберите размер —</option>';
    items.forEach((item, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = labelFn(item);
      select.appendChild(opt);
    });
  }

  function showResult(containerId, cells) {
    const block = document.getElementById(containerId);
    if (!block) return;
    const grid = block.querySelector('.result-grid');
    grid.innerHTML = '';
    cells.forEach(cell => {
      const div = document.createElement('div');
      div.className = 'result-cell';
      div.innerHTML = `<div class="cell-label">${cell.label}</div><div class="cell-value">${cell.value}</div>${cell.sub ? `<div class="cell-sub">${cell.sub}</div>` : ''}`;
      grid.appendChild(div);
    });
    block.classList.add('show');
  }

  /* Женская одежда */
  function initWomenClothes() {
    const sel = document.getElementById('wc-select');
    const dirBtns = document.querySelectorAll('#panel-women-clothes .dir-btn');
    if (!sel) return;

    let dir = 'ru'; // текущее направление

    function updateLabel() {
      const labels = {
        ru: 'Выберите российский размер (RU)',
        us: 'Выберите американский размер (US)',
        eu: 'Выберите европейский размер (EU)',
        int: 'Выберите международный размер (INT)',
      };
      sel.previousElementSibling.textContent = labels[dir] || 'Выберите размер';
    }

    function buildWC() {
      const unique = [...new Set(WOMEN_CLOTHES.map(r => r[dir]))];
      sel.innerHTML = '<option value="">— выберите размер —</option>';
      unique.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        sel.appendChild(opt);
      });
    }

    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dir = btn.dataset.dir;
        dirBtns.forEach(b => b.classList.toggle('active', b.dataset.dir === dir));
        buildWC();
        updateLabel();
        document.getElementById('wc-result').classList.remove('show');
      });
    });

    sel.addEventListener('change', () => {
      const val = sel.value;
      if (!val) { document.getElementById('wc-result').classList.remove('show'); return; }
      const rows = WOMEN_CLOTHES.filter(r => String(r[dir]) === String(val));
      if (!rows.length) return;
      const r = rows[0];
      showResult('wc-result', [
        { label: 'RU', value: r.ru },
        { label: 'EU', value: r.eu },
        { label: 'US', value: r.us },
        { label: 'INT', value: r.int },
        { label: 'Грудь', value: r.chest + ' см' },
        { label: 'Талия', value: r.waist + ' см' },
        { label: 'Бёдра', value: r.hips + ' см' },
      ]);
    });

    buildWC();
    updateLabel();
  }

  /* Мужская одежда */
  function initMenClothes() {
    const sel = document.getElementById('mc-select');
    const dirBtns = document.querySelectorAll('#panel-men-clothes .dir-btn');
    if (!sel) return;

    let dir = 'ru';

    function updateLabel() {
      const labels = { ru: 'Выберите российский размер (RU)', us: 'Выберите американский размер (US)', eu: 'Выберите европейский размер (EU)', int: 'Выберите международный размер (INT)' };
      sel.previousElementSibling.textContent = labels[dir] || 'Выберите размер';
    }

    function buildMC() {
      const unique = [...new Set(MEN_CLOTHES.map(r => r[dir]))];
      sel.innerHTML = '<option value="">— выберите размер —</option>';
      unique.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        sel.appendChild(opt);
      });
    }

    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dir = btn.dataset.dir;
        dirBtns.forEach(b => b.classList.toggle('active', b.dataset.dir === dir));
        buildMC();
        updateLabel();
        document.getElementById('mc-result').classList.remove('show');
      });
    });

    sel.addEventListener('change', () => {
      const val = sel.value;
      if (!val) { document.getElementById('mc-result').classList.remove('show'); return; }
      const rows = MEN_CLOTHES.filter(r => String(r[dir]) === String(val));
      if (!rows.length) return;
      const r = rows[0];
      showResult('mc-result', [
        { label: 'RU', value: r.ru },
        { label: 'EU', value: r.eu },
        { label: 'US', value: r.us },
        { label: 'INT', value: r.int },
        { label: 'Грудь', value: r.chest + ' см' },
        { label: 'Талия', value: r.waist + ' см' },
      ]);
    });

    buildMC();
    updateLabel();
  }

  /* Женская обувь */
  function initWomenShoes() {
    const sel = document.getElementById('ws-select');
    const dirBtns = document.querySelectorAll('#panel-women-shoes .dir-btn');
    if (!sel) return;

    let dir = 'eu';

    function updateLabel() {
      const labels = { eu: 'Выберите европейский размер (EU/RU)', us: 'Выберите американский размер (US)', uk: 'Выберите британский размер (UK)' };
      sel.previousElementSibling.textContent = labels[dir] || 'Выберите размер';
    }

    function buildWS() {
      const unique = [...new Set(WOMEN_SHOES.map(r => r[dir]))];
      sel.innerHTML = '<option value="">— выберите размер —</option>';
      unique.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        sel.appendChild(opt);
      });
    }

    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dir = btn.dataset.dir;
        dirBtns.forEach(b => b.classList.toggle('active', b.dataset.dir === dir));
        buildWS();
        updateLabel();
        document.getElementById('ws-result').classList.remove('show');
      });
    });

    sel.addEventListener('change', () => {
      const val = sel.value;
      if (!val) { document.getElementById('ws-result').classList.remove('show'); return; }
      const rows = WOMEN_SHOES.filter(r => String(r[dir]) === String(val));
      if (!rows.length) return;
      const r = rows[0];
      showResult('ws-result', [
        { label: 'EU / RU', value: r.eu },
        { label: 'US', value: r.us },
        { label: 'UK', value: r.uk },
        { label: 'Длина стопы', value: r.cm + ' см' },
      ]);
    });

    buildWS();
    updateLabel();
  }

  /* Мужская обувь */
  function initMenShoes() {
    const sel = document.getElementById('ms-select');
    const dirBtns = document.querySelectorAll('#panel-men-shoes .dir-btn');
    if (!sel) return;

    let dir = 'eu';

    function updateLabel() {
      const labels = { eu: 'Выберите европейский размер (EU/RU)', us: 'Выберите американский размер (US)', uk: 'Выберите британский размер (UK)' };
      sel.previousElementSibling.textContent = labels[dir] || 'Выберите размер';
    }

    function buildMS() {
      const unique = [...new Set(MEN_SHOES.map(r => r[dir]))];
      sel.innerHTML = '<option value="">— выберите размер —</option>';
      unique.forEach(v => {
        const opt = document.createElement('option');
        opt.value = v;
        opt.textContent = v;
        sel.appendChild(opt);
      });
    }

    dirBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        dir = btn.dataset.dir;
        dirBtns.forEach(b => b.classList.toggle('active', b.dataset.dir === dir));
        buildMS();
        updateLabel();
        document.getElementById('ms-result').classList.remove('show');
      });
    });

    sel.addEventListener('change', () => {
      const val = sel.value;
      if (!val) { document.getElementById('ms-result').classList.remove('show'); return; }
      const rows = MEN_SHOES.filter(r => String(r[dir]) === String(val));
      if (!rows.length) return;
      const r = rows[0];
      showResult('ms-result', [
        { label: 'EU / RU', value: r.eu },
        { label: 'US', value: r.us },
        { label: 'UK', value: r.uk },
        { label: 'Длина стопы', value: r.cm + ' см' },
      ]);
    });

    buildMS();
    updateLabel();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cat-btn').forEach(btn => {
      btn.addEventListener('click', () => switchCat(btn.dataset.cat));
    });

    initWomenClothes();
    initMenClothes();
    initWomenShoes();
    initMenShoes();
  });

})();
