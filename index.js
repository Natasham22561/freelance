/**
 * @typedef Freelancer
 * @property {string} name
 * @property {string} occupation
 * @property {number} rate
 */

// === Constants ===
// ======= DATA CONSTANTS =======
const NAMES = [
  'Alice', 'Bob', 'Carlos', 'Diana', 'Elena', 
  'Fred', 'Grace', 'Hana', 'Ian', 'Jill'
];
const OCCUPATIONS = [
  'Writer', 'Designer', 'Developer', 'Musician', 
  'Photographer', 'Translator', 'Tutor', 'Consultant'
];
const MIN_RATE = 20;
const MAX_RATE = 100;
const NUM_FREELANCERS = 5;

// ======= UTILITY FUNCTIONS =======
function randomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomFreelancer() {
  return {
    name: randomFromArray(NAMES),
    occupation: randomFromArray(OCCUPATIONS),
    rate: Math.floor(Math.random() * (MAX_RATE - MIN_RATE + 1)) + MIN_RATE,
  };
}

function calcAverageRate(freelancerArr) {
  const sum = freelancerArr.reduce((total, fl) => total + fl.rate, 0);
  return (sum / freelancerArr.length).toFixed(2);
}

// ======= STATE =======
let freelancers = Array.from({length: NUM_FREELANCERS}, randomFreelancer);
let avgRate = calcAverageRate(freelancers);

// ======= COMPONENTS =======

// Single Freelancer <tr>
function FreelancerRow({name, occupation, rate}) {
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${name}</td>
    <td>${occupation}</td>
    <td>$${rate}/hr</td>
  `;
  return tr;
}

// Table body of Freelancers
function FreelancerRows(freelancerArr = freelancers) {
  const tbody = document.createElement('tbody');
  tbody.id = "FreelancerRows";
  for (const freelancer of freelancerArr) {
    tbody.appendChild(FreelancerRow(freelancer));
  }
  return tbody;
}

// Average Rate Display
function AverageRateView(rate) {
  const p = document.createElement('p');
  p.textContent = `Average hourly rate: $${rate}`;
  return p;
}

// ======= RENDER FUNCTION =======
function render() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h1>Freelancer Forum</h1>
    <div id="avg"></div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Occupation</th>
          <th>Rate</th>
        </tr>
      </thead>
      <tbody id="FreelancerRows"></tbody>
    </table>
  `;
  // Mount average rate and freelancer rows using real DOM nodes
  app.querySelector('#avg').replaceWith(AverageRateView(avgRate));
  app.querySelector('#FreelancerRows').replaceWith(FreelancerRows());
}

// ======= INITIALIZE =======
render();