const prices = {
  "Accès Libre": 29,
  "Cours Groupe": 49,
  "Coaching": 60,
  "Bilan Forme": 35
};

const state = {
  service: "Accès Libre",
  family: 1,
  goal: "Reprise en douceur",
  name: "",
  email: "",
  date: "",
  time: "10:00"
};

const steps = [
  document.getElementById("step1"),
  document.getElementById("step2"),
  document.getElementById("step3")
];

const dots = document.querySelectorAll(".dot");
const stepTitle = document.getElementById("stepTitle");
const success = document.getElementById("success");

const titles = [
  "Choisissez votre activité",
  "Vos coordonnées",
  "Vérifiez votre récapitulatif"
];

function totalPrice() {
  const base = prices[state.service] || 0;
  return state.family === 3 ? Math.round(base * 2.2) : base;
}

function familyLabel() {
  return state.family === 3 ? "Forfait famille" : "Solo";
}

function updateSummary() {
  document.getElementById("sumService").textContent = state.service;
  document.getElementById("sumFamily").textContent = familyLabel();
  document.getElementById("sumDate").textContent = state.date || "À définir";
  document.getElementById("sumTime").textContent = state.time;
  document.getElementById("sumGoal").textContent = state.goal;
  document.getElementById("sumPrice").textContent = totalPrice() + "€";

  document.getElementById("review").innerHTML = `
    <div class="summary-row"><span>Activité</span><strong>${state.service}</strong></div>
    <div class="summary-row"><span>Formule</span><strong>${familyLabel()}</strong></div>
    <div class="summary-row"><span>Nom</span><strong>${state.name || "Non renseigné"}</strong></div>
    <div class="summary-row"><span>Email</span><strong>${state.email || "Non renseigné"}</strong></div>
    <div class="summary-row"><span>Date</span><strong>${state.date || "À définir"}</strong></div>
    <div class="summary-row"><span>Heure</span><strong>${state.time}</strong></div>
    <div class="summary-row"><span>Objectif</span><strong>${state.goal}</strong></div>
    <div class="summary-row"><span>Tarif</span><strong>${totalPrice()}€</strong></div>
  `;
}

function showStep(i) {
  steps.forEach((step, index) => step.classList.toggle("hidden", index !== i));
  dots.forEach((dot, index) => dot.classList.toggle("active", index <= i));
  stepTitle.textContent = titles[i];
  success.classList.add("hidden");
  updateSummary();
}

document.querySelectorAll("#serviceChoices .choice").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#serviceChoices .choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.service = btn.dataset.value;
    updateSummary();
  });
});

document.querySelectorAll("#familyChoices .choice").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll("#familyChoices .choice").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
    state.family = Number(btn.dataset.members);
    updateSummary();
  });
});

document.querySelectorAll(".reserve-service").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.service;
    const match = document.querySelector(`#serviceChoices .choice[data-value="${target}"]`);
    if (match) match.click();
    document.getElementById("reservation").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("goal").addEventListener("change", e => {
  state.goal = e.target.value;
  updateSummary();
});

document.getElementById("name").addEventListener("input", e => {
  state.name = e.target.value;
  updateSummary();
});

document.getElementById("email").addEventListener("input", e => {
  state.email = e.target.value;
  updateSummary();
});

document.getElementById("date").addEventListener("change", e => {
  state.date = e.target.value;
  updateSummary();
});

document.getElementById("time").addEventListener("change", e => {
  state.time = e.target.value;
  updateSummary();
});

document.getElementById("toStep2").addEventListener("click", () => showStep(1));
document.getElementById("back1").addEventListener("click", () => showStep(0));
document.getElementById("toStep3").addEventListener("click", () => showStep(2));
document.getElementById("back2").addEventListener("click", () => showStep(1));

document.getElementById("confirm").addEventListener("click", () => {
  steps.forEach(step => step.classList.add("hidden"));
  dots.forEach(dot => dot.classList.add("active"));
  stepTitle.textContent = "Confirmation";
  success.classList.remove("hidden");
  updateSummary();
});

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  const y = window.scrollY + 120;
  let current = "accueil";

  sections.forEach(section => {
    if (y >= section.offsetTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
}

window.addEventListener("scroll", setActiveLink, { passive: true });
setActiveLink();
updateSummary();