//Event Listeners
document.querySelector("button").addEventListener("click", gradeQuiz);

//Global variables
var score = 0;
var attempts = localStorage.getItem("total_attempts");

displayQ4Choices();
displayQ9Choices();

//Functions
function displayQ4Choices(){
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    q4ChoicesArray = _.shuffle(q4ChoicesArray);
    for (let i=0; i < q4ChoicesArray.length; i++) {
        document.querySelector("#q4Choices").innerHTML += ` <input type="radio" name="q4" id= "${q4ChoicesArray[i]}"
        value="${q4ChoicesArray[i]}"> <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label>`;
    }
}//displayQ4Choices

function displayQ9Choices(){
    let q9ChoicesArray = ["Houston", "Austin", "Dallas", "San Antonio"];
    q9ChoicesArray = _.shuffle(q9ChoicesArray);
    for (let i=0; i < q9ChoicesArray.length; i++) {
        document.querySelector("#q9Choices").innerHTML += ` <input type="radio" name="q9" id= "${q9ChoicesArray[i]}"
        value="${q9ChoicesArray[i]}"> <label for="${q9ChoicesArray[i]}"> ${q9ChoicesArray[i]}</label>`;
    }
}//displayQ9Choices

function isFormValid(){
    let isValid= true;
    let validationMessages = [];
    if(document.querySelector("#q1").value == ""){
        isValid = false;
        validationMessages.push("Question 1 was not answered");
    }
    if(document.querySelector("#q2").value == ""){
        isValid = false;
        validationMessages.push("Question 2 was not answered");
    }
    if(!document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked &&
        !document.querySelector("#Jefferson").checked && !document.querySelector("#Roosevelt").checked) {
        isValid = false;
        validationMessages.push("Question 3 was not answered");
    }
    if(!document.querySelector("input[name=q4]:checked")){
        isValid = false;
        validationMessages.push("Question 4 was not answered");
    }
    if(document.querySelector("#q5").value == ""){
        isValid = false;
        validationMessages.push("Question 5 was not answered");
    }
    if(document.querySelector("#q6").value == ""){
        isValid = false;
        validationMessages.push("Question 6 was not answered");
    }
    if(!document.querySelector("#ut").checked && !document.querySelector("#az").checked &&
        !document.querySelector("#co").checked && !document.querySelector("#nm").checked &&
        !document.querySelector("#nv").checked) {
        isValid = false;
        validationMessages.push("Question 7 was not answered");
    }
    if(document.querySelector("#q8").value == ""){
        isValid = false;
        validationMessages.push("Question 8 was not answered");
    }
    if(!document.querySelector("input[name=q9]:checked")){
        isValid = false;
        validationMessages.push("Question 9 was not answered");
    }
    if(document.querySelector("#q10").value == ""){
        isValid = false;
        validationMessages.push("Question 10 was not answered");
    }
    document.querySelector("#validationFdbk").innerHTML = validationMessages.join("<br>");
    return isValid;
}//isFormValid

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML   = "<img src='img/checkmark.png'>"
    score += 10;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-danger text-white";
    document.querySelector(`#markImg${index}`).innerHTML   = "<img src='img/xmark.png' alt='xmark'>";
}

function gradeQuiz(){
    document.querySelector("#validationFdbk").innerHTML = ""; //resets validation feedback
    if (!isFormValid()) {
        return;
    }

    //variables
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q4Response = document.querySelector("input[name=q4]:checked").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q8Response = document.querySelector("#q8").value.toLowerCase();
    let q9Response = document.querySelector("input[name=q9]:checked").value;
    let q10Response = document.querySelector("#q10").value;

    //Grading question 1
    if (q1Response == "sacramento") {
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }
    //Grading question 2
    if (q2Response == "mo") {
        rightAnswer(2);
    }
    else {
        wrongAnswer(2);
    }
    //Grading question 3
    if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    }
    else {
        wrongAnswer(3);
    }
    //Grading question 4
    if (q4Response == "Rhode Island") {
        rightAnswer(4);
    }
    else {
        wrongAnswer(4);
    }
    //Grading question 5
    if (q5Response == 5) {
        rightAnswer(5);
    }
    else {
        wrongAnswer(5);
    }
    //Grading question 6
    if (q6Response == "gu") {
        rightAnswer(6);
    }
    else {
        wrongAnswer(6);
    }
    //Grading question 7
    if (document.querySelector("#ut").checked && document.querySelector("#az").checked &&
        document.querySelector("#co").checked && document.querySelector("#nm").checked &&
        !document.querySelector("#nv").checked) {
        rightAnswer(7);
    }
    else {
        wrongAnswer(7);
    }
    //Grading question 8
    if (q8Response == "kansas") {
        rightAnswer(8);
    }
    else {
        wrongAnswer(8);
    }
    //Grading question 9
    if (q9Response == "Austin") {
        rightAnswer(9);
    }
    else {
        wrongAnswer(9);
    }
    //Grading question 10
    if (q10Response == "ak") {
        rightAnswer(10);
    }
    else {
        wrongAnswer(10);
    }
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
    document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
    if (score > 80) {
        document.querySelector("#congratsMessage").innerHTML = `Congratulations!`;
    }
    localStorage.setItem("total_attempts", attempts);

}//gradeQuiz