var colorarr = ["blue", "yellow", "green", "red"];
//Exclusive to each round
var round = 0;
var gamePattern = [];
var userPattern=[];
var started = 0;
var hardstart = 0;

$(document).click(function(){
        if (!hardstart){
            hardstart = 1;
            console.log("starting...");
            restart();
        }
    
});

 $(".btn").click(function(){
    console.log("user click: " + $(this).attr("id"));
        if (started){
            var color = $(this).attr("id");
            Playaudio(color);
            AnimateButton(color);
            userPattern.push(color);
            CheckUser();
        }
    });

function restart(){
    round++;
    userPattern=[];
    $("#level-title").html("Level "+ round);

    //next sequence
    var randomNum = Math.floor(Math.random()*4);
    gamePattern.push(colorarr[randomNum]);
    
    //Display to user
    var last = gamePattern.length - 1;
    $("#" + gamePattern[last]).fadeIn(100).fadeOut(100).fadeIn(100);
    Playaudio(gamePattern[last]);
    started = 1;
}

function CheckUser(){
    var curr = userPattern.length;
    if (userPattern[curr-1] === gamePattern[curr-1]){
        if (userPattern.length === gamePattern.length){
            setTimeout(restart, 800);
        }
    }
    else{
       setTimeout(gameOver, 300);
    }
    return;
}


function gameOver(){
    Playaudio("wrong");
    $("#level-title").html("! ! ! ! ! ! ! !");
    $("body").addClass("game-over");
    started = 0;
    round = 0;
    gamePattern = [];

    setTimeout(function () {
        $("body").removeClass("game-over");
        $("#level-title").html("Click anywhere to Restart");
        console.log("game-over: waiting for click");
        $(document).one("click", function () {
            setTimeout(restart, 500);
        });
    }, 200); 
}

function Playaudio(color){
    var audio = new Audio("sounds/"+color+".mp3");
    audio.play();
}

function AnimateButton(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100)
}


