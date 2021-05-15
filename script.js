let questions = [
    "Hur skulle du beskriva dig själv?<br><br>Kreativ, Logisk eller Analytisk?",
    "Vad är din favorit druva och region?",
    "Du står i kön på ICA och en person tränger sig före i kön.<br><br>Vad gör du?",
    "Hur många enheter av öl/vin har du druckit hittills i år?",
    "Hur många koppar kaffe har du druckit hittills i år?",
    "Om du bara fick dricka två drycker för resten av livet där den ena är vatten, vad skulle den andra vara?",
    "Om du bara fick förtära en av följande resten av livet, vad väljer du?<br><br>Ost, Vin eller Choklad.",
    "Om du var tvungen att göra något av följande, vad skulle du göra?<br><br>Snagga dig, Pierca dig i nästan eller Valfri tatuering (minst 5 cm i diameter).",
    "Om du bara fick klä dig en viss färg på överkroppen för de nästkommande 5 åren, vilken färg väljer du?<br><br>Röd, Grön eller Blå.",
    "Vad är det viktigaste tillbehören på en korv med bröd?",
    "Vilken hushållssyssla slipper du helst?",
    "Vilket resemål har varit det mest minnesvärde?",
    "Vilken sport/idrott tror du att du har störst chans att vinna i över samtliga i detta sällskap?",
    "Hur många hårfärger har du haft genom livet?",
    "Vilken kroppsdel är du mest nöjd över?",
    "Vad lockar mest?<br><br>Husvagnssemester, Charterresa eller Fjällvandring.",
    "Du köper ett stort paket glass med smakerna choklad, vanilj och jordgubbe. Vilken äter du upp först?",
    "Vilket årtionde har tillfört mest/bäst till musikvärlden?",
    "Vilken diagnos tror du att du ligger närmast?<br><br>Autism, tvångssyndrom/OCD eller tourettes.",
    "I vilken miljö ser du dig bo om 10 år?<br><br>Stadsmiljö, förort eller landsbygd?",
    "Vad är det viktigaste pålägget på pizzan förutom tomatsås och ost?",
    "Nästa vecka får du bara äta en och samma rätt till lunch och middag.<br><br>Vad blir det?",
    "Om du inte behövde ta hänsyn till livspusslet, vilket husdjur skulle du då ha?",
    "Vilket är det absolut sötaste djuret?",
    "Vad är din favoritblomma?",
    "Du får in en maträtt på en resturang som inte uppfyller dina förväntningar.<br><br>Vad gör du?",
    "Vilken är den bästa åldern?",
    "Vad skulle du säga är ditt \"spirit animal\"",
    "Du sitter på ett flygplan till ett främmande land på semester.<br><br>Vad ser du mest fram emot?",
    "Om du magiskt skulle få lära dig ett nytt instrument imorgon, vilket skulle det vara?",
    "Vilket ytterligare språk än dom du kan skulle du vilja kunna prata flytande?"
];

let counter;
let isFullscreen;

$(document).ready(function(){

    // Global variables ***********************************************

    counter = 0;
    isFullscreen = false;

    // Listeners ********************************************************

    $("#nextQuestionBtn").click(function(){
        if(counter != questions.length){
            $("#questionArea").html(questions[counter]);
            $("#currentQuestion").html(counter+1);
            counter++;
        }
    });

    $("#previousQuestionBtn").click(function(){
        if(counter > 1){
            counter--;
            $("#questionArea").html(questions[counter-1]);
            $("#currentQuestion").html(counter);
        }
        
    });

    // Functions *******************************************************

    function shuffle(){
        const amountOfQuestions = questions.length;
        for(let i = 0; i < questions.length; i++){
            const randomQuestionIndex = getRandomQuestionIndex(amountOfQuestions);
            const temp = questions[i]
            questions[i] = questions[randomQuestionIndex];
            questions[randomQuestionIndex] = temp;
        }
    }

    function getRandomQuestionIndex(limit){
        return nr = Math.floor(Math.random() * Math.floor(limit));
    }

    // Runs when loaded *************************************************
    
    $("#currentQuestion").html(counter);
    shuffle();

})