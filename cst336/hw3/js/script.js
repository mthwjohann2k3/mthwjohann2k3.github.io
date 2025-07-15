//event listeners
document.querySelector('#lookupBtn').addEventListener("click", function(event) {
    event.preventDefault();
    displayName();
})

//functions
//Displaying information of a name from Web API
async function displayName() {
    let name = document.querySelector('input[name="name"]').value;
    let errorDisplay = document.querySelector("#nameError");
    let body = document.body;
    if (name.length == 0) {
        errorDisplay.innerHTML = "Please enter a name.";
        errorDisplay.style.color = "red";
        body.style.background = ""; // Switch background color back to normal.
        document.querySelector("#gender").innerHTML = "";
        document.querySelector("#usage").innerHTML = "";
    } else {
        errorDisplay.innerHTML = "";
        let url = `https://www.behindthename.com/api/lookup.json?name=${name}&key=ma596770609`;
        let response = await fetch(url);
        let data = await response.json();
        if (data[0].gender == "m") {
            document.querySelector("#gender").innerHTML = "Masculine";
            body.style.background = "linear-gradient(to right, #1e3c72, #2a5298)"; // Cool gradient for masculine
        } else if (data[0].gender == "f") {
            document.querySelector("#gender").innerHTML = "Feminine";
            body.style.background = "linear-gradient(to right, #ffafbd, #ffc3a0)"; // Warm gradient for feminine
        } else {
            document.querySelector("#gender").innerHTML = "Masculine & Feminine";
            body.style.background = "linear-gradient(to right, #8360c3, #2ebf91)"; // Blend gradient for both
        }
        document.querySelector("#usage").innerHTML = "";
        for (let i = 0; i < data[0].usages.length; i++) {
            console.log(data[0].usages[i].usage_full);
            if (document.querySelector("#usage").innerHTML != "") {
                document.querySelector("#usage").innerHTML += ", "
            }
            document.querySelector("#usage").innerHTML += data[0].usages[i].usage_full;
        }
    }
}