const questions = [
  {
    question:
      "You ask an AI: “What U.S. Supreme Court case in 1993 required soda companies to put warning labels on cans?”",
    aiAnswer:
      "The AI answers: “In Smith v. Coca-Cola (1993), the U.S. Supreme Court ruled that soda companies must place health warning labels on all cans.”",
    isHallucination: true,
    explanation:
      "There is no U.S. Supreme Court case called *Smith v. Coca-Cola (1993)* and no such ruling about warning labels on all soda cans. The AI has invented a realistic-sounding but fake case."
  },
  {
    question:
      "You ask an AI: “When did humans first land on the Moon, and who was on the mission?”",
    aiAnswer:
      "The AI answers: “Humans first landed on the Moon in 1969 during the Apollo 11 mission, with Neil Armstrong and Buzz Aldrin walking on the surface while Michael Collins orbited above.”",
    isHallucination: false,
    explanation:
      "This is historically accurate: Apollo 11 landed in July 1969, with Armstrong and Aldrin on the surface and Collins in lunar orbit."
  },
  {
    question:
      "You ask an AI: “Did the United Nations ever pass Resolution 9999 declaring unrestricted internet access a basic human right in 2015?”",
    aiAnswer:
      "The AI answers: “Yes. UN Resolution 9999, passed in 2015, officially declared unrestricted internet access a fundamental human right for all citizens.”",
    isHallucination: true,
    explanation:
      "While the UN has discussed digital rights and access, there is no Resolution 9999 from 2015 declaring unrestricted internet access as a human right. The resolution number and details are fabricated."
  },
  {
    question:
      "You ask an AI: “What is the capital of Japan and how large is its metro area?”",
    aiAnswer:
      "The AI answers: “The capital of Japan is Tokyo, and its greater metropolitan area has tens of millions of residents, making it one of the largest in the world.”",
    isHallucination: false,
    explanation:
      "This is broadly correct: Tokyo is the capital of Japan, and its metropolitan area is indeed one of the largest in the world."
  },
  {
    question:
      "You ask an AI: “Who won the first Nobel Prize in Computer Science?”",
    aiAnswer:
      "The AI answers: “The first Nobel Prize in Computer Science was awarded to Ada Lovelace in 1903 for her pioneering theoretical work on algorithms.”",
    isHallucination: true,
    explanation:
      "There is no Nobel Prize category for Computer Science, and Ada Lovelace died long before 1903. This answer sounds prestigious but is entirely invented."
  },
  {
    question:
      "You ask an AI: “When did the World Health Organization declare COVID-19 a global pandemic?”",
    aiAnswer:
      "The AI answers: “The World Health Organization declared COVID-19 a global pandemic in March 2020.”",
    isHallucination: false,
    explanation:
      "This is correct: the WHO declared COVID-19 a pandemic on March 11, 2020."
  },
  {
    question:
      "You ask an AI: “Give me a quick fact about the founding of Harvard University.”",
    aiAnswer:
      "The AI answers: “Harvard University was founded in 1891 in California as a public research institution.”",
    isHallucination: true,
    explanation:
      "Harvard University was founded in 1636 in Cambridge, Massachusetts, and is a private institution. The date, location, and description in the AI’s answer are all incorrect."
  },
  {
    question:
      "You ask an AI: “What is the basic chemical formula of water?”",
    aiAnswer:
      "The AI answers: “The chemical formula of water is H₂O, meaning each molecule has two hydrogen atoms and one oxygen atom.”",
    isHallucination: false,
    explanation:
      "This is accurate: water is H₂O, with two hydrogen atoms bonded to one oxygen atom."
  },
  {
    question:
      "You ask an AI: “How many Nobel Prizes did Albert Einstein receive?”",
    aiAnswer:
      "The AI answers: “Albert Einstein received two Nobel Prizes — one for his theory of relativity and another for his work on quantum mechanics.”",
    isHallucination: true,
    explanation:
      "Einstein received only one Nobel Prize, in Physics in 1921, primarily for his explanation of the photoelectric effect. He did not receive a Nobel Prize specifically for relativity or a second Nobel Prize at all."
  },
  {
    question:
      "You ask an AI: “Who created the popular programming language ‘Pythron’?”",
    aiAnswer:
      "The AI answers: “The programming language ‘Pythron’ was created by Tim Berners-Lee in the late 1990s to support web development.”",
    isHallucination: true,
    explanation:
      "There is no widely used programming language called ‘Pythron,’ and Tim Berners-Lee is known for inventing the World Wide Web, not this fictional language. The AI has generated a plausible-sounding but fake fact."
  }
];

let currentIndex = 0;
let score = 0;

// DOM elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");

const progressText = document.getElementById("progressText");
const questionText = document.getElementById("questionText");
const aiAnswerText = document.getElementById("aiAnswer");
const feedbackEl = document.getElementById("feedback");
const scoreText = document.getElementById("scoreText");
const resultMessage = document.getElementById("resultMessage");

const infoScreen = document.getElementById("info-screen");
const continueToResultsBtn = document.getElementById("continueToResultsBtn");

const usageScreen = document.getElementById("usage-screen");
const sourcesScreen = document.getElementById("sources-screen");

const toUsageBtn = document.getElementById("toUsageBtn");
const toSourcesBtn = document.getElementById("toSourcesBtn");


// Helper to get selected answer
function getSelectedAnswer() {
  const radios = document.querySelectorAll('input[name="answer"]');
  for (const r of radios) {
    if (r.checked) return r.value;
  }
  return null;
}

function clearSelection() {
  const radios = document.querySelectorAll('input[name="answer"]');
  radios.forEach(r => (r.checked = false));
}

// Load a question by index
function loadQuestion(index) {
  const total = questions.length;
  const q = questions[index];

  progressText.textContent = `Question ${index + 1} / ${total}`;
  questionText.textContent = q.question;
  aiAnswerText.textContent = q.aiAnswer;

  clearSelection();
  feedbackEl.textContent = "";
  feedbackEl.classList.remove("correct", "incorrect");

  submitBtn.disabled = true;
  nextBtn.classList.add("hidden");
}

// Start quiz
startBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;

  startScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");

  loadQuestion(currentIndex);
});

// Enable submit when an option is chosen
document.querySelectorAll('input[name="answer"]').forEach(radio => {
  radio.addEventListener("change", () => {
    submitBtn.disabled = false;
  });
});

// Handle submit
submitBtn.addEventListener("click", () => {
  const userAnswer = getSelectedAnswer();
  if (!userAnswer) return;

  const q = questions[currentIndex];
  const isHallu = q.isHallucination;

  const userThinksHallucination = userAnswer === "hallucination";

  if ((userThinksHallucination && isHallu) || (!userThinksHallucination && !isHallu)) {
    score++;
    feedbackEl.textContent = "✅ Correct! " + q.explanation;
    feedbackEl.classList.remove("incorrect");
    feedbackEl.classList.add("correct");
  } else {
    feedbackEl.textContent = "❌ Not quite. " + q.explanation;
    feedbackEl.classList.remove("correct");
    feedbackEl.classList.add("incorrect");
  }

  submitBtn.disabled = true;
  nextBtn.classList.remove("hidden");
});

function showInfoScreen() {
  quizScreen.classList.add("hidden");
  infoScreen.classList.remove("hidden");
}


// Handle next question or show results
nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < questions.length) {
    loadQuestion(currentIndex);
  } else {
    showInfoScreen();
  }

});

// Show results screen
function showResults() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent = `You scored ${score} out of ${questions.length}.`;

  let message = "";
  const ratio = score / questions.length;

  if (ratio === 1) {
    message = "Perfect! You’re very good at spotting AI hallucinations.";
  } else if (ratio >= 0.7) {
    message =
      "Nice work! You usually can tell when AI is making things up, but it can still be tricky.";
  } else if (ratio >= 0.4) {
    message =
      "AI can sound very convincing. This shows why fact-checking is so important.";
  } else {
    message =
      "See how easy it is to be misled? This is why we should never treat AI as automatically true.";
  }

  resultMessage.textContent = message;
}

// Info → Usage
toUsageBtn.addEventListener("click", () => {
  infoScreen.classList.add("hidden");
  usageScreen.classList.remove("hidden");
});

// Usage → Sources
toSourcesBtn.addEventListener("click", () => {
  usageScreen.classList.add("hidden");
  sourcesScreen.classList.remove("hidden");
});

// Sources → Results
continueToResultsBtn.addEventListener("click", () => {
  sourcesScreen.classList.add("hidden");
  showResults();
});



// Restart quiz
restartBtn.addEventListener("click", () => {
  score = 0;
  currentIndex = 0;

  resultScreen.classList.add("hidden");
  infoScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
