const form = document.getElementById('quizForm');
const checkBtn = document.getElementById('checkBtn');
const resultDiv = document.getElementById('result');

const select1 = form.q5a;
const select2 = form.q5b;


window.addEventListener("DOMContentLoaded", () => {
  initSelects();
});

function shufle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function initSelects() {
  select1.innerHTML = '';
  select2.innerHTML = '';

  select1.add(new Option("Válassz...", ""));
  select2.add(new Option("Válassz...", ""));

  shufle(["HTML", "Python", "Node.js", "CSS"]).forEach(opt => {
    select1.add(new Option(opt, opt));
  });

  shufle(["CSS", "Javascript", "Java", "MySql"]).forEach(opt => {
    select2.add(new Option(opt, opt));
  });

  checkFilled();
}

function checkFilled() {
  const q1 = form.querySelector('input[name="q1"]:checked');
  const q2 = [...form.querySelectorAll('input[name="q2"]:checked')];
  const q3 = form.q3.value.trim();
  const q4 = form.q4.value.trim();
  const q5a = form.q5a.value;
  const q5b = form.q5b.value;

  const allFilled = q1 && q2.length > 0 && q3 !== '' && q4 !== '' && q5a !== "" && q5b !== "";
  checkBtn.classList.toggle("hidden", !allFilled);
}

form.addEventListener("input", checkFilled);
form.addEventListener("change", checkFilled);

checkBtn.addEventListener("click", () => {
  let score = 0;

  // 1. kérdés
  if (form.q1.value === "JavaScript") score += 1;

  // 2. kérdés
  const correctQ2 = ["HTML", "CSS", "JavaScript"];
  const selectedQ2 = [...form.querySelectorAll('input[name="q2"]:checked')].map(cb => cb.value);
  if (selectedQ2.length === correctQ2.length && selectedQ2.every(v => correctQ2.includes(v))) score += 1;

  // 3. kérdés
  const q3val = form.q3.value.trim().toLowerCase();
  if (q3val === "python") score += 1;
  

  // 4. kérdés
  const q4val = form.q4.value.toLowerCase();
  const keywords = ["védelem", "támadás", "adat"];
  const matchCount = keywords.filter(k => q4val.includes(k)).length;
  if (matchCount === 3) score += 1;

  // 5. kérdés
  if (form.q5a.value === "HTML" && form.q5b.value === "Javascript") score += 1;

const percent = Math.round((score / 5) * 100);
const color = percent < 60 ? 'red' : 'green'; 
resultDiv.innerHTML = `<h3 style="color: ${color};">Eredmény: ${percent}%</h3>`;
});
checkBtn.addEventListener("click", () => {
  const elements = document.querySelectorAll('input, textarea, select');
  elements.forEach(el => {
    el.disabled = true;
  });
  checkBtn.disabled = true;
})