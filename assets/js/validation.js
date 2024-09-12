const nam = document.getElementById("inpname");
const ema = document.getElementById("inpemail");
const proj = document.getElementById("inpproject");
const msg = document.getElementById("inpmsg");
const but = document.getElementById("sub-btn");

const n1 = document.getElementById("n1");
const n2 = document.getElementById("n2");
const n3 = document.getElementById("n3");
const n4 = document.getElementById("n4");



const errorname = document.getElementById("errorname");
const errorname1 = document.getElementById("errorname1");
const errorname2 = document.getElementById("errorname2");
const errorname3 = document.getElementById("errorname3");


but.addEventListener("click", function rep(e) {
    e.preventDefault();
    validi();
});

function validi() {
    const nameregex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
    const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = true;

    if (proj.value.length < 5 || proj.value.length == "" ) {
        n3.style.border = "solid 2px red";
        isValid = false;
       errorname2.innerHTML = '*please enter your project'
        
    } else {
        n3.style.border = "solid 2px blue";
        errorname2.remove();
    }

    if (!emailregex.test(ema.value)) {
        n2.style.border = "solid 2px red";
        isValid = false;
        errorname1.innerHTML = '*please enter your valid email'
        // alert('please fill the form'); 
        // alert box
    } else {
        n2.style.border = "solid 2px blue";
        errorname1.remove()
    }

    if (!nameregex.test(nam.value)) {
        n1.style.border = "solid 2px red";
        isValid = false;
        errorname.innerHTML = '*please enter your name'
         
         
    } else {
        n1.style.border = "solid 2px blue";
        errorname.remove();
    }

    if (msg.value.length < 10) {
        n4.style.border = "solid 2px red";
        isValid = false;
        errorname3.innerHTML = '*please enter the message'
    } else {
        n4.style.border = "solid 2px blue";
        errorname3.remove();
    }

    // Load submit.js if validation is successful
    if (isValid) {
        const form = document.getElementById("form");
        const result = document.getElementById("result");

        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait...";

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: json,
        })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    result.innerHTML = "Form submitted successfully";
                    alert('FORM SUBMITTION COMPLETED SUCCESFULLY') 
                    location.reload();
                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                }
            })
            .catch((error) => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
            })
            .then(function () {
                form.reset();
                setTimeout(() => {
                    result.innerText = "Send Message";
                }, 3000);
            });
    }
}
