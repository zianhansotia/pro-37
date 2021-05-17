class Quiz {
  constructor(){
    this.title2 = createElement("h2")
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("yellow");

    //write code to show a heading for showing the result of Quiz
    this.title2.html("RESULT OF THE QUIZ");
    this.title2.position(350,0);

    //call getContestantInfo( ) here
    Contestant.getPlayerInfo();


    //write condition to check if contestantInfor is not undefined
    if(allContestants !== undefined){
      Contestant.getPlayerInfo();
    }

    //write code to add a note here
    if(allContestants !== undefined){
      fill("blue");
      textSize(20);
      text("*NOTE:CONTESTANTS WHO ANSWERED CORRECT ARE HIGHLIGHTED IN GREEN",10,230);
    }


    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer){
        fill("green");
        text(allContestants[plr].name+":chose the correct answer",10,270);
      }
      else{
        fill("red");
        text(allContestants[plr].name+":chose the wrong answer",10,290);
      }
    }
    
  }

}
