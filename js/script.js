"use strict";

//DOM:
const navScrollPadding = document.querySelector(".custom-nav-scroll").offsetHeight;
//Form Variables:
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const phnNum = document.getElementById("phnNo");
const address = document.getElementById("address");
const address2 = document.getElementById("address2");
const country = document.getElementById("country");
const state = document.getElementById("state");
const pincode = document.getElementById("zip");
const height = document.getElementById("height");
const weight = document.getElementById("weight");
const dietPlan = document.getElementById("diet-plan-dropdown");
const isDoctorService = document.getElementById("services-doctor-checkbox");
const isLabService = document.getElementById("services-laboratory-checkbox");
const message = document.getElementById("message-textarea");
const formProgressBar = document.getElementById("form-progress-bar");
const successFormAlert = document.getElementById('success-form-alert');

//Mail Variables (SMTP -> app.elasticeail.com):
const OFFICIAL_MAIL = "shriharshahealthcare@gmail.com";//=== UserName 
const OFFICIAL_LAB_MAIL = "shriharshalab@gmail.com";
const SUBJECT = "Regarding ShriHarsha Healthcare Connect";
const HOST = "smtp.elasticemail.com";
const PASSWORD = "88FD3DA5E7D6ABAAC4EA00E140FDAE468513";

3
console.log(navScrollPadding);

document.documentElement.style.setProperty("--scroll-padding", navScrollPadding - 1 + "px");

//Form Validation:
var forms = document.getElementsByClassName('needs-validation');

Array.prototype.forEach.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.checkValidity() || !isNumeric(phnNum.value)) {
            event.stopPropagation();
            form.classList.add('was-validated');
        } else {
            form.classList.remove('was-validated');
            formProgressBar.classList.remove("hidden");
            successFormAlert.classList.add("hidden");
            sendEmail(form);
        }
    });
});

function sendEmail(form) {
    let toEmailAddress = OFFICIAL_MAIL; // Mail sent to
    // Mail address logic:
    if (isLabService.checked) {
        toEmailAddress += `,${OFFICIAL_LAB_MAIL}`;
    }

    const body =
        `
        Full Name : ${firstName.value} ${lastName.value}<br>
        Email : ${email.value}<br>
        Phone Number : ${phnNum.value}<br>
        Address : ${address.value} | ${address2.value}<br>
        Country : ${country.value}<br>
        State : ${state.value}<br>
        Pincode : ${pincode.value}<br>
        Height : ${height.value}<br>
        Weight : ${weight.value}<br>
        Selected Diet Plan : ${dietPlan.value}<br>
        Doctor Service : ${isDoctorService.checked}<br>
        Laboratory Service : ${isLabService.checked}<br>
        Message : ${message.value}<br>
        `;

    //Sending mail:
    Email.send({
        Host: HOST,
        Username: OFFICIAL_MAIL,
        Password: PASSWORD,
        To: toEmailAddress,
        From: OFFICIAL_MAIL,
        Subject: SUBJECT,
        Body: body
    }).then(function (message) {
        if (message === "OK") {
            // Show success alert if form is valid and submit it (generate email)
            successFormAlert.classList.remove('hidden');
            formProgressBar.classList.add("hidden");
        } else {
            // Show error message
            console.error(message);
            alert(message);
        }
    }).catch(function (error) {
        // Show error message
        console.error(error);
        alert("An error occurred while sending the email.");
    });
}

//UTILITIES:
function isNumeric(input) {
    // Regular expression to match only numbers
    var regex = /^[0-9]+$/;
    return regex.test(input);
}
