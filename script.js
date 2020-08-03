
//This function is used to wait for the user to click submit
function clickStart(){

    $('.js-initial-submit').on('click', e =>{
      event.preventDefault();
        renderAQuestion();
      displayCurrentScore();
    });
}




//this function is used to display the current quesiont to the user. 
function renderAQuestion(){


    $('.initial-page').html(`
    <div class="question-box">
      <h2> ${STORE.questions[STORE.currentQuestion].question}</h2>
      <form class="choice-question">
      <h3 class ="current-score"></h3>
        <input type="radio" id="firstChoice" name="option" value="${STORE.questions[STORE.currentQuestion].choices[0]}" required>
        <label for="firstChoice">${STORE.questions[STORE.currentQuestion].choices[0]}</label>
        <br>
        <input type="radio" id="secondChoice" name="option" value="${STORE.questions[STORE.currentQuestion].choices[1]}">
        <label for="secondChoice">${STORE.questions[STORE.currentQuestion].choices[1]}</label>
        <br>
        <input type="radio" id="thridChoice" name="option" value="${STORE.questions[STORE.currentQuestion].choices[2]}">
        <label for="thridChoice">${STORE.questions[STORE.currentQuestion].choices[2]}</label>
        <br>
        <input type="radio" id="fourthChoice" name="option" value="${STORE.questions[STORE.currentQuestion].choices[3]}">
        <label for="fourthChoice">${STORE.questions[STORE.currentQuestion].choices[3]}</label>
        <br>
        <input type="button" id="check-answer-button" value="Submit">
      </form>
    </div>
    `);
    $("#check-answer-button").on('click', e=>{
      checkIfCorrect();
    });

}

function updateQuestion(){
     STORE.currentQuestion++;
     if(STORE.currentQuestion <=4){
     renderAQuestion();
     displayCurrentScore();
     }
     else{displayResults()}
}

//this updates the users current score
function displayCurrentScore(){
  $('.current-score').html(`
  Your score is: ${STORE.totalScore} correct
  <br>
  You are on question ${STORE.currentQuestion +1}/5`)

}



//this function checks if the user chose the correct answer
function checkIfCorrect(){
  let check = $("input[name='option']:checked").val();
    if(check===STORE.questions[STORE.currentQuestion].correctAnswer){

        correctChosen();
    

    }else if(!check){
     alert('Please Select an Option');
   }
   
   else{
     displayIncorrect();
   }

}



//this function is used to tell user their choice is correct and to prompt them to continue
function correctChosen(){
$('#check-answer-button').remove();

if( STORE.currentQuestion<4){
    $('.question-box').append(`
    <div class="wright-answer"> Correct! Nice job!</div>
    <label for="next-question"> Click here for the next question</label>
    <input type ="button" id="next-question" value=">>">
    `)
}else{
  $('.question-box').append(`
<div class="wright-answer"> Correct! Nice job!</div>
<form>
<label for="next-question"> Click here to see the results!</label>
<input type ="button" id="next-question" value=">>">
</form>
`)
}
$('#next-question').on('click', e=>{
STORE.totalScore++
updateQuestion();

});
}




//this function displays that the user chose incorrectly
function displayIncorrect(check){

$('#check-answer-button').remove();

if( STORE.currentQuestion<4){

$('.question-box').append(`
<div class="wrong-answer"> Incorrect! The correct answer is: ${STORE.questions[STORE.currentQuestion].correctAnswer}</div>
<form>
<label for="next-question"> Click here for the next question</label>
<input type ="button" id="next-question" value=">>">
</form>
`)

}else{

$('.question-box').append(`
<div class="wrong-answer"> Incorrect! The correct answer is: ${STORE.questions[STORE.currentQuestion].correctAnswer}</div>
<form>
<label for="next-question"> Click here to see the results!</label>
<input type ="button" id="next-question" value=">>">
</form>
`)

}

$('#next-question').on('click', e=>{
updateQuestion();

});

}






//this function displays the final results page and allows the user to start the quiz over
function displayResults(){

  if(STORE.totalScore==5){

    $('.initial-page').html(`
    <h1> Congrats! You got 5/5!</h1>
    <form> 
        <label for ="restart"> Click here to start over</label>
        <input type="button" id="restart" name="Restart" value="Restart">

    </form>
    `)

  }else if(STORE.totalScore < 5 && STORE.totalScore > 2){
    $('.initial-page').html(`
    <h1> Good job! You got ${STORE.totalScore}/5!</h1>
    <form> 
        <label for ="restart"> Click here to start over</label>
        <input type="button" id="restart" name="Restart" value="Restart">

    </form>
    `)
  }else{
    $('.initial-page').html(`
    <h1> Try again! You got ${STORE.totalScore}/5!</h1>
    <form> 
        <label for ="restart"> Click here to start over</label>
        <input type="button" id="restart" name="Restart" value="Restart">

    </form>
    `)
  }
  STORE.currentQuestion=0;
  STORE.totalScore=0;
  
  $('#restart').on('click', e=>{
    renderAQuestion();
    displayCurrentScore();
  })
}








//this function creates the quiz
//it calls all the functions required to creates the quiz
function CreateQuiz(){
    clickStart();

}

$(CreateQuiz);

const STORE = {
questions: [
    //first question
    {question: '1. What length of rope do you need to go bouldering?',
    choices: ['50 feet', '50 meters',  '100 feet', 'You don’t need a rope to go bouldering'],
    correctAnswer: 'You don’t need a rope to go bouldering'
    },
    //second question
    {question: '2. Is it common for a rock climber to use chalk for their hands?',
    choices: ['No', 'Yes', 'It is common for them to use chalk but not for their hands', 'Only if they are climbing wet rock'],
    correctAnswer: 'Yes'
    },
    //third question
    {question: '3. When bouldering, is a harness required?',
    choices: ['No','Yes','Only while resting','If you are under the age of 12'],
    correctAnswer: 'No'
    },
    //fourth question
    {question: '4. What is lead climbing?',
    choices: ['Climbing on metal','Climbing with a group of friends','Clipping quick-draws to bolts as you climb up a wall.','Climbing down rock faces'],
    correctAnswer:'Clipping quick-draws to bolts as you climb up a wall.'
    },
    //fifth question
    {question:'5. Will rock climbing be in the Olympic Games?',
    choices:['Yes','No','Only ice climbing','It always has been'],
    correctAnswer:'Yes'
    }
    
],
currentQuestion:0,
totalScore:0

}