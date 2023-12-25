function main() {
    // remove preloader
    hide_preloader()

    // all input
    let input_email = document.getElementById("input_email");
    let input_pass = document.getElementById("input_pass");

    // trying to change btn status after each change form
    input_email.oninput = function () {
        activate_btn()
    };
    input_pass.oninput = function () {
        activate_btn()
    };
};


function hide_preloader() {
    let prel = document.getElementById("preloader");
    
    setTimeout(
        () => {
            prel.style.opacity = "0";

            setTimeout(
                () => {
                    prel.remove();
                },
                300
            );
        },
        1500
    );
}


function activate_btn() {

    if (set_ready() == true) {
        document.getElementById("submit_btn_inactive").id = "submit_btn";
    } else {
        try {
            document.getElementById("submit_btn").id = "submit_btn_inactive";
        } catch (err) {
            return null;
        }
    }
};

function set_ready() {
    let inputs = document.getElementsByClassName("input");
    let counter = 0;


    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            return false;
        }
    }

    return true;
}

document.addEventListener("DOMContentLoaded", main());