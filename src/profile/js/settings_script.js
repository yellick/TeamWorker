function main(){
    let USER_ID = getCookie('user');
    hide_preloader();

    // сохранение изменений аккаунта
    $("#save_changes_btn").on("click", function (e) {
        e.preventDefault();

        show_preloader();
        change_user(USER_ID);
    });

    // изменение пароля
    $("#change_pass_btn").on("click", function (e) {
        e.preventDefault();

        change_pass(USER_ID);
    });

    // открытие окна удаления пользователя
    $("#delete_profile_btn").on("click", function (e) {
        e.preventDefault();
        show_check_pass_window(USER_ID);
    });

    // закрытие окна удаления пользователя
    $(".modal_cansel_btn").on("click", () => {
        $("#modal_delete_user").css("display", "none");
        $("#check_pass_form").css("display", "none");
        $("#rem_user_form").css("display", "none");
    });
}

function change_user(USER_ID) {
	
	let name = $("input[name='name']").val(),
		surname = $("input[name='surname']").val(),
		email = $("input[name='email']").val();

    
	$.ajax({
        type: "POST",
        url: "php/change_user.php",
        datatype: 'json',
        data: {
        	id: USER_ID,
            name: name,
            surname: surname,
            email: email,
        },
        success: function (data) {

            const notif = new Notification();
            notif.settings['messages'] = [
                "Изменения сохранены",
                "Пользователь с такой почтой уже существует",
                "Неизвестная ошибка"
            ];

        	data = JSON.parse(data);
        	
        	if (data.status) {
        		notif.create(0);
                notif.show();
        	} else {
        		switch (data.error_type) {
        			case 1:
        				notif.create(1);
        				break;
        			default:
                        notif.create(2);
        		}
        	}

            notif.show();
            hide_preloader();
        }
    });
}

function change_pass(USER_ID) {
    let old_pass = $("#old_pass")[0].value,
        new_pass = $("#new_pass")[0].value,
        new_pass_rep = $("#new_pass_rep")[0].value;
    

    const notif = new Notification();
    notif.settings['messages'] = [
        "0",
        "Не все поля заполненны",
        "Пароли не совпадают"
    ];

    if (old_pass == '' || new_pass == '' || new_pass_rep == '') {
        notif.create(1);
        notif.show();
        return;
    }

    if (!check_pass_comparison(new_pass, new_pass_rep)) {
        notif.create(2);
        notif.show();
        return;
    } else {
        show_preloader();
    }


    $.ajax({
        type: "POST",
        url: "php/change_pass.php",
        datatype: 'json',
        data: {
        	id: USER_ID,
            pass: old_pass,
            new_pass: new_pass
        },
        success: function (data) {

            const notif = new Notification();
            notif.settings['messages'] = [
                "Изменения сохранены",
                "Неверный пароль",
                "Пароль не сохранился",
                "Неизвестная ошибка"
            ];

            console.log(notif.settings['messages'].length)

            data = JSON.parse(data);
        	
        	if (data.status) {
        		notif.create(0);

                $("#old_pass")[0].value = '';
                $("#new_pass")[0].value = '';
                $("#new_pass_rep")[0].value = '';
        	} else {
        		notif.create(data.error_type);
        	}

            notif.show();
            hide_preloader();
        }
    });
}

function check_pass_comparison(np, npr) {
    if (np != npr) {
        return false;
    } else {
        return true;
    }
}

function show_check_pass_window(USER_ID) {
    $("#modal_delete_user").css("display", "flex");
    $("#check_pass_form").css("display", "flex");

    $("#check_pass_btn").on("click", () => {
        show_preloader();

        $.ajax({
            type: "POST",
            url: "php/check_pass.php",
            datatype: 'json',
            data: {
                id: USER_ID,
                pass: $("#rem_u_pass")[0].value
            },
            success: function (data) {
                
                const notif = new Notification();
                notif.settings['messages'] = [
                    "0",
                    "Неверный пароль",
                    "Неизвестная ошибка"
                ];
    

                data = JSON.parse(data);

                if (data.status) {
                    show_rem_user_window(USER_ID);
                } else {
                    switch (data.error_type) {
                        case 1:
                            notif.create(1);
                            break;
                        default:
                            notif.create(2);
                    }
                }
    
                notif.show();
                hide_preloader();
            }
        });
    })
}

function show_rem_user_window(USER_ID) {
    $("#check_pass_form").css("display", "none");
    $("#rem_user_form").css("display", "flex");
    
    $("#modal_remove_account_btn").on('click', () => {
        show_preloader();
        
        $.ajax({
            type: "POST",
            url: "php/remove_account.php",
            datatype: 'json',
            data: {
                id: USER_ID
            },
            success: function (data) {
                if (Boolean(data)) {
                    window.location.href = "../";
                }
            }
        });
    })
}

$(document).ready(main());