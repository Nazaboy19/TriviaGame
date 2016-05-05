(function() {
  var questions = [{
    question: "Who is the best character in the marvel universe?",
    choices: ["Deadpool","Spiderman","Captain America","Iron Man"],
    correctAnswer: "Deadpool",
  }, {
    question: "In what year did the moon landing happened?",
    choices: ["1968", "1970", "1969", "2000"],
    correctAnswer: "1969",
  }, {
    question: "Superman is a fictional superhero from what fictional planet?",
    choices: ["Mars", "Earth", " Krypton", "pluto"],
    correctAnswer: "Krypton",
  }, {
    question: " Guinness beer was first brewed in which country?",
    choices: ["France", "Ireland", "U.S.A", "Spain"],
    correctAnswer: "Ireland",
  }, {
    question: "Which team won the 2016 Super Bowl?",
    choices: ["Seattle Seahawks", "Denver Broncos",  " Tampa Bay Buccaneers", "Carolina Panthers"],
    correctAnswer: "Denver Broncos",
  }];
  
  var questionCounter = 0; 
  var selections = []; 
  var trivia = $('#trivia'); 
  
  
  displayNext();
  
  
  $('#next').on('click', function (e) {
    e.preventDefault();
    
 
    if(trivia.is(':animated')) {        
      return false;
    }
    choose();
    

    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(trivia.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(trivia.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  

  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  

  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  

  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  

  function displayNext() {
    trivia.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        trivia.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        trivia.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
  

})();