$(document).ready(function () {
    console.log("hello")

    var correctAnswers = 0;
    var incorrectAnswers = 0;
    var unansweredQuestions = 0;
    var timeRemaining = 16;
    var intervalID;
    var indexQandA = 0; //index to load a different questions each round 
    var answered = false; 
    var correct;

    var triviaGame = [{
        question: "Which famous designer is best known for their signature high heel with red soles ?",
        answer: ["Christian Dior", "Christian Louboutin", "Alexander McQueen", "Yves Saint Laurent"],
        correct: "1",
        image: "assets/images/louboutin.gif"
    }, {
        question: "Medusa is the logo of which fashion company?",
        answer: ["Dolce & Gabbana", "Versace", "Givenchy", "Fendi"],
        correct: "1",
        image: "assets/images/versace.gif"
    }, {
        question: "Anna Wintour is the editor of which fashion magazine?",
        answer: ["Vogue", "Elle", "Vanity Fair", "Cosmopolitan"],
        correct: "0",
        image: "assets/images/anna.gif"
    }, {
        question: "Coco Chanel first started off by selling... ",
        answer: ["Hats", "Perfumes", "Bags", "Shoes"],
        correct: "0",
        image: "assets/images/coco.jpg"
    }, {
        question: "In which city was Prada founded?",
        answer: ["Bordeaux, France", "London, England", "New York City, New York", "Milan, Italy"],
        correct: "3",
        image: "assets/images/prada.gif"
        
    }
   ];
   

   function startGame() {
    console.log("game has begun");
    $('.start-button').remove();
    correctAnswers = 0;
    incorrectAnswers = 0;
    unansweredQuestions = 0;
    loadQandA();
}

function loadQandA() {
    answered = false; 
    timeRemaining = 16;
    intervalID = setInterval(timer, 1000);
    if (answered === false) {
        timer();
    }
    correct = triviaGame[indexQandA].correct;
    var question = triviaGame[indexQandA].question;
    $('.question').html(question);
    for (var i = 0; i < 4; i++) {
        var answer = triviaGame[indexQandA].answer[i];
        $('.answers').append('<h4 class= answersAll id=' + i + '>' + answer + '</h4>');
    }
    
    $("h4").click(function () {
        var id = $(this).attr('id');
        if (id === correct) {
            answered = true; // stops the timer
            $('.question').text("The correct answer is: " + triviaGame[indexQandA].answer[correct]);
            correctAnswer();
        } else {
            answered = true; 
            $('.question').text( "The correct answer is: " + triviaGame[indexQandA].answer[correct]);
            incorrectAnswer();
        }
    });
}
function timer() {
    if (timeRemaining === 0) {
        answered = true;
        clearInterval(intervalID);
        $('.question').text("The answer is: " + triviaGame[indexQandA].answer[correct]);
        unAnswered();
    } else if (answered === true) {
        clearInterval(intervalID);
    } else {
        timeRemaining--;
        $('.timeRemaining').text('You have ' + timeRemaining + ' seconds remaining');
    }
}

function correctAnswer() {
    correctAnswers++;
    $('.timeRemaining').text("CORRECT!")
    resetRound();
}

function incorrectAnswer() {
    incorrectAnswers++;
    $('.timeRemaining').text("SORRY, THAT'S INCORRECT!")
    resetRound();

}

function unAnswered() {
    unansweredQuestions++;
    $('.timeRemaining').text("TIMES UP!")
    resetRound();
}

function resetRound() {
    $('.answersAll').remove();
    $('.answers').append('<img class=answerImage src="' + triviaGame[indexQandA].image + ' ">'); 
    indexQandA++; 
    if (indexQandA < triviaGame.length) {
        setTimeout(function () {
            loadQandA();
            //remove image
            $('.answerImage').remove();
        }, 5000);
    } else {
        setTimeout(function () {
            $('.question').remove();
            $('.timeRemaining').remove();
            $('.answerImage').remove();
            $('.answers').append('<h4 class= answersAll end>CORRECT ANSWERS: ' + correctAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>INCORRECT ANSWERS: ' + incorrectAnswers + '</h4>');
            $('.answers').append('<h4 class= answersAll end>UNANSWERED QUESTIONS: ' + unansweredQuestions + '</h4>');
            setTimeout(function () {
                location.reload();
            }, 7000);
        }, 5000);
    }
};

$('.startButton').on("click", function () {
    $('.startButton');
    startGame();

});


});
