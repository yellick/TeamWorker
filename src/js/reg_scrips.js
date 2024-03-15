function main(){
    //console.log("main +")

    len_limit($('#input_surname')[0], 100);
    len_limit($('#input_name')[0], 100);
    len_limit($('#input_email')[0], 100);
    
    // check session
    if (!check_session()) {
        // remove preloader
        hide_preloader();
    } else {
        // link to workplase if session TRUE
        window.location.href = "tasks/";
    }
    
    // trying to change btn status after each change form
    $("#input_name").on('input', () => { activate_btn() });
    $("#input_surname").on('input', () => { activate_btn() });
    $("#input_email").on('input', () => { activate_btn() });
    $("#input_pass").on('input', () => { activate_btn() });
    $("#input_pass_rep").on('input', () => { activate_btn() });

    // register user
    $("#reg_form").submit(function (e) {
        e.preventDefault();

        if (check_pass()){
            reg_user();
        }
    });
};

function check_session() {
    if (getCookie('user') != undefined) {
        return true;
    } else {
        return false;
    }
}

function confirm_email(input){
    console.log("confirm_email +")
    
    $("#modal_wrap").css("display", "flex");
    $("#email").text($('#input_email').val());
    
    input.on('input', () => { 
        if (input.val().length == 8) {
            
            let btn = $("#sub_confirm_form");
            btn.attr("class", "sub_conf_btn");
            btn.attr('disabled',false);
            
        } else {
            
            let btn = $("#sub_confirm_form");
            btn.attr("class", "submit_conf_btn--inactive");
            btn.attr('disabled',true);
            
        }
    });
}

function reg_user() {
    //console.log("reg_user +");
    
    show_preloader();

    let name = $('#input_name').val(),
        surname = $('#input_surname').val(),
        email = $('#input_email').val(),
        pass = $('#input_pass').val();

    $.ajax({
        type: "POST",
        url: "php/reg.php",
        datatype: 'json',
        data: {
            name: name,
            surname: surname,
            email: email,
            pass: pass,
        },
        success: function (data) {
            
            hide_preloader();

            const notif = new Notification();
            notif.settings['messages'] = [
                "Регистрация прошла успешно\nОсталось авторизироваться",
                "Пользователь с такой почтой уже существует",
                "Ошибка регистрации, попробуйте позже",
                "Неизвестная ошибка"
            ];

            data = JSON.parse(data);
            
            if (data.status) {
                
                notif.create(0);
                //window.location.href = "index.html";

            } else {
                notif.create(data.error_type);
            }


            notif.show();
        }
    });    
}

function activate_btn() {
    //console.log("activate_btn +")

    
    if (set_ready()) {
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

function check_pass(){
    console.log("check_pass +")

    let pass = $("#input_pass"),
        pass_rep = $("#input_pass_rep");
    
    
    if (pass.val() == pass_rep.val()){
        document.getElementById('incorrect_pass').style.display = "none";
        return true;
    } else {
        document.getElementById('incorrect_pass').style.display = "block";
        return false;
    }
}

function set_ready() {
    //console.log("set_ready() +")
    
    let inputs = document.getElementsByClassName("input");

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value == "") {
            //console.log("set_ready() return FALSE");
            return false;
        }
    }
    
    //console.log("set_ready() return TRUE");
    
    return true;
}

$(document).ready(main());