var answer= new Array(9);{
    answer [0] = "javascript";
    answer [1] = "to rozumem";
    answer [2] = "a mądrcy je rozwiązują";
    answer [3] = "binarny";
    answer [4] = "fotorealizm";
    answer [5] = "tym się mądry wzbogaci";
    answer [6] = "iżby mniej mówiono a więcej słuchano";
    answer [7] = "tym wyżej głowę nosi";
    answer [8] = "mało mleka daje";
    answer [9] = "a powróci wołem";
}
var prompt = new Array(9); {
    prompt [0] = "Napisana jest w tym gra";
    prompt [1] = "Co nie siłą, ";
    prompt [2] = "Głupcy wiążą węzły, ";
    prompt [3] = "Najczęściej wykorzystywany system liczbowy w elektronice cyfrowej";
    prompt [4] = "Grafika wyglądająca niemal całkowicie realistycznie";
    prompt [5] = "Co głupi straci, ";
    prompt [6] = "Dlatego dwie uszy, jeden język dano, ";
    prompt [7] = "Im kto mniej wart, ";
    prompt [8] = "Krowa, która dużo ryczy, ";
    prompt [9] = "Plotka wyleci wróblem, ";
}
var letters= new Array(35);{
    letters [0] = "A";
    letters [1] = "Ą";
    letters [2] = "B";
    letters [3] = "C";
    letters [4] = "Ć";
    letters [5] = "D";
    letters [6] = "E";
    letters [7] = "Ę";
    letters [8] = "F";
    letters [9] = "G";
    letters [10] = "H";
    letters [11] = "I";
    letters [12] = "J";
    letters [13] = "K";
    letters [14] = "L";
    letters [15] = "Ł";
    letters [16] = "M";
    letters [17] = "N";
    letters [18] = "Ń";
    letters [19] = "O";
    letters [20] = "Ó";
    letters [21] = "P";
    letters [22] = "Q";
    letters [23] = "R";
    letters [24] = "S";
    letters [25] = "Ś";
    letters [26] = "T";
    letters [27] = "U";
    letters [28] = "V";
    letters [29] = "W";
    letters [30] = "X";
    letters [31] = "Y";
    letters [32] = "Z";
    letters [33] = "Ż";
    letters [34] = "Ź";
}
var questionNo,drawnAnswer,password,passLength,mistakes,drawnPrompt,guess;
var password1="";
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var fail = new Audio("fail.wav");
var win = new Audio("win.wav");

$(document).ready(startGame);

function newPassword() {
    questionNo= Math.floor(Math.random()*10);
    drawnAnswer = answer [questionNo];
    password=drawnAnswer;
    password=password.toUpperCase();
    password1="";
    passLength = password.length;
    drawnPrompt=prompt[questionNo];
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
    $("#prompt").html(drawnPrompt);
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
    $(document).ready(function () {
        $(".letter").click(function () {
            var clicked = this.id;
            if(clicked!="lock"){
                check(clicked);
            }
        })
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
        $('#alphabet').html("Tak jest! Podano prawidłowe hasło: "+drawnPrompt+" "+password+'<br /><br /><span class="button"">JESZCZE RAZ?</span>');
        win.play();
        $('.button').click(startGame);
    }
    if (mistakes>=9) {
        $('#alphabet').html("Przegrana! Prawidłowe hasło: "+drawnPrompt+" "+password+'<br /><br /><span class="button">JESZCZE RAZ?</span>');
        fail.play();
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
    yes.play();
    writePassword();
}
function mis(nr) {
    $("#"+nr).addClass('mis').attr("id","lock");
    no.play();
    mistakes++;
    var obraz = "img/s"+mistakes+".jpg";
    $('#gallows').html('<img src="'+obraz+'" alt=""/>');
}
function clearGallows() {
    $("#gallows").html('<img src="img/s0.jpg" alt="">');
}
