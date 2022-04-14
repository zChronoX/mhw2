/* TODO: inserite il codice JavaScript necessario a completare il MHW! */

const imgCheck = "images/checked.png";
const imgUnchecked = "images/unchecked.png";
const allAnswers = document.querySelectorAll('.choice-grid div');
const userAnswers = {}; // dizionario composto da key = questionId e value = risposta inserita dall'utente
const questions = {}; // dizionario composto da key = questionId e value = risposte che fanno riferimento a quella domanda





function scegliRisposta(event) {
  const risposta = event.currentTarget;
  const { questionId, choiceId } = risposta.dataset; // javascript destructuring
  userAnswers[questionId] = choiceId; // mi salvo la risposta dell'utente

  const answers = questions[questionId] || [];
  for (const answer of answers) {

    const answerChoiceId = answer.dataset.choiceId;
    const checkbox = answer.querySelector('.checkbox');
    checkbox.src = answerChoiceId === choiceId ? imgCheck : imgUnchecked; // cambio l'immagine della checkbox in base alla condizione 'answerChoiceId === choiceId'
    answer.classList.add(answerChoiceId === choiceId ? 'selected' : 'uncheck'); // aggiungo classe css per evidenziare la risposta o opacizzare le altre (regole css da aggiungere)
    answer.classList.remove(answerChoiceId === choiceId ? 'uncheck' : 'selected'); // rimuovo classe css per evidenziare la risposta o opacizzare le altre (regole css da aggiungere)


  }

  if (userAnswers.one !== undefined && userAnswers.two !== undefined && userAnswers.three !== undefined) {
    for (const answ of answers) {
      answ.removeEventListener('click', scegliRisposta);
    }
   
  }

showResults();


}










for (const answer of allAnswers) {
  const questionId = answer.dataset.questionId;
  if (!questions[questionId]) {
    questions[questionId] = [];
  }
  questions[questionId].push(answer);
  answer.addEventListener('click', scegliRisposta);

}









function reset() {
  for (const answer in userAnswers) {
    delete userAnswers[answer];
  }

  for (answ of allAnswers) {
    answ.addEventListener('click', scegliRisposta);
    answ.querySelector('.checkbox').src = imgUnchecked;
    answ.classList.remove('selected');
    answ.classList.remove('uncheck');
    const rTlt = document.querySelector('#resultTitle');
    const rTxt = document.querySelector('#resultText');
    rTlt.classList.add('hidden');
    rTxt.classList.add('hidden');


    scrollTo(0, 0);

  }

}

function results() {
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
/*{

if (userAnswers.one === userAnswers.three || userAnswers.one === userAnswers.two) {
  return userAnswers.one;
}
if (userAnswers.two === userAnswers.three || userAnswers.two === userAnswers.one) {
  return userAnswers.two;
}
if (userAnswers.three === userAnswers.one || userAnswers.three === userAnswers.two) {
  return userAnswers.three;
}

return userAnswers.one;
}*/



function showResults() {
  const res = results();
  const rTlt = document.querySelector('#resultTitle');
  const rTxt = document.querySelector('#resultText');
  rTlt.classList.remove('hidden');
  rTxt.classList.remove('hidden');
  const HidRes = document.querySelector('#result');
  HidRes.querySelector('#resultTitle').textContent = RESULTS_MAP[res].title;
  HidRes.querySelector('#resultText').textContent = RESULTS_MAP[res].contents;
  HidRes.classList.remove('hidden');










}




const resetButton = document.querySelector('#button');
resetButton.addEventListener('click', reset);

