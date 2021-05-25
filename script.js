// Global variables ********************************************************************************************************

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
    'Vad skulle du säga är ditt "spirit animal"',
    "Du sitter på ett flygplan till ett främmande land på semester.<br><br>Vad ser du mest fram emot?",
    "Om du magiskt skulle få lära dig ett nytt instrument imorgon, vilket skulle det vara?",
    "Vilket ytterligare språk än dom du kan skulle du vilja kunna prata flytande?",
    "Om du hade fått välja ett annat yrke i ditt liv, vad hade det varit?",
    "Du är på ett kalas med ett nytt umgänge och det finns bara en tårtbit kvar som du är sugen på.<br><br>Vad gör du?",
];

let counter;

let modal;

$(document).ready(function () {
    // Listeners ***********************************************************************************************************

    /**
     * Listener for the next question button that increases the counter
     * and displays that question in from the array and the current number
     */
    $("#nextQuestionBtn").click(function () {
        if (counter != questions.length) {
            $("#questionArea").html(questions[counter]);
            $("#currentQuestion").html(counter + 1);
            counter++;
        }
    });

    /**
     * Listener for the previous question button that decreases the counter
     * and displays that question in from the array and the current number
     */
    $("#previousQuestionBtn").click(function () {
        if (counter > 1) {
            counter--;
            $("#questionArea").html(questions[counter - 1]);
            $("#currentQuestion").html(counter);
        }
    });

    /**
     * Displays the modal when clicking on Rules
     */
    $("#ruleBtn").click(function () {
        modal.css("display", "block");
    });

    /**
     * Hides the modal when clicking on the x in the Modal
     */
    $("#modal-closer").click(function () {
        modal.css("display", "none");
    });

    /**
     * Doesn't work but should close the modal if user click outside of rule modal
     * @param {event} event
     */
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.css("display", "none");
        }
    };

    // Functions ***********************************************************************************************************

    /**
     * Shuffles the global array of questions in this file
     */
    function shuffle() {
        const amountOfQuestions = questions.length;
        for (let i = 0; i < questions.length; i++) {
            const randomQuestionIndex =
                getRandomQuestionIndex(amountOfQuestions);
            const temp = questions[i];
            questions[i] = questions[randomQuestionIndex];
            questions[randomQuestionIndex] = temp;
        }
    }

    /**
     * Gets a random number between 0 and the parameter given but not included
     * @param {int} max indicating what is the roof of the random function
     * @returns A random int between 0 and max-1
     */
    function getRandomQuestionIndex(max) {
        return (nr = Math.floor(Math.random() * Math.floor(max)));
    }

    // Runs when loaded ****************************************************************************************************

    counter = 0;
    modal = $("#rules-modal");
    $("#currentQuestion").html(counter);
    $("#indexfooter").html(
        `Copyright &copy; ${new Date().getFullYear()} – Tomas Dahlander`
    );
    shuffle();
});
