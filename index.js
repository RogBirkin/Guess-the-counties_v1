const counties = [
  'antrim',
  'armagh',
  'carlow',
  'cavan',
  'clare',
  'cork',
  'donegal',
  'down',
  'dublin',
  'fermanagh',
  'galway',
  'kerry',
  'kildare',
  'kilkenny',
  'laois',
  'leitrim',
  'limerick',
  'derry',
  'longford',
  'louth',
  'mayo',
  'meath',
  'monaghan',
  'offaly',
  'roscommon',
  'sligo',
  'tipperary',
  'tyrone',
  'waterford',
  'westmeath',
  'wexford',
  'wicklow',
];

let correctGuess = [].map(function (x) {
  return x.toUpperCase();
});

let missingCounties = [];

let giveUp = false;

let sum = 0;

let counter = document.getElementById('counter');
counter.textContent = `You have guessed ${sum} counties out of 32  correctly`;

const backdrop = document.querySelector('.backdrop');
const modal = document.querySelector('.modal');

function counterUpdate(sum) {
  return correctGuess.length === 1
    ? (counter.textContent = `You have guessed ${sum} county out of 32 correctly!`)
    : (counter.textContent = `You have guessed ${sum} counties out of 32 correctly!`);
}
const countyName = document.getElementById('county-name');
const divRoot = document.getElementById('div-root');

let message;

function addCounty() {
  let countyName = document.getElementById('county-name').value.toLowerCase();
  if (giveUp) return restartGame();

  if (countyName === 'londonderry') countyName = 'derry';

  if (!countyName) {
    message = 'You need to type something';
    removeIncorrectCountyElement();
    incorrectCountyElement(message);
  } else if (correctGuess.includes(countyName)) {
    message = `${countyName.toUpperCase()} has already been added`;
    removeIncorrectCountyElement();
    incorrectCountyElement(message);
    return;
  } else if (!counties.includes(countyName)) {
    message = `${countyName.toUpperCase()} is incorrect!`;
    removeIncorrectCountyElement();
    incorrectCountyElement(message);
    return;
  } else {
    correctGuess.push(countyName);
    sum++;
    addCountyElement(countyName);
    counterUpdate(sum);
    gameComplete();
    clearValue();
    removeIncorrectCountyElement();
  }
}

function removeIncorrectCountyElement() {
  const element = document.querySelector('.incorrect-county');
  if (element) element.remove();
}

function incorrectCountyElement(message) {
  const wrongEl = document.createElement('p');
  wrongEl.className = 'incorrect-county';
  wrongEl.innerHTML = `
  <p>${message}</p>
  `;
  divRoot.append(wrongEl);
  clearValue();
}

function addCountyElement(countyName) {
  const newCountyEl = document.createElement('li');
  newCountyEl.className = 'county-element';
  newCountyEl.innerHTML = `
  <span class="new-county-span">${countyName.toUpperCase()}</span>
  `;
  const listRoot = document.getElementById('list-root');
  listRoot.append(newCountyEl);
}

function addMissingElements(county) {
  const newCountyEl = document.createElement('li');
  newCountyEl.className = 'missing-county-element';
  newCountyEl.innerHTML = `
  <span class="missing-new-county-span">${county.toUpperCase()}</span>
  `;
  const listRoot = document.getElementById('missing-li-root');
  listRoot.append(newCountyEl);
}

function gameComplete() {
  if (correctGuess.length === counties.length)
    alert('Congratulations!!! You guessed all the counties correctly');
}

const clearValue = () => {
  if (countyName) countyName.value = '';
};

function revealMissingCounties() {
  missingCounties = counties.filter((g) => {
    return !correctGuess.includes(g);
  });
  missingCounties.forEach((el) => addMissingElements(el));

  giveUp = true;
}

function restartGame() {
  backdrop.classList.add('visible');
  modal.classList.add('visible');

  const yesBtn = document.querySelector('.yes-btn');
  yesBtn.addEventListener('click', resetGame);

  const noBtn = document.querySelector('.no-btn');
  noBtn.addEventListener('click', removeModal);
}

function removeModal() {
  backdrop.classList.toggle('visible');
  modal.classList.toggle('visible');
}

function resetGame() {
  correctGuess = [];
  missingCounties = [];
  sum = 0;
  counterUpdate(sum);
  removeCorrectCounties();
  removeMissingCounties();
  removeIncorrectCountyElement();
  removeModal();
  giveUp = false;
}

function removeCorrectCounties() {
  const elements = document.querySelectorAll('.county-element');
  elements.forEach((el) => el.remove());
}

function removeMissingCounties() {
  const elements = document.querySelectorAll('.missing-county-element');
  elements.forEach((el) => el.remove());
}

countyName.addEventListener('keyup', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('county-btn').click();
  }
});

const addBtn = document.getElementById('county-btn');
addBtn.addEventListener('click', addCounty);

const revealBtn = document.querySelector('.reveal');
revealBtn.addEventListener('click', revealMissingCounties);
