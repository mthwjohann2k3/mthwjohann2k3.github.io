//event listeners
document.querySelector("#zip").addEventListener("change",displayCity);
document.querySelector("#state").addEventListener("change",displayCounties);
document.querySelector("#username").addEventListener("change",checkUsername);
document.querySelector("#signupForm").addEventListener("submit", function(event) {
    validateForm(event);
})
document.querySelector("#password").addEventListener("click",suggestPwd);
displayAllStates();

//functions
//Displaying all states from Web API
async function displayAllStates() {
    let response = await fetch("https://csumb.space/api/allStatesAPI.php");
    let data = await response.json();
    let stateDropdown = document.querySelector("#state");
    for (let i of data) {
        let option = document.createElement("option");
        option.value = i.usps;
        option.innerText = i.state;
        stateDropdown.append(option);
    }
}

//Displaying city from Web API after entering a zip code
async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();
    let cityDisplay = document.querySelector("#city");
    let errorDisplay = document.querySelector("#zipError");
    let latitudeDisplay = document.querySelector("#latitude");
    let longitudeDisplay = document.querySelector("#longitude");
    if (data.city) {
        cityDisplay.innerHTML = data.city;
        latitudeDisplay.innerHTML = data.latitude;
        longitudeDisplay.innerHTML = data.longitude;
        errorDisplay.innerHTML = ""; // Clear previous error
    } else {
        cityDisplay.innerHTML = "";
        latitudeDisplay.innerHTML = "";
        longitudeDisplay.innerHTML = "";
        errorDisplay.innerHTML = "Zip code not found.";
        errorDisplay.style.color = "red";
    }
}

//Displaying counties from Web API based on the two-letter abbreviation of a state
async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = `https://csumb.space/api/countyListAPI.php?state=${state}`;
    let response = await fetch(url);
    let data = await response.json();
    let countyList = document.querySelector("#county");
    countyList.innerHTML = "<option> Select County </option>"
    for (let i=0; i < data.length; i++) {
        countyList.innerHTML += `<option> ${data[i].county} </option>`;
    }
}

// checking whether the username is available
async function checkUsername() {
    let username = document.querySelector("#username").value;
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();
    let usernameError = document.querySelector("#usernameError");
    if (data.available) {
        usernameError.innerHTML = " Username available!";
        usernameError.style.color = "green";
    }
    else {
        usernameError.innerHTML = " Username taken";
        usernameError.style.color = "red";
    }
}

//Validating form data
function validateForm(e){
    let isValid = true;
    let fName = document.querySelector('input[name="fName"]').value;
    let lName = document.querySelector('input[name="lName"]').value;
    let genderSelected = document.querySelector('input[name="gender"]:checked');
    let zipCode = document.querySelector("#zip").value;
    let state = document.querySelector("#state").value;
    let county = document.querySelector("#county").value;
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let retypePassword = document.querySelector("#retypePassword").value;
    if (fName.length == 0) {
        document.querySelector("#fnameError").innerHTML = "Please enter a first name!";
        document.querySelector("#fnameError").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#fnameError").innerHTML = "";
    }
    if (lName.length == 0) {
        document.querySelector("#lnameError").innerHTML = "Please enter a last name!";
        document.querySelector("#lnameError").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#lnameError").innerHTML = "";
    }
    if (genderSelected) {
        document.getElementById("genderError").innerHTML = "";
    } else {
        document.getElementById("genderError").innerHTML = "Please select your gender!";
        document.getElementById("genderError").style.color = "red";
        isValid = false;
    }
    if (zipCode.length == 0) {
        document.getElementById("zipError").innerHTML = "Please enter a zip code!";
        document.getElementById("zipError").style.color = "red";
        isValid = false;
    }
    if (document.getElementById("zipError").textContent != "") {
        isValid = false;
    }
    if (state == "Select One") {
        document.querySelector("#stateError").innerHTML = "Please select a state!";
        document.querySelector("#stateError").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#stateError").innerHTML = "";
    }
    if (county == "Select County") {
        document.querySelector("#countyError").innerHTML = "Please select a county!";
        document.querySelector("#countyError").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#countyError").innerHTML = "";
    }
    if (username.length == 0) {
        document.querySelector("#usernameError").innerHTML = "Username required!";
        document.querySelector("#usernameError").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#usernameError").innerHTML = "";
    }
    if (password.length < 6) {
        document.querySelector("#suggestedPwd").innerHTML = "Password must have at least 6 characters!";
        document.querySelector("#suggestedPwd").style.color = "red";
        isValid = false;
    } else {
        document.querySelector("#suggestedPwd").innerHTML = "";
    }
    if (password == retypePassword) {
        document.querySelector("#passwordError").innerHTML = "";
    } else {
        document.querySelector("#passwordError").innerHTML = "Passwords must match!";
        document.querySelector("#passwordError").style.color = "red";
        isValid = false;
    }
    if (!isValid) {
        e.preventDefault();
    }
}

//Suggest passwords
async function suggestPwd() {
    let response = await fetch("https://csumb.space/api/suggestedPassword.php?length=8");
    let data = await response.json();
    document.querySelector("#suggestedPwd").innerText =
    "Suggested password: " + data.password;
    document.querySelector("#suggestedPwd").style.color = "black";
}