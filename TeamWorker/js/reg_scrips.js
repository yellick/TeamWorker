function main(){
    // remove preloader
    setTimeout(
        () => {
            document.getElementById("preloader").style.opacity = "0";

            setTimeout(
                () => {
                    document.getElementById("preloader").remove();
                },
                300
            );
        },
        1500
    );
    
    // all input
    let input_name = document.getElementById("input_name");
    let input_surname = document.getElementById("input_surname");
    let input_email = document.getElementById("input_email");
    let input_pass = document.getElementById("input_pass");
    let input_pass_rep = document.getElementById("input_pass_rep");
    
    // trying to change btn status after each change form
    input_name.oninput = function() { activate_btn() };
    input_surname.oninput = function() { activate_btn() };
    input_email.oninput = function() { activate_btn() };
    input_pass.oninput = function() { activate_btn() };
    input_pass_rep.oninput = function() { activate_btn() };
};

function activate_btn(){
    
    if (set_ready() == true && check_pass() == true){
        document.getElementById("submit_btn_inactive").id="submit_btn";
    } else {
        try {
            document.getElementById("submit_btn").id="submit_btn_inactive";
        } catch (err) {
            return null;
        }
    }
};

function check_pass(){
    let pass = document.getElementById("input_pass");
    let pass_rep = document.getElementById("input_pass_rep");
    
    if (pass.value == pass_rep.value){
        document.getElementById('incorrect_pass').style.display = "none";
        
        return true;
        
    } else {
        document.getElementById('incorrect_pass').style.display = "block";
        return false;
    }
}

function set_ready(){
    let inputs = document.getElementsByClassName("input");
    let counter = 0;
    
    
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == ""){
            return false;
        }
    }
    
    return true;
}

document.addEventListener("DOMContentLoaded", main());