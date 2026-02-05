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
  }
};

const LANG_KEY = 'calc_lang';
let currentLang = 'pl';

const SUPPORTED_LANGS = ['pl', 'en', 'de'];

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

  initLanguageUI();
  recalcAll();
});
