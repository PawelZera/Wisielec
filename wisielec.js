var questions= [
    {
        question:"Napisana jest w tym gra",
        answer:"javascript",
    },
    {
        question:"Co nie siłą, ",
        answer:"to rozumem",
    },
    {
        question:"Głupcy wiążą węzły, ",
        answer:"a mądrcy je rozwiązują",
    },
    {
        question:"Najczęściej wykorzystywany system liczbowy w elektronice cyfrowej",
        answer:"binarny",
    },
    {
        question:"Grafika wyglądająca niemal całkowicie realistycznie",
        answer:"fotorealizm",
    },
    {
        question:"Co głupi straci, ",
        answer:"tym się mądry wzbogaci",
    },
    {
        question:"Dlatego dwie uszy, jeden język dano, ",
        answer:"iżby mniej mówiono a więcej słuchano",
    },
    {
        question:"Im kto mniej wart, ",
        answer:"tym wyżej głowę nosi",
    },
    {
        question:"Krowa, która dużo ryczy, ",
        answer:"mało mleka daje",
    },
    {
        question:"Plotka wyleci wróblem, ",
        answer:"a powróci wołem",
    },
]
var letters=["A","Ą","B","C","Ć","D","E","Ę","F","G","H","I","J","K","L","Ł","M","N","Ń","O","Ó","P","Q","R","S","Ś","T","U","V","W","X","Y","Z","Ż","Ź"]
var questionNo,showAnswer,password,passLength,mistakes,showPrompt,guess,password1;
var sounds= {
    yes: new Audio("yes.wav"),
    no:new Audio("no.wav"),
    fail:new Audio("fail.wav"),
    win:new Audio("win.wav"),
}

$(document).ready(startGame);

function newPassword() {
    questionNo= Math.floor(Math.random()*10);
    showAnswer = questions[questionNo].answer;
    password=showAnswer;
    password=password.toUpperCase();
    password1="";
    passLength = password.length;
    showPrompt=questions[questionNo].question;
    hidePassword();
}
function hidePassword() {
    for (i=0; i<passLength; i++){
        if (password.charAt(i)==" ") password1+=" ";
        else password1+="_";
    }
}
function writePassword() {
    $("#board").html(password1);
    $("#prompt").html(showPrompt);
}
function startGame() {
    clearGallows();
    newPassword();
    mistakes=0;
    lettersBox();
    writePassword();
    clicked();
}
function check(nr) {
    guess = false;
    checkLetters(nr);
    if(guess==true) {
        hit(nr);
    }
    else{
        mis(nr);
    }
    checkProgress();
}
function clicked() {
    $(".letter").click(function () {
        var clicked = this.id;
        if(clicked!="lock"){check(clicked);}
    });
}
function lettersBox() {
    var contentsDiv="";
    for (i=0; i<=34;i++){
        contentsDiv+= '<div class="letter" id="'+i+'">'+letters[i]+'</div>';
    }
    $("#alphabet").html(contentsDiv);
}
function checkProgress() {
    if (password == password1) {
        $('#alphabet').html("Tak jest! Podano prawidłowe hasło: "+showPrompt+" "+password+'<br /><br /><span class="button"">JESZCZE RAZ?</span>');
        sounds.win.play();
        $('.button').click(startGame);
    }
    if (mistakes>=9) {
        $('#alphabet').html("Przegrana! Prawidłowe hasło: "+showPrompt+" "+password+'<br /><br /><span class="button">JESZCZE RAZ?</span>');
        sounds.fail.play();
        $('.button').click(startGame);
    }
}
function checkLetters(nr) {
    String.prototype.setSign = function(number,letter) {
        if (number> this.passLength-1) return this.toString();
        else return this.substr(0, number)+letter+this.substr(number+1);
    }
    for (i=0; i<passLength; i++){
        if (password.charAt(i) == letters[nr]){
            password1 = password1.setSign(i,letters[nr]);
            guess=true;
        }
    }
}
function hit(nr) {
    $("#"+nr).addClass('hit').attr("id","lock");
    sounds.yes.play();
    writePassword();
}
function mis(nr) {
    $("#"+nr).addClass('mis').attr("id","lock");
    sounds.no.play();
    mistakes++;
    var obraz = "img/s"+mistakes+".jpg";
    $('#gallows').html('<img src="'+obraz+'" alt=""/>');
}
function clearGallows() {
    $("#gallows").html('<img src="img/s0.jpg" alt="">');
}
