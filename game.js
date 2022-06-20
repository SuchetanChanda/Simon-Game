var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red" , "blue" , "green" , "yellow"];
var started = false;
var level = 0;


    $(document).bind("touchstart keypress" , function() {
        if(!started){
            $("#level-title").text("Level " + level);
            nextSequence();
            started=true;
        }
        
    });



function nextSequence () {
    userClickedPattern=[];
    level++;
    $("h1").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour= buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}
$(".btn").click(function (){
    if(started)
    {
        var userChosenColour = $(this).attr("id");
        animatePress(userChosenColour);
        playSound(userChosenColour);
        userClickedPattern.push(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
    
})

function playSound (name) {
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress (currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer (currentLevel)
{
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel])
    {
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var s = new Audio ("sounds/wrong.mp3");
        s.play();
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startover();
    }
}

function startover (){
    level = 0;
    gamePattern=[];
    started=false;
}