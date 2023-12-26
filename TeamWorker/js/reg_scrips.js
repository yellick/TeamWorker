function main(){
    // remove preloader
    // remove preloader
    hide_preloader()

    // trying to change btn status after each change form
    $("#input_email").on('keyup input', () => {
        activate_btn()
    });
    $("#input_pass").on('keyup input', () => {
        activate_btn()
    });
    
    // trying to change btn status after each change form
    $("#input_name").on('keyup input', () => { activate_btn() });
    $("#input_surname").on('keyup input', () => { activate_btn() });
    $("#input_email").on('keyup input', () => { activate_btn() });
    $("#input_pass").on('keyup input', () => { activate_btn() });
    $("#input_pass_rep").on('keyup input', () => { activate_btn() });
};

function hide_preloader() {
    //console.log("hide_preloader +")
    
    let prel = $("#preloader");

    prel.css("opacity", "0");

    setTimeout(
        () => {
            prel.remove();
        },
        300
    );
}

function activate_btn() {
    //console.log("activate_btn +")

    if (set_ready() == true) {
        $("#submit_btn_inactive").attr("id", "submit_btn");
    } else {
        try {
            $("#submit_btn").attr("id", "submit_btn_inactive");
        } catch (err) {
            return null;
        }
    }
};

function set_ready() {
    //console.log("set_ready() +")
    
    let inputs = document.getElementsByClassName("input");
    let counter = 0;

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            //console.log("set_ready() return FALSE")
            
            return false;
        }
    }
    
    //console.log("set_ready() return TRUE")
    
    return true;
}

$(document).ready(main());