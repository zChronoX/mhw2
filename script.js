/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const imgCheck = "images/checked.png";
const imgUnchecked = "images/unchecked.png";
const allAnswers = document.querySelectorAll('.choice-grid div');
const userAnswers = {};
const questions = {};

function scegliRisposta(event) {
  const risposta = event.currentTarget;
  const { questionId, choiceId } = risposta.dataset;
  userAnswers[questionId] = choiceId;

  const answers = questions[questionId] || [];
  for (const answer of answers) {
    const answerChoiceId = answer.dataset.choiceId;
    const checkbox = answer.querySelector('.checkbox');
    checkbox.src = answerChoiceId === choiceId ? imgCheck : imgUnchecked;
    answer.classList.add(answerChoiceId === choiceId ? 'selected' : 'uncheck');
    answer.classList.remove(answerChoiceId === choiceId ? 'uncheck' : 'selected');
  }

  checkUserAnswers();
}

function checkUserAnswers() {
  let canShowResult = true;
  for (const key in userAnswers) {
    if (!userAnswers[key]) {
      canShowResult = false;
    }
  }

  if (canShowResult) {
    for (const answer of allAnswers) {
      answer.removeEventListener('click', scegliRisposta);
    }
    showResults();
  }
}

function showResults() {
  const result = getResult();
  if (result) {
    const resultSection = document.querySelector('#result');
    resultSection.querySelector('#resultTitle').textContent = RESULTS_MAP[result].title;
    resultSection.querySelector('#resultText').textContent = RESULTS_MAP[result].contents;
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
  }
}

function getResult() {
  if (userAnswers.one === userAnswers.three || userAnswers.one === userAnswers.two) {
    return userAnswers.one;
  }
  else if (userAnswers.two === userAnswers.three) {
    return userAnswers.two;
  }
  else if (userAnswers.one !== userAnswers.three || userAnswers.one !== userAnswers.two || userAnswers.two !== userAnswers.three) {
    return userAnswers.one;
  }
  else {
    return userAnswers.three;
  }

}



function reset() {
  for (const answer in userAnswers) {
    userAnswers[answer] = undefined;
  }

  for (const answ of allAnswers) {
    answ.addEventListener('click', scegliRisposta);
    answ.querySelector('.checkbox').src = imgUnchecked;
    answ.classList.remove('selected');
    answ.classList.remove('uncheck');
    const resultSection = document.querySelector('#result');
    resultSection.classList.add('hidden');
    resultSection.querySelector('#resultTitle').textContent = '';
    resultSection.querySelector('#resultText').textContent = '';
    scrollTo(0, 0);
  }
}




for (const answer of allAnswers) {
  const questionId = answer.dataset.questionId;
  if (!questions[questionId]) {
    questions[questionId] = [];
  }
  questions[questionId].push(answer);
  userAnswers[questionId] = undefined;
  answer.addEventListener('click', scegliRisposta);
}


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset);



