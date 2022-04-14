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

  checkUserAnswers();
}

function checkUserAnswers() {
  let canShowResult = true; // di default dico che è possibile visualizzare il risultato
  for (const key in userAnswers) { // controllo tutte le key presenti nel dizionario userAnswers
    // se trovo una risposta === undefined allora significa che l'utente non ha selezionato tutte le risposte 
    // e quindi non posso visualizzare il risultato
    if (!userAnswers[key]) {
      canShowResult = false;
    }
  }

  if (canShowResult) { // se la variabile resta true, allora significa che l'utente ha risposto a tutte le domande
    for (const answer of allAnswers) {
      answer.removeEventListener('click', scegliRisposta); // elimino l'eventListener sul click
    }
    showResults(); // visualizzo il risultato
  }
}

function showResults() {
  const result = getResult(); // prendo il risultato da visualizzare
  if (result) {
    const resultSection = document.querySelector('#result');
    resultSection.querySelector('#resultTitle').textContent = RESULTS_MAP[result].title; // modifico il titolo nell'html
    resultSection.querySelector('#resultText').textContent = RESULTS_MAP[result].contents; // modifico il testo nell'html
    resultSection.classList.remove('hidden'); // elimino la classe hidden
    // posiziono la scrollbar affinche questo elemento venga visualizzato
    // l'opzione smooth serve per fare lo scroll con un'animazione
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
    userAnswers[answer] = undefined; // elimino le risposte dell'utente
  }

  for (const answ of allAnswers) {
    answ.addEventListener('click', scegliRisposta); // ricreo l'eventListener sul click delle risposte
    answ.querySelector('.checkbox').src = imgUnchecked; // resetto l'immagine della checkbox
    answ.classList.remove('selected'); // elimino la classe selected
    answ.classList.remove('uncheck'); // elimino la classe uncheck
    const resultSection = document.querySelector('#result');
    resultSection.classList.add('hidden'); // nascondo la sezione result
    resultSection.querySelector('#resultTitle').textContent = ''; // resetto il titolo
    resultSection.querySelector('#resultText').textContent = ''; // resetto la descrizione
    scrollTo(0, 0); // torno all'inizio della pagina
  }
}




for (const answer of allAnswers) {
  const questionId = answer.dataset.questionId;
  if (!questions[questionId]) {
    questions[questionId] = [];
  }
  questions[questionId].push(answer); // popolo il dizionario delle domande con le rispettive risposte
  userAnswers[questionId] = undefined; // inizializzo il dictionary delle risposte dell'utente
  answer.addEventListener('click', scegliRisposta); // aggiungo l'eventListener sul click
}


const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', reset); // aggiungo l'eventListener per il reset



