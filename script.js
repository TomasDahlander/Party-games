// Global variables ********************************************************************************************************

let questions;

let questionsCounter;

// Element variables

let rulesModal;
let addModal;
let messageModal;

let questionInputArea;
let messageBoard;

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
     * Listener that displays the rules modal when clicking on rules
     */
    $("#ruleBtn").click(function () {
        rulesModal.css("display", "block");
    });

    /**
     * Listener that displays the add modal when clicking on send in question
     */
    $("#addBtn").click(function () {
        addModal.css("display", "block");
    });

    /**
     * Listener that hides the modals when clicking on the x in the Modal or exit button at the bottom
     */
    $(
        "#rules-modal-closer, #add-modal-closer, #message-modal-closer, .rule-exit-button, .add-exit-button"
    ).click(function () {
        rulesModal.css("display", "none");
        addModal.css("display", "none");
        messageModal.css("display", "none");
    });

    /**
     * Listener for when clicking on send question button and which checks the length of the
     * question and then either alerts error or send question to database
     */
    $("#sendBtn").click(function () {
        let input = questionInputArea.val();
        if (input.length >= 10) {
            input = htmlFormatter(input);
            questionInputArea.val("");
            addModal.css("display", "none");
            sendQuestion(input);
        } else {
            alert("Fr??gan m??ste vara minst 10 tecken l??ng!");
        }
    });

    // Functions ***********************************************************************************************************

    /**
     * Function that replaces newline /n with <br> to show questions as they are written
     * @param {String} s
     * @returns
     */
    function htmlFormatter(s) {
        return s.replace(/(\r\n|\r|\n)/g, "<br>");
    }

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
     * Tries to fetch questions array from database
     */
    function getQuestionsArrayFromDatabase() {
        fetch("https://td-partygames-backend.herokuapp.com/question/get")
            .then((resp) => resp.json())
            .then(function (data) {
                setQuestions(data);
            })
            .catch(() => getQuestionsArrayFromJsonFile());
    }

    /**
     * Fetches the questions array from a JSON file if the database could not deliver
     */
    function getQuestionsArrayFromJsonFile() {
        alert(
            "Databasen verkar liggar nere s?? vi f??r n??ja oss med dom fr??gor som finns sparat i front-enden."
        );
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
        displayThatGameIsReady();
    }

    function displayThatGameIsReady() {
        $("#questionArea").html("Nu kan spelet b??rja!");
        $("#loader").remove();
    }

    /**
     * Sends a users input to the database
     * @param {String} input
     */
    function sendQuestion(input) {
        let question = {
            question: input,
        };

        fetch("https://td-partygames-backend.herokuapp.com/question/add", {
            method: "POST",
            body: JSON.stringify(question),
            headers: {
                "Content-type": "application/json",
            },
        })
            .then(function (response) {
                if (response.status == 200) {
                    return response.json();
                } else {
                    return "error";
                }
            })
            .then(function (data) {
                if (data == "error") {
                    displayErrorMessage();
                } else {
                    displaySuccessMessage(data);
                }
            });
    }

    function displaySuccessMessage(message) {
        messageBoard.html(message.question);
        messageModal.css("display", "block");
    }

    function displayErrorMessage() {
        alert("Hoppsan, n??got gick fel med servern...");
    }

    // Runs when loaded ****************************************************************************************************

    getQuestionsArrayFromDatabase(); // Fetches the questions
    questionsCounter = 0; // initiates the questions counter to zero
    $("#currentQuestion").html(questionsCounter); // Set the initial visual element to the questions counter value
    rulesModal = $("#rules-modal-id"); // sets an element variable for the rules modal
    addModal = $("#add-modal-id"); // sets an element variable for the add modal
    messageModal = $("#message-modal-id"); // sets an element variable for the message modal
    questionInputArea = $("#questionInputArea"); // set an element variable for the question textarea input
    messageBoard = $("#messageBoard"); // set an element variable for the message when sending in a question
    $("#indexfooter").html(`Copyright &copy; ${new Date().getFullYear()} ??? Tomas Dahlander`); // set the current year in footer
});
