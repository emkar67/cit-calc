const COMPANIES = ['a', 'b', 'c'];

/* --- TRANSFER COLORS (6 directions) --- */
const LINK_CLASSES = ['link-pink','link-red','link-green','link-cyan','link-blue','link-violet'];
const LINK_BY_PAIR = {
  'A->B': 'link-pink',
  'A->C': 'link-red',
  'B->A': 'link-green',
  'B->C': 'link-cyan',
  'C->A': 'link-blue',
  'C->B': 'link-violet',
};

const nf = new Intl.NumberFormat("pl-PL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const parsePL = (v) => {
  if (!v) return 0;
  let s = String(v).replace(/[ \u00A0\u202F]/g, "").replace(",", ".");
  return isFinite(parseFloat(s)) ? parseFloat(s) : 0;
};
const formatPL = (n) => nf.format(n || 0);

function updateNeedsFill() {
  const inputs = document.querySelectorAll(
    '.js-income-body tr:first-child .cell-input:not([readonly]),' +
    '.js-costs-body .cell-input:not([readonly])'
  );

  inputs.forEach(inp => {
    const isZero = parsePL(inp.value) === 0;
    inp.classList.toggle('needs-fill', isZero);
  });

  // CIT "Inna": needs-fill only when "Inna" selected & zero amount
  document.querySelectorAll('.company').forEach(comp => {
    const rateChecked = comp.querySelector('input[type="radio"]:checked')?.value;
    const customEl = comp.querySelector('.tax-custom-input');
    if (!customEl) return;

    const shouldMark = (rateChecked === 'custom') && (parsePL(customEl.value) === 0);
    customEl.classList.toggle('needs-fill', shouldMark);

    if (rateChecked !== 'custom') customEl.classList.remove('needs-fill');
  });
}

/* --- Company Rendering --- */
function renderCompanies() {
  const wrapper = document.getElementById('companies-wrapper');
  const template = document.getElementById('company-template');
  const nameWrapper = document.getElementById('name-inputs-wrapper');
  const summaryBody = document.getElementById('summary-body');

  COMPANIES.forEach(letter => {
    nameWrapper.innerHTML += `
      <label class="name-field"><span>Nazwa Spółki ${letter.toUpperCase()}</span>
      <input class="name-input" id="name-${letter}" type="text" placeholder="Spółka ${letter.toUpperCase()}" /></label>`;

    summaryBody.innerHTML += `
      <tr><td><span class="js-summary-name" data-company="${letter}">Spółka ${letter.toUpperCase()}</span></td>
      <td class="num js-summary-${letter}">0,00</td></tr>`;

    const clone = template.content.cloneNode(true);
    const card = clone.querySelector('.company');
    card.id = `spolka-${letter}`;
    card.querySelector('.js-company-title').dataset.company = letter;

    const others = COMPANIES.filter(l => l !== letter);
    const incBody = clone.querySelector('.js-income-body');
    const costBody = clone.querySelector('.js-costs-body');

    // Show 0,00 by default after loading the page
    incBody.innerHTML = `<tr><td>Odbiorcy zewnętrzni</td><td class="num"><input class="cell-input" id="${letter}_inc_0" value="0,00"></td></tr>`;
    costBody.innerHTML = `<tr><td>Dostawcy zewnętrzni</td><td class="num"><input class="cell-input" id="${letter}_cost_0" value="0,00"></td></tr>`;

    others.forEach((other) => {
      incBody.innerHTML += `<tr><td class="js-lbl-rec-${letter}-${other}">Odbiorca ${other.toUpperCase()}</td>
        <td class="num"><input class="cell-input auto-field" readonly data-direction="odbiorca" data-link="${other.toUpperCase()}"></td></tr>`;
      costBody.innerHTML += `<tr><td class="js-lbl-sup-${letter}-${other}">Dostawca ${other.toUpperCase()}</td>
        <td class="num"><input class="cell-input" data-direction="dostawca" data-link="${other.toUpperCase()}" value="0,00"></td></tr>`;
    });

    // Tax Radios
    clone.querySelectorAll('input[type="radio"]').forEach(r => r.name = `tax_${letter}`);
    clone.querySelector('.tax-custom-input').dataset.company = letter;

    wrapper.appendChild(clone);
  });
}

function recalcAll() {
  const companies = document.querySelectorAll('.company');
  const names = {};
  COMPANIES.forEach(l => names[l.toUpperCase()] = document.getElementById(`name-${l}`).value || `Spółka ${l.toUpperCase()}`);

  // Name update
  COMPANIES.forEach(l => {
    document.querySelectorAll(`[data-company="${l}"]`).forEach(el => el.textContent = names[l.toUpperCase()]);
    COMPANIES.forEach(other => {
      document.querySelectorAll(`.js-lbl-rec-${l}-${other}`).forEach(el => el.textContent = `Odbiorca ${names[other.toUpperCase()]}`);
      document.querySelectorAll(`.js-lbl-sup-${l}-${other}`).forEach(el => el.textContent = `Dostawca ${names[other.toUpperCase()]}`);
    });
  });

  // Clear old highlights
  document.querySelectorAll('[data-direction="odbiorca"]').forEach(i => i.value = "0,00");
  document.querySelectorAll('[data-direction="dostawca"], [data-direction="odbiorca"]').forEach(i => {
    i.classList.remove(...LINK_CLASSES);
  });

  // 3. Transfers: Koszt w X (dostawca Y) -> Przychód w Y (odbiorca X)
  companies.forEach(comp => {
    const sourceLetter = comp.id.split('-')[1].toUpperCase(); // A/B/C

    comp.querySelectorAll('[data-direction="dostawca"]').forEach(input => {
      const targetLetter = input.dataset.link; // A/B/C
      const amount = Math.abs(parsePL(input.value));

      const targetInput = document.querySelector(
        `#spolka-${targetLetter.toLowerCase()} [data-direction="odbiorca"][data-link="${sourceLetter}"]`
      );

      if (targetInput) {
        targetInput.value = formatPL(parsePL(targetInput.value) + amount);
      }

      // Color only when amount > 0
      if (amount > 0) {
        const cls = LINK_BY_PAIR[`${sourceLetter}->${targetLetter}`];
        if (cls) {
          input.classList.add(cls);
          if (targetInput) targetInput.classList.add(cls);
        }
      }
    });
  });

  let totalNetto = 0;
  companies.forEach(comp => {
    const letter = comp.id.split('-')[1];
    const income = Array.from(comp.querySelectorAll('.js-income-body input')).reduce((a, b) => a + parsePL(b.value), 0);
    const costs = Array.from(comp.querySelectorAll('.js-costs-body input')).reduce((a, b) => a + parsePL(b.value), 0);
    const brutto = income - costs;

    const rateChecked = comp.querySelector('input[type="radio"]:checked').value;
    // "Inna" condition
    const customEl = comp.querySelector('.tax-custom-input');
    if (customEl) customEl.classList.toggle('is-custom-active', rateChecked === 'custom');

    const customRate = parsePL(comp.querySelector('.tax-custom-input').value) / 100;
    const rate = rateChecked === 'custom' ? customRate : parseFloat(rateChecked);

    const tax = brutto > 0 ? brutto * rate : 0;
    const netto = brutto - tax;

    comp.querySelector('.js-przychody-total').value = comp.querySelector('.js-przychody-sum').value = formatPL(income);
    comp.querySelector('.js-koszty-total').value = comp.querySelector('.js-koszty-sum').value = formatPL(costs);
    comp.querySelector('.js-wynik-brutto').value = formatPL(brutto);
    comp.querySelector('.js-podatek').value = formatPL(tax);
    comp.querySelector('.js-wynik-netto').value = formatPL(netto);

    const netBrutto = comp.querySelector('.js-net-brutto');
    const netTax = comp.querySelector('.js-net-tax');
    if (netBrutto) netBrutto.value = formatPL(brutto);
    if (netTax) netTax.value = formatPL(tax);

    document.querySelector(`.js-summary-${letter}`).textContent = formatPL(netto);
    totalNetto += netto;
  });

  updateNeedsFill();

  document.querySelector('.js-summary-total').textContent = formatPL(totalNetto);
}

/* --- Initialize --- */
document.addEventListener("DOMContentLoaded", () => {
  renderCompanies();
  document.getElementById('year').textContent = new Date().getFullYear();

  document.addEventListener('input', (e) => {
    // Block letters in "Inna" (numbers and separators only , .)
    if (e.target.matches('.tax-custom-input')) {
      let v = e.target.value || "";
      v = v.replace(/[^\d,\.]/g, "");
      v = v.replace(/\./g, ",");
      const firstComma = v.indexOf(",");
      if (firstComma !== -1) v = v.slice(0, firstComma + 1) + v.slice(firstComma + 1).replace(/,/g, "");
      e.target.value = v;
    }

    if (e.target.matches('.cell-input, .name-input, .tax-custom-input')) recalcAll();
  });

  document.addEventListener('change', (e) => {
    if (e.target.type === 'radio') recalcAll();
  });

  // Menu
  document.getElementById('menuBtn').addEventListener('click', () => {
    document.getElementById('menu').classList.toggle('open');
  });

  // Formatting while focused/blurred
  document.addEventListener('focusin', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      const val = parsePL(e.target.value);
      e.target.value = val === 0 ? "" : val.toString().replace(".", ",");
    }
  });

  document.addEventListener('focusout', (e) => {
    if (e.target.matches('.cell-input:not([readonly])')) {
      e.target.value = formatPL(parsePL(e.target.value));
    }
  });

  recalcAll();
});
