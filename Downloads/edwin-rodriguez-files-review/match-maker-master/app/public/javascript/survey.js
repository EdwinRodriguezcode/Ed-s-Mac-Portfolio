var survey = [];
  var questions = [
      'Do you like hiking?', 
      'Do you like going to movies?', 
      'Do you like gaming?', 
      'Do you like learning new things?',
      'Do you like animals?',
      'Do you like the club scene?',
      'Do you like competing in sports?',
      'Do you like watching sports?',
      'Do you like socializing?',
      'Do you like reading?'
  ]

  for (var idx = 0; idx < 10; idx++) {
      var newQuestion = $(`<div class='questionBar' id='question${idx}'><h6>${questions[idx]}</h6></div>`);

      var newAnswers = $(`
          <div class="btn-group btn-group-toggle" data-toggle="buttons">
              <label class="btn btn-secondary active">
                  <input type="radio" name="options-${idx}" value='1' autocomplete="off" checked> No way!
              </label>
              <label class="btn btn-secondary">
                  <input type="radio" name="options-${idx}" value='2' autocomplete="off"> I'd rather not
              </label>
              <label class="btn btn-secondary">
                  <input type="radio" name="options-${idx}" value='3' autocomplete="off"> No preference
              </label>
              <label class="btn btn-secondary">
                  <input type="radio" name="options-${idx}" value='4' autocomplete="off"> Yes, kinda
              </label>
              <label class="btn btn-secondary">
                  <input type="radio" name="options-${idx}" value='5' autocomplete="off"> Absolutely!
              </label>
          </div>
          <br>
      `);

      $('#quizField').append(newQuestion);
      $('#quizField').append(newAnswers);
  }

$('#submitBtn').on('click', function(){
    var ansArr = [];
    for (var idx = 0; idx<10; idx++) {
      ansArr.push(parseInt($(`input[name=options-${idx}]:checked`).val()))
    }
    
    var newFriend = {
        name: userName,
        photo: userPhoto,
        scores: ansArr,
    }

    $.post("/friends", newFriend).then(function(data) {
        console.log('here is data after post')
        console.log(data)
        $('#quizField').empty();
        $('.bottom-row').addClass('invisible');
        $('#surveyTitle').text('Thanks for taking the survey!')

        var resultCard = $(`
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${data.photo}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">It's a match!</h5>
                    <p class="card-text">You were matched with ${data.name}!</p>
                </div>
            </div>
        `)

        $('#quizField').append(resultCard);
        

      console.log("posting response data: ", data);
    });
});