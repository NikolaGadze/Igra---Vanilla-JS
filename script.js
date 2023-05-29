const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List riječi za igru
const words = [
  'osam',
  'tenis',
  'procesor',
  'lopta',
  'pita',
  'avion',
  'predmet',
  'jug',
  'zapad',
  'nezavisan',
  'volan',
  'srebro',
  'potok',
  'plitak',
  'prisutnost',
  'majica',
  'devet',
  'plava',
  'rijeka',
  'more',
  'ljubav',
  'deset',
  'brojevi',
  'zrakoplov',
  'kalkulator',
  'nastavnik',
  'istok',
  'tipkovnica',
  'sjever',
  'program',
  'zmija',
  'pas',
  'lav',
  'stablo',
  'matematika',
  'vojska',
  'general',
  'zbor',
  'violina',
  'gitara',
  'flauta',
  'orkestar'

];

// Početna riječ
let randomWord;

// Početno rezultat
let score = 0;

// Početno vrijeme
let time = 10;

// Postavljanje težine igra na vrijednost u LocalStorageu ili na srednju razinu
let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Postavljanje težine na zadanu vrijednost
difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

// Fokus na tekst na početku
text.focus();

// Početak odbrojavanja
const timeInterval = setInterval(updateTime, 1000);

// Generiranje slučajne riječi iz niza
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Dodavanje riječi u DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Ažuriranje rezultata
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Ažuriranje vremena
function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    // kraj igre
    gameOver();
  }
}

// Kraj igre, prikazivanje ekrana s zadanim rezultatima za kraj
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Vrijeme je isteklo</h1>
    <p>Vaš konačan rezultat je ${score}</p>
    <button onclick="location.reload()">Ponovo</button>
  `;

  endgameEl.style.display = 'flex';
}

addWordToDOM();



// Tipkanje
text.addEventListener('input', e => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Očisti
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 2;
    } else if (difficulty === 'medium') {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Postavke za klik na dugme za postavke
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

// Postavke za odabir težine
settingsForm.addEventListener('change', e => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
