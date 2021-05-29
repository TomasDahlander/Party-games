// Global variables ********************************************************************************************************

let questions;

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
            $("#questionArea").html(questions[counter].question);
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
            $("#questionArea").html(questions[counter - 1].question);
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
    $("#rules-modal-closer, .rules-exit-button").click(function () {
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
            const randomQuestionIndex = getRandomQuestionIndex(amountOfQuestions);
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

    /**
     * Fetches the questions array from a JSON file
     */
    function getQuestionsArray() {
        fetch("/questions.json")
            .then((resp) => resp.json())
            .then((data) => setQuestions(data));
    }

    /**
     * Receives JSON data and sets the questions array and calls shuffle
     * @param {JSON data} questionsDataArray
     */
    function setQuestions(questionsDataArray) {
        questions = questionsDataArray;
        shuffle();
    }

    // Runs when loaded ****************************************************************************************************
    getQuestionsArray(); // Gets the questions
    counter = 0; // initiates the questions counter
    $("#currentQuestion").html(counter);
    modal = $("#rules-modal-id");
    $("#indexfooter").html(`Copyright &copy; ${new Date().getFullYear()} – Tomas Dahlander`); // set the current year in footer
});
