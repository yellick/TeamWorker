function main() {
    //console.log("main +")

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
    $("#input_email").on('keyup input', () => { activate_btn() });
    $("#input_pass").on('keyup input', () => { activate_btn() });

    // register user
    $("#signin_form").submit(function (e) {
        e.preventDefault();
        sign_in();
    });
};

function check_session() {
    if (getCookie('user') != undefined) {
        return true;
    } else {
        return false;
    }
}

function sign_in() {
    //console.log("sign_in +");
    
    show_preloader();

    let email = $('#input_email').val(),
        pass = $('#input_pass').val();
    
    $.ajax({
        type: "POST",
        url: "php/signin.php",
        datatype: 'json',
        data: {
            email: email,
            pass: pass
        },
        success: function (data) {

            const notif = new Notification();
            notif.settings['messages'] = [
                "",
                "Неправильная почта или пароль",
            ];

            data = JSON.parse(data);

            if (data.status) {
                window.location.href = "tasks/";
            } else {
                hide_preloader();
                notif.create(1)
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



/*
function testAuth(email, pass, expected_response) {
    $.ajax({
        type: "POST",
        url: "php/signin.php",
        datatype: 'json',
        data: {
            email: email,
            pass: pass
        },
        success: function (data) {

            data = JSON.parse(data);

            let test_data = "\n  email: " + email + "\n  pass: " + pass + "\n  response: " + data.status + "\n  expected response: " + expected_response + "\n";
            let style_data = "color: green; font-size: 14px;";

            if (data.status === expected_response) {
                console.log("%cSUCCESS",style_data , test_data);
            } else {
                console.log("%cERROR", style_data, test_data);
            }
        }
    });
}


let arrForTest = [
    {'email': "gubm04@mail.ru", "pass": "123", "exp_resp": true},
    {'email': "Gubm04@mail.ru", "pass": "123", "exp_resp": false},
    {'email': "gubm04@mail.ru", "pass": "12345", "exp_resp": false},
    {'email': "22201003@live.preco.ru", "pass": "123", "exp_resp": false},
    {'email': "22201003@live.preco.ru", "pass": "12345", "exp_resp": true},
    {'email': "22201003@Live.preco.ru", "pass": "12345", "exp_resp": false},
    {'email': "gubm04@yandex.ru", "pass": "123", "exp_resp": false},
    {'email': "Gubm04@yandex.ru", "pass": "123421", "exp_resp": false},
    {'email': "22201003@mail.ru", "pass": "12345", "exp_resp": false},
]

for (let i in arrForTest) {
    testAuth(arrForTest[i]['email'], arrForTest[i]['pass'], arrForTest[i]['exp_resp'])
}
*/