const COMPANIES = ['a', 'b', 'c'];

/* --- KOLORY TRANSFERÓW (6 kierunków) --- */
const LINK_CLASSES = ['link-pink','link-red','link-green','link-cyan','link-blue','link-violet'];
const LINK_BY_PAIR = {
  'A->B': 'link-pink',
  'A->C': 'link-red',
  'B->A': 'link-green',
  'B->C': 'link-cyan',
  'C->A': 'link-blue',
  'C->B': 'link-violet',
};

/* =========================
   i18n (UI text)
   ========================= */
const I18N = {
  pl: {
    'nav.calculator': 'Kalkulator',
    'nav.summary': 'Podsumowanie',
    'hero.title': 'Kalkulator INT CIT dla 3 Spółek',
    'hero.subtitle': 'Kalkulacja fakturowania wewnętrznego oraz wyliczanie wyniku brutto, podatku CIT i wyniku netto.',
    'hero.note1': 'Edytowalne pola podświetlane są na żółto.',
    'hero.note2': 'Uzupełnione koszty są oznaczane oddzielnym kolorem odpowiadającym polu przychodów właściwej spółki.',
    'section.companyNames': 'Nazwy Spółek',
    'section.summary': 'Podsumowanie',
    'summary.company': 'Spółka',
    'summary.netResult': 'Wynik netto',
    'summary.total': 'Razem',
    'block.netRevenue': 'Przychody netto',
    'block.netCosts': 'Koszty netto',
    'block.gross': 'Wynik brutto',
    'block.net': 'Wynik netto',
    'block.citRate': 'Stawka CIT',
    'label.total': 'Suma',
    'label.revenue': 'Przychody',
    'label.costs': 'Koszty',
    'label.gross': 'Wynik brutto',
    'label.net': 'Wynik netto',
    'label.tax': 'Podatek',
    'label.other': 'Inna',
    'row.externalCustomers': 'Odbiorcy zewnętrzni',
    'row.externalSuppliers': 'Dostawcy zewnętrzni',
    'row.customerPrefix': 'Odbiorca',
    'row.supplierPrefix': 'Dostawca',
    'company.nameLabel': 'Nazwa Spółki {L}',
    'company.placeholder': 'Spółka {L}',
    'company.defaultName': 'Spółka {L}',
    'export.csv': 'Eksportuj CSV',
    'export.excel': 'Eksportuj Excel',
    'import.csv': 'Importuj CSV',
    'import.excel': 'Importuj Excel',
  },
  en: {
    'nav.calculator': 'Calculator',
    'nav.summary': 'Summary',
    'hero.title': 'INT CIT Calculator for 3 Companies',
    'hero.subtitle': 'Internal billing calculation and automated computation of gross profit, corporate income tax (CIT), and net profit.',
    'hero.note1': 'Editable fields are highlighted in yellow.',
    'hero.note2': 'Entered costs are marked with a separate color matching the corresponding revenue field.',
    'section.companyNames': 'Company Names',
    'section.summary': 'Summary',
    'summary.company': 'Company',
    'summary.netResult': 'Net profit',
    'summary.total': 'Total',
    'block.netRevenue': 'Net revenue',
    'block.netCosts': 'Net costs',
    'block.gross': 'Gross profit',
    'block.net': 'Net profit',
    'block.citRate': 'CIT rate',
    'label.total': 'Total',
    'label.revenue': 'Revenue',
    'label.costs': 'Costs',
    'label.gross': 'Gross profit',
    'label.net': 'Net profit',
    'label.tax': 'Tax',
    'label.other': 'Other',
    'row.externalCustomers': 'External customers',
    'row.externalSuppliers': 'External suppliers',
    'row.customerPrefix': 'Customer',
    'row.supplierPrefix': 'Supplier',
    'company.nameLabel': 'Company {L} name',
    'company.placeholder': 'Company {L}',
    'company.defaultName': 'Company {L}',
    'export.csv': 'Export CSV',
    'export.excel': 'Export Excel',
    'import.csv': 'Import CSV',
    'import.excel': 'Import Excel',
  },
  de: {
    'nav.calculator': 'Rechner',
    'nav.summary': 'Zusammenfassung',
    'hero.title': 'Intern. KSt-Rechner für 3 Unternehmen',
    'hero.subtitle': 'Interne Verrechnung und automatische Berechnung von Bruttoergebnis, Körperschaftsteuer (KSt) und Nettoergebnis.',
    'hero.note1': 'Editierbare Felder sind gelb hervorgehoben.',
    'hero.note2': 'Eingegebene Kosten werden farblich passend zum entsprechenden Erlösfeld markiert.',
    'section.companyNames': 'Firmennamen',
    'section.summary': 'Zusammenfassung',
    'summary.company': 'Unternehmen',
    'summary.netResult': 'Nettoergebnis',
    'summary.total': 'Insgesamt',
    'block.netRevenue': 'Nettoerlöse',
    'block.netCosts': 'Nettokosten',
    'block.gross': 'Bruttoergebnis',
    'block.net': 'Nettoergebnis',
    'block.citRate': 'KSt-Satz',
    'label.total': 'Summe',
    'label.revenue': 'Erlöse',
    'label.costs': 'Kosten',
    'label.gross': 'Bruttoergebnis',
    'label.net': 'Nettoergebnis',
    'label.tax': 'Steuer',
    'label.other': 'Andere',
    'row.externalCustomers': 'Externe Kunden',
    'row.externalSuppliers': 'Externe Lieferanten',
    'row.customerPrefix': 'Kunde',
    'row.supplierPrefix': 'Lieferant',
    'company.nameLabel': 'Name der Firma {L}',
    'company.placeholder': 'Firma {L}',
    'company.defaultName': 'Firma {L}',
    'export.csv': 'CSV exportieren',
    'export.excel': 'Excel exportieren',
    'import.csv': 'CSV importieren',
    'import.excel': 'Excel importieren',
  }
};

const LANG_KEY = 'calc_lang';
let currentLang = 'pl';

const SUPPORTED_LANGS = ['pl', 'en', 'de'];

/* =========================
   EXPORT (CSV + XLSX)
   ========================= */

function getDateStamp() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/* --- AOA collectors (DOM -> Array of Arrays) --- */

// Summary table (podsumowanie)
function collectSummaryAoA() {
  const aoa = [[t('summary.company'), t('summary.netResult')]];

  document.querySelectorAll('#summary-body tr').forEach(tr => {
    const tds = tr.querySelectorAll('td');
    if (tds.length >= 2) {
      aoa.push([tds[0].innerText.trim(), tds[1].innerText.trim()]);
    }
  });

  const totalLabel =
    document.querySelector('#podsumowanie .summary-table tfoot th')?.innerText?.trim() || t('summary.total');
  const totalVal = document.querySelector('.js-summary-total')?.innerText?.trim() || '';
  aoa.push([totalLabel, totalVal]);

  return aoa;
}

// Full-ish export: meta + names + each company tables + results + summary
function collectDataAoA() {
  const aoa = [];
  aoa.push(['lang', currentLang]);
  aoa.push(['exportedAt', new Date().toISOString()]);
  aoa.push([]);

  // Company names
  aoa.push([t('section.companyNames')]);
  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();
    const name = document.getElementById(`name-${letter}`)?.value || t('company.defaultName', { L });
    aoa.push([L, name]);
  });
  aoa.push([]);

  // Per company blocks
  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();
    const comp = document.getElementById(`spolka-${letter}`);
    const name = document.getElementById(`name-${letter}`)?.value || t('company.defaultName', { L });

    aoa.push([`${name} (${L})`]);

    // Income table
    aoa.push([t('block.netRevenue')]);
    aoa.push(['Label', 'Value']);
    comp?.querySelectorAll('.js-income-body tr').forEach(tr => {
      const label = tr.querySelector('td')?.innerText?.trim() || '';
      const val = tr.querySelector('input')?.value ?? '';
      aoa.push([label, val]);
    });
    aoa.push([]);

    // Costs table
    aoa.push([t('block.netCosts')]);
    aoa.push(['Label', 'Value']);
    comp?.querySelectorAll('.js-costs-body tr').forEach(tr => {
      const label = tr.querySelector('td')?.innerText?.trim() || '';
      const val = tr.querySelector('input')?.value ?? '';
      aoa.push([label, val]);
    });
    aoa.push([]);

    // Results
    aoa.push([t('block.gross')]);
    aoa.push([t('label.revenue'), comp?.querySelector('.js-przychody-sum')?.value ?? '']);
    aoa.push([t('label.costs'), comp?.querySelector('.js-koszty-sum')?.value ?? '']);
    aoa.push([t('label.gross'), comp?.querySelector('.js-wynik-brutto')?.value ?? '']);
    aoa.push([t('label.tax'), comp?.querySelector('.js-podatek')?.value ?? '']);
    aoa.push([t('label.net'), comp?.querySelector('.js-wynik-netto')?.value ?? '']);
    aoa.push([]);
  });

  // Summary at end
  aoa.push([t('section.summary')]);
  aoa.push(...collectSummaryAoA());

  return aoa;
}

/* --- CSV helpers --- */
function escapeCsvCell(v, sep) {
  const s = (v === null || v === undefined) ? '' : String(v);
  // quote if needed
  if (s.includes('"') || s.includes('\n') || s.includes('\r') || s.includes(sep)) {
    return `"${s.replaceAll('"', '""')}"`;
  }
  return s;
}

function aoaToCsv(aoa, sep) {
  return aoa.map(row => row.map(cell => escapeCsvCell(cell, sep)).join(sep)).join('\r\n');
}

/* --- Exports --- */
function exportCSV() {
  const aoa = collectDataAoA();

  // Separator: w PL/DE zwykle lepiej działa ';' (Excel), w EN ','
  const sep = (currentLang === 'en') ? ',' : ';';

  const csv = '\ufeff' + aoaToCsv(aoa, sep);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  downloadBlob(blob, `cit_calc_${getDateStamp()}.csv`);
}

function exportExcel() {
  if (typeof XLSX === 'undefined') {
    alert('Brak biblioteki XLSX (SheetJS). Dodaj xlsx.full.min.js w index.html.');
    return;
  }

  const wb = XLSX.utils.book_new();

  const wsSummary = XLSX.utils.aoa_to_sheet(collectSummaryAoA());
  XLSX.utils.book_append_sheet(wb, wsSummary, currentLang === 'pl' ? 'Podsumowanie' : 'Summary');

  const wsData = XLSX.utils.aoa_to_sheet(collectDataAoA());
  XLSX.utils.book_append_sheet(wb, wsData, 'Data');

  XLSX.writeFile(wb, `cit_calc_${getDateStamp()}.xlsx`);
}

function detectBrowserLang() {
  try {
    const list =
      (navigator && Array.isArray(navigator.languages) && navigator.languages.length)
        ? navigator.languages
        : [navigator?.language, navigator?.userLanguage];

    for (const lang of list) {
      if (!lang) continue;
      const base = String(lang).toLowerCase().split(/[-_]/)[0]; // np. "pl-PL" -> "pl"
      if (SUPPORTED_LANGS.includes(base)) return base;
    }
  } catch (_) {}
  return null;
}

function getInitialLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved && SUPPORTED_LANGS.includes(saved)) return saved;

  return detectBrowserLang() || 'en';
}

/* =========================
   Format liczb zależny od języka
   ========================= */
const LOCALE_BY_LANG = { pl: 'pl-PL', en: 'en-US', de: 'de-DE' };
let nf = new Intl.NumberFormat(LOCALE_BY_LANG[currentLang], { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function setNumberLocale(lang) {
  const locale = LOCALE_BY_LANG[lang] || 'pl-PL';
  nf = new Intl.NumberFormat(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Parser „elastyczny”:
 * - rozumie: 1 234,56 | 1.234,56 | 1,234.56 | 1234.56 | 1234,56
 * - wybiera ostatni separator (.,) jako dziesiętny
 * - resztę separatorów traktuje jako tysiące i usuwa
 */
function parseNum(v) {
  if (v === null || v === undefined) return 0;
  let s = String(v).trim();
  if (!s) return 0;

  // usuń spacje różnych typów
  s = s.replace(/[ \u00A0\u202F]/g, '');

  // zostaw tylko cyfry, minus i separatory
  s = s.replace(/[^\d.,-]/g, '');

  // jeśli są i kropki i przecinki -> ostatni z nich to separator dziesiętny
  const lastDot = s.lastIndexOf('.');
  const lastComma = s.lastIndexOf(',');

  let decSep = null;
  if (lastDot !== -1 || lastComma !== -1) {
    decSep = (lastDot > lastComma) ? '.' : ',';
  }

  if (decSep) {
    const otherSep = decSep === '.' ? ',' : '.';
    // usuń separatory tysięcy
    s = s.replaceAll(otherSep, '');
    // zamień separator dziesiętny na kropkę
    if (decSep === ',') s = s.replace(',', '.');
    // jeśli było więcej niż jedno wystąpienie separatora dziesiętnego, zostaw ostatnie:
    const first = s.indexOf('.');
    const last = s.lastIndexOf('.');
    if (first !== last) {
      // usuń wszystkie kropki poza ostatnią
      s = s.split('');
      let dotSeen = 0;
      const totalDots = s.filter(ch => ch === '.').length;
      s = s.filter(ch => {
        if (ch !== '.') return true;
        dotSeen++;
        return dotSeen === totalDots;
      }).join('');
    }
  }

  const n = parseFloat(s);
  return Number.isFinite(n) ? n : 0;
}

function formatNum(n) {
  return nf.format(n || 0);
}

/* =========================
   needs-fill: żółty tylko gdy pole "wymaga uzupełnienia"
   ========================= */
function updateNeedsFill() {
  const inputs = document.querySelectorAll(
    '.js-income-body tr:first-child .cell-input:not([readonly]),' +
    '.js-costs-body .cell-input:not([readonly])'
  );

  inputs.forEach(inp => {
    const isZero = parseNum(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });

  document.querySelectorAll('.company').forEach(comp => {
    const rateChecked = comp.querySelector('input[type="radio"]:checked')?.value;
    const customEl = comp.querySelector('.tax-custom-input');
    if (!customEl) return;

    const shouldMark = (rateChecked === 'custom') && (parseNum(customEl.value) === 0);
    customEl.classList.toggle('needs-fill', shouldMark);

    if (rateChecked !== 'custom') customEl.classList.remove('needs-fill');
  });
}

/* =========================
   i18n helpers
   ========================= */
function t(key, params = {}) {
  const dict = I18N[currentLang] || I18N.pl;
  let s = dict[key] ?? I18N.pl[key] ?? key;
  for (const [k, v] of Object.entries(params)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}

function applyTranslations() {
  document.documentElement.setAttribute('lang', currentLang);
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });
}

function updateNameInputsI18n() {
  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();

    const label = document.querySelector(`.js-company-name-label[data-letter="${letter}"]`);
    if (label) label.textContent = t('company.nameLabel', { L });

    const inp = document.getElementById(`name-${letter}`);
    if (inp) inp.placeholder = t('company.placeholder', { L });
  });
}

/* --- Dynamiczne Generowanie --- */
function renderCompanies() {
  const wrapper = document.getElementById('companies-wrapper');
  const template = document.getElementById('company-template');
  const nameWrapper = document.getElementById('name-inputs-wrapper');
  const summaryBody = document.getElementById('summary-body');

  wrapper.innerHTML = '';
  nameWrapper.innerHTML = '';
  summaryBody.innerHTML = '';

  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();

    nameWrapper.innerHTML += `
      <label class="name-field">
        <span class="js-company-name-label" data-letter="${letter}">
          ${t('company.nameLabel', { L })}
        </span>
        <input
          class="name-input"
          id="name-${letter}"
          type="text"
          placeholder="${t('company.placeholder', { L })}"
        />
      </label>`;

    summaryBody.innerHTML += `
      <tr><td><span class="js-summary-name" data-company="${letter}">${t('company.defaultName', { L })}</span></td>
      <td class="num js-summary-${letter}">${formatNum(0)}</td></tr>`;

    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.company');
    card.id = `spolka-${letter}`;
    card.querySelector('.js-company-title').dataset.company = letter;

    const others = COMPANIES.filter(l => l !== letter);
    const incBody = clone.querySelector('.js-income-body');
    const costBody = clone.querySelector('.js-costs-body');

    incBody.innerHTML = `
      <tr>
        <td data-i18n="row.externalCustomers">${t('row.externalCustomers')}</td>
        <td class="num"><input class="cell-input" id="${letter}_inc_0" value="${formatNum(0)}"></td>
      </tr>`;

    costBody.innerHTML = `
      <tr>
        <td data-i18n="row.externalSuppliers">${t('row.externalSuppliers')}</td>
        <td class="num"><input class="cell-input" id="${letter}_cost_0" value="${formatNum(0)}"></td>
      </tr>`;

    others.forEach((other) => {
      const O = other.toUpperCase();
      incBody.innerHTML += `<tr><td class="js-lbl-rec-${letter}-${other}">${t('row.customerPrefix')} ${t('company.defaultName', { L: O })}</td>
        <td class="num"><input class="cell-input auto-field" readonly data-direction="odbiorca" data-link="${O}"></td></tr>`;
      costBody.innerHTML += `<tr><td class="js-lbl-sup-${letter}-${other}">${t('row.supplierPrefix')} ${t('company.defaultName', { L: O })}</td>
        <td class="num"><input class="cell-input" data-direction="dostawca" data-link="${O}" value="${formatNum(0)}"></td></tr>`;
    });

    clone.querySelectorAll('input[type="radio"]').forEach(r => r.name = `tax_${letter}`);
    clone.querySelector('.tax-custom-input').dataset.company = letter;

    wrapper.appendChild(clone);
  });

  applyTranslations();
}

/* --- Logika Obliczeń --- */
function recalcAll() {
  const companies = document.querySelectorAll('.company');
  const names = {};
  COMPANIES.forEach(l => {
    const L = l.toUpperCase();
    names[L] = document.getElementById(`name-${l}`).value || t('company.defaultName', { L });
  });

  // 1. Aktualizacja etykiet
  COMPANIES.forEach(l => {
    const L = l.toUpperCase();
    document.querySelectorAll(`[data-company="${l}"]`).forEach(el => el.textContent = names[L]);

    COMPANIES.forEach(other => {
      const O = other.toUpperCase();
      document.querySelectorAll(`.js-lbl-rec-${l}-${other}`).forEach(el => el.textContent = `${t('row.customerPrefix')} ${names[O]}`);
      document.querySelectorAll(`.js-lbl-sup-${l}-${other}`).forEach(el => el.textContent = `${t('row.supplierPrefix')} ${names[O]}`);
    });
  });

  // 2. Czyść transfery (odbiorców) + czyść stare kolory transferów
  document.querySelectorAll('[data-direction="odbiorca"]').forEach(i => i.value = formatNum(0));
  document.querySelectorAll('[data-direction="dostawca"], [data-direction="odbiorca"]').forEach(i => {
    i.classList.remove(...LINK_CLASSES);
  });

  // 3. Transfery: Koszt w X (dostawca Y) -> Przychód w Y (odbiorca X)
  companies.forEach(comp => {
    const sourceLetter = comp.id.split('-')[1].toUpperCase(); // A/B/C
    comp.querySelectorAll('[data-direction="dostawca"]').forEach(input => {
      const targetLetter = input.dataset.link; // A/B/C
      const amount = Math.abs(parseNum(input.value));

      const targetInput = document.querySelector(
        `#spolka-${targetLetter.toLowerCase()} [data-direction="odbiorca"][data-link="${sourceLetter}"]`
      );

      if (targetInput) {
        targetInput.value = formatNum(parseNum(targetInput.value) + amount);
      }

      if (amount > 0) {
        const cls = LINK_BY_PAIR[`${sourceLetter}->${targetLetter}`];
        if (cls) {
          input.classList.add(cls);
          if (targetInput) targetInput.classList.add(cls);
        }
      }
    });
  });

  // 4. Wyniki brutto/netto
  let totalNetto = 0;
  companies.forEach(comp => {
    const letter = comp.id.split('-')[1];
    const income = Array.from(comp.querySelectorAll('.js-income-body input')).reduce((a, b) => a + parseNum(b.value), 0);
    const costs = Array.from(comp.querySelectorAll('.js-costs-body input')).reduce((a, b) => a + parseNum(b.value), 0);
    const brutto = income - costs;

    const rateChecked = comp.querySelector('input[type="radio"]:checked').value;

    const customEl = comp.querySelector('.tax-custom-input');
    if (customEl) customEl.classList.toggle('is-custom-active', rateChecked === 'custom');

    const customRate = parseNum(comp.querySelector('.tax-custom-input').value) / 100;
    const rate = rateChecked === 'custom' ? customRate : parseFloat(rateChecked);

    const tax = brutto > 0 ? brutto * rate : 0;
    const netto = brutto - tax;

    comp.querySelector('.js-przychody-total').value = comp.querySelector('.js-przychody-sum').value = formatNum(income);
    comp.querySelector('.js-koszty-total').value = comp.querySelector('.js-koszty-sum').value = formatNum(costs);
    comp.querySelector('.js-wynik-brutto').value = formatNum(brutto);
    comp.querySelector('.js-podatek').value = formatNum(tax);
    comp.querySelector('.js-wynik-netto').value = formatNum(netto);

    const netBrutto = comp.querySelector('.js-net-brutto');
    const netTax = comp.querySelector('.js-net-tax');
    if (netBrutto) netBrutto.value = formatNum(brutto);
    if (netTax) netTax.value = formatNum(tax);

    document.querySelector(`.js-summary-${letter}`).textContent = formatNum(netto);
    totalNetto += netto;
  });

  updateNeedsFill();
  document.querySelector('.js-summary-total').textContent = formatNum(totalNetto);
}

/* =========================
   Language dropdown + localStorage + reformat numbers
   ========================= */
function initLanguageUI() {
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  const langOptions = Array.from(document.querySelectorAll('.lang-option'));

  function openLang() {
    langDropdown.classList.add('open');
    langBtn.setAttribute('aria-expanded', 'true');
  }
  function closeLang() {
    langDropdown.classList.remove('open');
    langBtn.setAttribute('aria-expanded', 'false');
  }
  function toggleLang() {
    if (langDropdown.classList.contains('open')) closeLang();
    else openLang();
  }

  function reformatAllNumberFields() {
    const numberInputs = document.querySelectorAll('.cell-input, .tax-custom-input, .total-input');
    numberInputs.forEach(inp => {
      // readonly też przepisać, bo i tak pokazuje format
      const n = parseNum(inp.value);
      inp.value = formatNum(n);
    });

    // podsumowania textContent
    document.querySelectorAll('[class^="js-summary-"], .js-summary-total').forEach(el => {
      // część summary to td z tekstem liczb
      if (el && typeof el.textContent === 'string' && el.textContent.trim() !== '') {
        const n = parseNum(el.textContent);
        el.textContent = formatNum(n);
      }
    });
  }

  function setLang(lang) {
    currentLang = (lang === 'en' || lang === 'de' || lang === 'pl') ? lang : 'pl';
    localStorage.setItem(LANG_KEY, currentLang);

    // aktywny w dropdownie
    langOptions.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

    // przestaw format liczb
    setNumberLocale(currentLang);

    // przetłumacz stałe teksty
    applyTranslations();
    updateNameInputsI18n();

    // przelabeluj dynamiczne etykiety + przelicz (to też przepisze readonly pola)
    reformatAllNumberFields();
    recalcAll();
  }
  
  // init
  langOptions.forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));

  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleLang();
  });

  langOptions.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLang(btn.dataset.lang);
      closeLang();
    });
  });

  document.addEventListener('click', () => closeLang());
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLang();
  });
}

/* =========================
   IMPORT (CSV + XLSX)
   ========================= */

function detectCsvSeparator(text) {
  const firstLine = (text || '').split(/\r?\n/).find(l => l.trim() !== '') || '';
  const commas = (firstLine.match(/,/g) || []).length;
  const semis = (firstLine.match(/;/g) || []).length;
  return semis > commas ? ';' : ',';
}

// Prosty parser CSV z obsługą cudzysłowów
function parseCsvToAoA(text, sep) {
  let s = (text || '').replace(/^\uFEFF/, ''); // BOM out
  const rows = [];
  let row = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const next = s[i + 1];

    if (ch === '"') {
      if (inQuotes && next === '"') { // escaped quote
        cell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && ch === sep) {
      row.push(cell);
      cell = '';
      continue;
    }

    if (!inQuotes && (ch === '\n' || ch === '\r')) {
      if (ch === '\r' && next === '\n') i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
      continue;
    }

    cell += ch;
  }

  // ostatnia komórka
  row.push(cell);
  rows.push(row);

  // usuń puste końcowe wiersze
  while (rows.length && rows[rows.length - 1].every(c => String(c ?? '').trim() === '')) rows.pop();
  return rows;
}

function isEmptyRow(r) {
  if (!r) return true;
  return r.every(c => String(c ?? '').trim() === '');
}

function extractLetterFromHeaderCell(v) {
  const s = String(v ?? '').trim();
  const m = s.match(/\(([ABC])\)\s*$/); // np. "Spółka A (A)"
  return m ? m[1] : null;
}

function findNextLabelValueHeader(aoa, startIndex) {
  for (let i = startIndex; i < aoa.length; i++) {
    const r = aoa[i] || [];
    if (String(r[0] ?? '').trim() === 'Label' && String(r[1] ?? '').trim() === 'Value') return i;
  }
  return -1;
}

function takeTableRowsUntilBlank(aoa, startIndex) {
  const out = [];
  for (let i = startIndex; i < aoa.length; i++) {
    const r = aoa[i] || [];
    if (isEmptyRow(r)) break;
    out.push(r);
  }
  return out;
}

function setFormattedValueById(id, rawVal) {
  const el = document.getElementById(id);
  if (!el) return;
  const n = parseNum(rawVal);          // używa Twojego „elastycznego” parsera
  el.value = formatNum(n);             // formatuje wg currentLang
}

function setSupplierCosts(letterLower, values) {
  const comp = document.getElementById(`spolka-${letterLower}`);
  if (!comp) return;

  const others = COMPANIES
    .map(x => x.toUpperCase())
    .filter(L => L !== letterLower.toUpperCase()); // np. dla 'a' -> ['B','C']

  others.forEach((targetL, idx) => {
    const inp = comp.querySelector(`[data-direction="dostawca"][data-link="${targetL}"]`);
    if (!inp) return;
    const n = parseNum(values[idx] ?? 0);
    inp.value = formatNum(n);
  });
}

function setTaxFromGrossAndTax(letterLower, grossRaw, taxRaw) {
  const gross = parseNum(grossRaw);
  const tax = parseNum(taxRaw);
  if (!(gross > 0)) return; // nie da się sensownie wyliczyć stawki

  const rate = tax / gross; // np. 0.19
  if (!Number.isFinite(rate) || rate < 0) return;

  const comp = document.getElementById(`spolka-${letterLower}`);
  if (!comp) return;

  const tol = 0.003; // tolerancja
  const r09 = Math.abs(rate - 0.09) < tol;
  const r19 = Math.abs(rate - 0.19) < tol;

  const setRadio = (val) => {
    const r = comp.querySelector(`input[type="radio"][value="${val}"]`);
    if (r) r.checked = true;
  };

  if (r09) {
    setRadio('0.09');
  } else if (r19) {
    setRadio('0.19');
  } else {
    setRadio('custom');
    const custom = comp.querySelector('.tax-custom-input');
    if (custom) custom.value = formatNum(rate * 100);
  }
}

function applyImportFromAoA(aoa) {
  if (!Array.isArray(aoa) || !aoa.length) return;

  // 1) Nazwy spółek (heurystyka: szukamy pierwszych wierszy A/B/C + nazwa)
  const names = {};
  for (let i = 0; i < Math.min(aoa.length, 80); i++) {
    const r = aoa[i] || [];
    const k = String(r[0] ?? '').trim();
    const v = String(r[1] ?? '').trim();
    if ((k === 'A' || k === 'B' || k === 'C') && v) names[k] = v;
  }
  COMPANIES.forEach(letter => {
    const L = letter.toUpperCase();
    const inp = document.getElementById(`name-${letter}`);
    if (inp && names[L]) inp.value = names[L];
  });

  // 2) Dane per spółka
  for (let i = 0; i < aoa.length; i++) {
    const r = aoa[i] || [];
    if (r.length !== 1) continue;

    const letter = extractLetterFromHeaderCell(r[0]);
    if (!letter) continue;

    const letterLower = letter.toLowerCase();

    // revenue table
    const revHdr = findNextLabelValueHeader(aoa, i + 1);
    if (revHdr === -1) continue;
    const revRows = takeTableRowsUntilBlank(aoa, revHdr + 1);

    // pierwszy wiersz w przychodach = Odbiorcy zewnętrzni (editable)
    if (revRows[0]) setFormattedValueById(`${letterLower}_inc_0`, revRows[0][1]);

    // costs table (kolejny Label/Value po revenue)
    const costHdr = findNextLabelValueHeader(aoa, revHdr + 1);
    if (costHdr === -1) continue;
    const costRows = takeTableRowsUntilBlank(aoa, costHdr + 1);

    // pierwszy wiersz w kosztach = Dostawcy zewnętrzni (editable)
    if (costRows[0]) setFormattedValueById(`${letterLower}_cost_0`, costRows[0][1]);

    // kolejne wiersze kosztów = dostawcy do innych spółek (editable)
    const supplierVals = costRows.slice(1).map(x => x?.[1]);
    setSupplierCosts(letterLower, supplierVals);

    // wyniki: po kosztach powinien być blok "gross" (1 komórka) + 5 wierszy par
    // bierzemy 3-ci (gross) i 4-ty (tax) z tych par (order był stały w eksporcie)
    let k = costHdr + 1 + costRows.length;
    while (k < aoa.length && isEmptyRow(aoa[k])) k++;
    // tytuł bloku
    if (k < aoa.length && (aoa[k] || []).length === 1) {
      const pairs = [];
      for (let p = 1; p <= 5; p++) {
        const rr = aoa[k + p] || [];
        if (rr.length >= 2) pairs.push(rr);
      }
      // pairs: [revenue, costs, gross, tax, net]
      if (pairs[2] && pairs[3]) {
        setTaxFromGrossAndTax(letterLower, pairs[2][1], pairs[3][1]);
      }
    }
  }

  // 3) przeliczenie + etykiety
  recalcAll();
}

function initImportUI() {
  const csvInput = document.createElement('input');
  csvInput.type = 'file';
  csvInput.accept = '.csv,text/csv';
  csvInput.style.display = 'none';

  const xlsxInput = document.createElement('input');
  xlsxInput.type = 'file';
  xlsxInput.accept =
    '.xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,' +
    '.xls,application/vnd.ms-excel';
  xlsxInput.style.display = 'none';

  document.body.appendChild(csvInput);
  document.body.appendChild(xlsxInput);

  document.getElementById('importCsvBtn')?.addEventListener('click', () => {
    csvInput.value = '';
    csvInput.click();
  });

  document.getElementById('importXlsxBtn')?.addEventListener('click', () => {
    xlsxInput.value = '';
    xlsxInput.click();
  });

  csvInput.addEventListener('change', async () => {
    const file = csvInput.files?.[0];
    if (!file) return;

    const text = await file.text();
    const sep = detectCsvSeparator(text);
    const aoa = parseCsvToAoA(text, sep);
    applyImportFromAoA(aoa);
  });

  xlsxInput.addEventListener('change', async () => {
    const file = xlsxInput.files?.[0];
    if (!file) return;

    if (typeof XLSX === 'undefined') {
      alert('Brak biblioteki XLSX (SheetJS). Dodaj xlsx.full.min.js w index.html.');
      return;
    }

    const buf = await file.arrayBuffer();
    const wb = XLSX.read(buf, { type: 'array' });

    const sheetName = wb.SheetNames.includes('Data') ? 'Data' : wb.SheetNames[0];
    const ws = wb.Sheets[sheetName];
    const aoa = XLSX.utils.sheet_to_json(ws, { header: 1, raw: false });

    applyImportFromAoA(aoa);
  });
}

/* --- Inicjalizacja --- */
document.addEventListener("DOMContentLoaded", () => {
  currentLang = 'en';
  currentLang = getInitialLang();
  setNumberLocale(currentLang);

  applyTranslations();
  renderCompanies();

  document.getElementById('year').textContent = new Date().getFullYear();

  document.addEventListener('input', (e) => {
    // Blokuj litery w polu CIT "Inna" (tylko cyfry + separator , .)
    if (e.target.matches('.tax-custom-input')) {
      let v = e.target.value || "";
      v = v.replace(/[^\d,\.]/g, "");
      // zostaw użytkownikowi możliwość wpisu kropki/przecinka, parser i tak to ogarnie
      const firstComma = v.indexOf(",");
      const firstDot = v.indexOf(".");
      // nie ograniczamy agresywnie — parseNum i format na blur zrobi porządek
      e.target.value = v;
    }

    if (e.target.matches('.cell-input, .name-input, .tax-custom-input')) recalcAll();
  });

  document.getElementById('exportCsvBtn')?.addEventListener('click', exportCSV);
  document.getElementById('exportXlsxBtn')?.addEventListener('click', exportExcel);

  document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') recalcAll();
  });

  // Menu mobilne
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('open');
  });

  // Formaty przy focusie/blurze (teraz w zależności od języka)
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      const val = parseNum(e.target.value);
      e.target.value = val === 0 ? "" : String(val);
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      e.target.value = formatNum(parseNum(e.target.value));
    }
    if (e.target.matches('.tax-custom-input')) {
      // stawka CIT: też formatuj (ale bez 2 miejsc? zostawiamy prosto: 2 miejsca)
      // jeśli wolisz 2 miejsca dla %, to jest OK; jeśli 0-2, daj znać.
      e.target.value = formatNum(parseNum(e.target.value));
    }
  });
  
  initImportUI();
  initLanguageUI();
  recalcAll();
});
