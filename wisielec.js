var pytania= new Array(20);{
    pytania [0] = "javascript";
    pytania [1] = "to rozumem";
    pytania [2] = "a mądrcy je rozwiązują";
    pytania [3] = "binarny";
    pytania [4] = "fotorealizm";
    pytania [5] = "tym się mądry wzbogaci";
    pytania [6] = "iżby mniej mówiono a więcej słuchano";
    pytania [7] = "tym wyżej głowę nosi";
    pytania [8] = "mało mleka daje";
    pytania [9] = "a powróci wołem";
}
var podpowiedzi = new Array(20); {
    podpowiedzi [0] = "Napisana w tym gra";
    podpowiedzi [1] = "Co nie siłą, ...";
    podpowiedzi [2] = "Głupcy wiążą węzły, ...";
    podpowiedzi [3] = "Najczęściej wykorzystywany system liczbowy w elektronice cyfrowej";
    podpowiedzi [4] = "Grafika wyglądająca niemal całkowicie realistycznie";
    podpowiedzi [5] = "Co głupi straci, ...";
    podpowiedzi [6] = "Dlatego dwie uszy, jeden język dano, ...";
    podpowiedzi [7] = "Im kto mniej wart, ...";
    podpowiedzi [8] = "Krowa, która dużo ryczy";
    podpowiedzi [9] = "Plotka wyleci wróblem, ...";
}
var nr_pytania= Math.floor(Math.random()*10);
var pytanie = pytania[nr_pytania];
var haslo=pytanie;
haslo=haslo.toUpperCase();
var podpowiedz=podpowiedzi[nr_pytania];
var haslo1="";
var dlugosc=haslo.length;
var ile_skuch=0;
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");
var fail = new Audio("fail.wav");
var win = new Audio("win.wav");

window.onload=start;
String.prototype.ustawZnak = function(miejsce,znak) {
    if (miejsce> this.length-1) return this.toString();
    else return this.substr(0, miejsce)+znak+this.substr(miejsce+1);
}

for (i=0; i<dlugosc; i++){
    if (haslo.charAt(i)==" ") haslo1=haslo1+" ";
    else haslo1 = haslo1+"_";
}

function wypisz_haslo() {
    document.getElementById("plansza").innerHTML=haslo1;
    document.getElementById("podpowiedz").innerHTML=podpowiedz;
}
function start() {
    var tresc_diva="";
    for (i=0; i<=34;i++){
        var element="lit"+i;
        tresc_diva = tresc_diva + '<div class="litera" onclick="sprawdz('+i+')" id="'+element+'">'+litery[i]+'</div>';
        if ( (i+1)%7==0) tresc_diva = tresc_diva + '<div style="clear:both;"</div>';
    }
    document.getElementById("alfabet").innerHTML = tresc_diva;
    wypisz_haslo();
}
function sprawdz(nr) {
    var trafiona = false;

    for (i=0; i<dlugosc; i++){
        if (haslo.charAt(i) == litery[nr]){
            haslo1 = haslo1.ustawZnak(i,litery[nr]);
            trafiona=true;
        }
    }
    if(trafiona==true) {
        var element="lit"+nr;
        document.getElementById(element).style.background="#003300";
        document.getElementById(element).style.color="#00C000";
        document.getElementById(element).style.border=" 3px solid #00C000";
        document.getElementById(element).style.cursor="default";
        yes.play();
        wypisz_haslo();

    }
    else{
        var element="lit"+nr;
        document.getElementById(element).style.background="#330000";
        document.getElementById(element).style.color="#C00000";
        document.getElementById(element).style.border=" 3px solid #C00000";
        document.getElementById(element).style.cursor="default";
        document.getElementById(element).setAttribute("onclick",";");
        no.play();

        ile_skuch++;
        var obraz = "img/s"+ile_skuch+".jpg";
        document.getElementById("szubienica").innerHTML = '<img src="'+obraz+'" alt=""/>';
    }
    if (haslo == haslo1) {
        document.getElementById("alfabet").innerHTML = "Tak jest! Podano prawidłowe hasło: "+haslo+'<br /><br /><span class="reset"  onclick="location.reload()">JESZCZE RAZ?</span>'
        win.play();
    }
    if (ile_skuch>=9) {
        document.getElementById("alfabet").innerHTML = "Przegrana! Prawidłowe hasło: "+haslo+'<br /><br /><span class="reset"  onclick="location.reload()">JESZCZE RAZ?</span>'
    fail.play();
    }

}


var litery= new Array(35);{
    litery [0] = "A";
    litery [1] = "Ą";
    litery [2] = "B";
    litery [3] = "C";
    litery [4] = "Ć";
    litery [5] = "D";
    litery [6] = "E";
    litery [7] = "Ę";
    litery [8] = "F";
    litery [9] = "G";
    litery [10] = "H";
    litery [11] = "I";
    litery [12] = "J";
    litery [13] = "K";
    litery [14] = "L";
    litery [15] = "Ł";
    litery [16] = "M";
    litery [17] = "N";
    litery [18] = "Ń";
    litery [19] = "O";
    litery [20] = "Ó";
    litery [21] = "P";
    litery [22] = "Q";
    litery [23] = "R";
    litery [24] = "S";
    litery [25] = "Ś";
    litery [26] = "T";
    litery [27] = "U";
    litery [28] = "V";
    litery [29] = "W";
    litery [30] = "X";
    litery [31] = "Y";
    litery [32] = "Z";
    litery [33] = "Ż";
    litery [34] = "Ź";
}
