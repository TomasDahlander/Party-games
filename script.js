// Global variables ********************************************************************************************************

let questions;

let questionsCounter;

// Element variables

let rulesModal;

let addModal;

$(document).ready(function () {
    // Listeners ***********************************************************************************************************

    /**
     * Listener for the next question button that increases the counter
     * and displays that question in from the array and the current number
     */
    $("#nextQuestionBtn").click(function () {
        if (questionsCounter != questions.length) {
            $("#questionArea").html(questions[questionsCounter].question);
            $("#currentQuestion").html(questionsCounter + 1);
            questionsCounter++;
        }
    });

    /**
     * Listener for the previous question button that decreases the counter
     * and displays that question in from the array and the current number
     */
    $("#previousQuestionBtn").click(function () {
        if (questionsCounter > 1) {
            questionsCounter--;
            $("#questionArea").html(questions[questionsCounter - 1].question);
            $("#currentQuestion").html(questionsCounter);
        }
    });

    /**
     * Displays the modal when clicking on Rules
     */
    $("#ruleBtn").click(function () {
        rulesModal.css("display", "block");
    });

    $("#addBtn").click(function () {
        addModal.css("display", "block");
    });

    /**
     * Hides the modals when clicking on the x in the Modal or exit button at the bottom
     */
    $("#rules-modal-closer, #add-modal-closer, .rule-exit-button, .add-exit-button").click(
        function () {
            rulesModal.css("display", "none");
            addModal.css("display", "none");
        }
    );

    /**
     * Doesn't work but should close the modal if user click outside of rule modal
     * @param {event} event
     */
    window.onclick = function (event) {
        if (event.target == rulesModal) {
            rulesModal.css("display", "none");
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

    getQuestionsArray(); // Fetches the questions
    questionsCounter = 0; // initiates the questions counter to zero
    $("#currentQuestion").html(questionsCounter); // Set the initial visual element to the questions counter value
    rulesModal = $("#rules-modal-id"); // sets an element variable for the rules modal
    addModal = $("#add-modal-id"); // sets an element variable for the add modal
    $("#indexfooter").html(`Copyright &copy; ${new Date().getFullYear()} – Tomas Dahlander`); // set the current year in footer
});
