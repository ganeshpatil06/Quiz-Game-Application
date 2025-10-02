const questions = [
  {
    type: "single",
    question: "Which language is used for web apps?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    type: "multiple",
    question: "Which of these are JavaScript frameworks?",
    options: ["React", "Angular", "Django", "Vue"],
    answer: ["React", "Angular", "Vue"]
  },
  {
    type: "fill",
    question: "_____ is the capital of India.",
    answer: "New Delhi"
  }
];

let current = 0;
let score = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const submitBtn = document.getElementById("submit");
const resultEl = document.getElementById("result");

function loadQuestion() {
  let q = questions[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  if (q.type === "single") {
    q.options.forEach(opt => {
      optionsEl.innerHTML += `
        <label><input type="radio" name="option" value="${opt}"> ${opt}</label>
      `;
    });
  }
  else if (q.type === "multiple") {
    q.options.forEach(opt => {
      optionsEl.innerHTML += `
        <label><input type="checkbox" value="${opt}"> ${opt}</label>
      `;
    });
  }
  else if (q.type === "fill") {
    optionsEl.innerHTML = `<input type="text" id="fillInput" placeholder="Type your answer..." class="fill-box">`;
  }
}

function checkAnswer() {
  let q = questions[current];
  let correct = false;

  if (q.type === "single") {
    let selected = document.querySelector("input[name='option']:checked");
    if (selected && selected.value === q.answer) correct = true;
  }
  else if (q.type === "multiple") {
    let selected = [...document.querySelectorAll("input[type='checkbox']:checked")].map(el => el.value);
    correct =
      selected.length === q.answer.length &&
      selected.every(val => q.answer.includes(val));
  }
  else if (q.type === "fill") {
    let input = document.getElementById("fillInput").value.trim();
    if (input.toLowerCase() === q.answer.toLowerCase()) correct = true;
  }

  if (correct) score++;

  current++;
  if (current < questions.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  questionEl.textContent = "Quiz Finished 🎉";
  optionsEl.innerHTML = "";
  submitBtn.style.display = "none";
  resultEl.textContent = `Your Score: ${score}/${questions.length}`;
}

submitBtn.addEventListener("click", checkAnswer);

loadQuestion();
