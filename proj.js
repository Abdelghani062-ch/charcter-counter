let dark = document.querySelector("#dark");
let night = document.querySelector("#night");
let weather = document.querySelector("#weather");
let textarea = document.querySelector("#textarea");
let total = document.querySelector("#total h1");
let word = document.querySelector("#word h1");
let sentence = document.querySelector("#sentence h1");
let cer = document.querySelector("#cer");
let exclude_space = document.querySelector("#exclude-space");

// Dark / Light Mode
night.addEventListener("click", () => {
  document.body.classList.add("dark");
  weather.style.display = "block";
  night.style.display = "none";
  textarea.classList.add("classtext");
  cer.style.backgroundColor = "black";
});

weather.addEventListener("click", () => {
  document.body.classList.remove("dark");
  weather.style.display = "none";
  night.style.display = "block";
  textarea.classList.remove("classtext");
  cer.style.backgroundColor = "white";
});

// Function to count characters
function nmbreChar(textarea, excludeSpace = false) {
  let value = textarea.value;
  return excludeSpace ? value.replace(/\s/g, "") : value;
}

// Main input listener
textarea.addEventListener("input", updateStats);
exclude_space.addEventListener("change", updateStats);

function updateStats() {
  // Total Characters
  let totalChars = nmbreChar(textarea, exclude_space.checked).length;
  total.textContent = totalChars.toString().padStart(2, "0");

  // Word count
  let arrword = textarea.value.trim().split(/\s+/);
  word.textContent = arrword.filter(el => el.length > 0).length.toString().padStart(2, "0");

  // Sentence count
  let countSentence = (textarea.value.match(/[.!?]/g) || []).length;
  sentence.textContent = countSentence.toString().padStart(2, "0");

  // Character frequency
  let inp = textarea.value;
  let charObj = {};

  for (let char of inp) {
    if (/^[a-zA-Z0-9]$/.test(char)) {
      charObj[char] = (charObj[char] || 0) + 1;
    }
  }

  let lastArt = document.querySelector(".last-art");
  lastArt.innerHTML = "";
  let sorted = Object.entries(charObj).sort((a, b) => b[1] - a[1]);
  let totalFreq = Object.values(charObj).reduce((a, b) => a + b, 0);

  sorted.forEach(([letter, count]) => {
    let percentage = ((count / totalFreq) * 100).toFixed(2);

    let div = document.createElement("div");
    div.style.fontSize = "large";

    let span_letter = document.createElement("span");
    span_letter.textContent = letter + " ";

    let pourcentage_ligne = document.createElement("div");
    pourcentage_ligne.style.height = "20px";
    pourcentage_ligne.style.background = "orange";
    pourcentage_ligne.style.width = percentage + "%";

    let pourcentage_span = document.createElement("span");
    pourcentage_span.textContent = " " + percentage + "%";

    div.appendChild(span_letter);
    div.appendChild(pourcentage_ligne);
    div.appendChild(pourcentage_span);
    lastArt.appendChild(div);
  });
}
