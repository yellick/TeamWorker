function main(){
    //console.log("main +")

    // remove preloader
    hide_preloader()
    
    // trying to change btn status after each change form
    $("#input_name").on('keyup input', () => { activate_btn() });
    $("#input_surname").on('keyup input', () => { activate_btn() });
    $("#input_email").on('keyup input', () => { activate_btn() });
    $("#input_pass").on('keyup input', () => { activate_btn() });
    $("#input_pass_rep").on('keyup input', () => { activate_btn() });

    // register user
    $("#reg_form").submit(function (e) {
        e.preventDefault();
        reg_user();
     });
};

function reg_user() {
    //console.log("reg_user +");

    let form = $("#reg_form");
    $.ajax({
        type: "POST",
        url: "php/reg.php",
        data: form,
        success: function () {
            alert("Вы зарегестрироввлись!");
            window.location.href="index.html"
        }
    });    
}

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
        let btn = $(".submit_btn--inactive");
        btn.attr("class", "submit_btn");
        btn.attr('disabled',false);
    } else {
        try {
            let btn = $(".submit_btn");
            btn.attr("class", "submit_btn--inactive");
            btn.attr('disabled',true);
        } catch (err) {
            return null;
        }
    }
};

function set_ready() {
    //console.log("set_ready() +")
    
    let inputs = document.getElementsByClassName("input");

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