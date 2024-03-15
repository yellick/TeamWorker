function main(){
    // создание списка команд, после создания прелоадер исчезает
    adding_teams();    

    // вкл/выкл мод окна пользователя
    $("#u_profile").on("click", () => { show_user_modal() });
    $("#fill").on("click", () => { show_user_modal() });

    // вкл мод окна для выхода
    $("#profile_exit").on("click", () => { $("#modal_exit").css('display', 'flex'); });

    // выкл мод окна для выхода
    $("#cansel_exit_btn").on("click", () => { 
        $("#modal_exit").css('display', 'none');
        // выкл мод окна пользователя
        show_user_modal();
    });

    // выход с аккаунта пользователя
    $("#exit_btn").on("click", () => signout_user() );
    
    // переход на страницу настроек
    $("#profile_settings").on("click", () => {
        show_preloader();
        window.location.href = "../profile/";
    });

    // создание команды
    $("#create_team_form").submit(function(e) {
        e.preventDefault();
        create_team();
    })
}

function log(a) {
    console.log(a);
    return;
}

/**
 * @param {str} data 
 * @param {bool} sort_status 
 * @returns {object} sorted/unsorted
 */
function change_data_to_JSON(data, sort_status) {
    // преобразование из строки в массив
    data = data.replace('[', '');
    data = data.replace(']', '');

    data = data.split(",\"xDW8Nzmf\",");
    data[data.length - 1] = data[data.length - 1].replace(',\"xDW8Nzmf\"', '');

    // преобразование эл массива в JSON
    for (let i in data) {
        data[i] = JSON.parse(data[i]);
    }

    // сортировка по необходимости
    if (sort_status) data.sort((a, b) => a.name > b.name ? 1 : -1);

    return data
}


function reloadPage(){ window.location.href = "./" }


// вывод списка команд
function adding_teams() {
    $.ajax({
        type: "POST",
        url: "php/get_teams.php",
        datatype: 'text',
        data: {
            u_id: USER_ID
        },
        success: function (data) {

            if (data != "[]") {
                
                data = (change_data_to_JSON(data, true));

                for (let i in data){
                    let team_id = data[i]['id'],
                        team_name = data[i]['name'],
                        team_count_users = data[i]['count_users'];                

                    // создание элементов'
                    $("#teams_list").append($('<div>', {
                        'id': 'team_id--' + team_id,
                        'class': 'team'
                    }));

                    $("#team_id--" + team_id).append($('<div>', { 'class': 'team_content' }));


                    $("#team_id--" + team_id).children(".team_content").append($('<div>', { 'class': 'team_name' }));
                    $("#team_id--" + team_id).find(".team_name").append($('<p>' + team_name + '</p>'));
                    
                    $("#team_id--" + team_id).children(".team_content").append($('<div>', { 'class': 'team_count' }));
                    $("#team_id--" + team_id).find(".team_count").append($('<p>' + team_count_users + ' участников' + '</p>'));
                }

            }

            hide_preloader();

            // открытие окон в секции команд
            $(".team").on("click", (el) => get_user_role(el["currentTarget"]) );
            $("#create_team_btn").on("click", () => show_create_team_window() );
        }
    })  
}


// выход с аккаунта
function signout_user() {
    
    show_preloader();

    $.ajax({
        type: "POST",
        url: "php/signout.php",
        data: NaN,
        success: function (data) {
            if (Boolean(data)) {
                window.location.href = "../";
            }
        }
    });
}


// открытие окна создания команды
function show_create_team_window() {
    // установка лимитов длины строки
    len_limit($("#team_name")['0'], 20);
    len_limit($("#description")['0'], 100);

    $("#current_team").css("display", "none");
    $("#no_team_selected_block").css("display", "none");
    $("#create_team").css("display", "block");
}

// закрытие окна создания команды
function hide_create_team_window() {
    $("#no_team_selected_block").css("display", "flex");
    $("#create_team").css("display", "none");
}


// запрос на создание команды
function create_team() {
    show_preloader();

    let name = $("#team_name").val(),
        description = $("#description").val(),
        author_id = USER_ID;

    $.ajax({
        type: "POST",
        url: "php/create_team.php",
        datatype: 'json',
        data: {
            name: name,
            description: description,
            author_id: author_id
        },
        success: function (data) {
            reloadPage();
        }
    })
}


// получение роли пользователя
function get_user_role(team) {
    show_preloader();

    $("#no_team_selected_block").css("display", "none");
    $("#create_team").css("display", "none");
    $("#current_team").css("display", "none");
    $(".team--settings_btn").remove();

    let team_id = team.getAttribute("id").split("--")[1];

    $.ajax({
        type: "POST",
        url: "php/get_user_role.php",
        data: {
            u_id: USER_ID,
            team_id: team_id
        },
        success: function (data) {
            data = Number(data);
            show_team_window(team_id, data);
        }
    });
}

// окно команды
function show_team_window(team_id, u_role) {
    
    // определение возможностей в зависимости от роли
    let show_change_btns = false,
        show_settings_btn = false;

    switch (u_role) {
        case 1:
            show_change_btns = true;
            break;
        case 2:
            show_change_btns = true;
            show_settings_btn = true;
            break;
    }

    
    // отчистка старой формы
    $("#participant_list").empty();

    
    // Вывод данных из БД
    add_team_info(team_id, show_settings_btn);
    add_partics(team_id, show_change_btns);


    // открытие модального окна
    $("#team--add_partic").on("click", () => {
        $("#modal_add_partic").css("display", "flex");
    })
    
    // кнопки в модальных окнах
    $("#modal_addP_btn").on("click", () => { append_p() })

    $("#modal_search_partic").submit(function(e) {
        e.preventDefault();
        search_user(team_id);
    })
}

function add_team_info(team_id, ssb) {
    // Запрос данных о команде
    $.ajax({
        type: "POST",
        url: "php/get_team_info.php",
        datatype: 'text',
        data: {
            team_id: team_id
        },
        success: function (data) {
            data = JSON.parse(data);
            
            $("#team--team_name").text(data.team_name);
            $("#team--team_descriprion").text(data.team_description);

            if (ssb) {
                $("#team--name_wrap").append($('<button>', {
                    'id': "team--settings_btn",
                    'class': "team--settings_btn"
                }));

                $("#team--settings_btn").append($('<i>', {
                    'class': "fa fa-cog",
                    "aria-hidden": "true"
                }));

                $("#team--settings_btn").on("click", () => {
                    log(123);
                })
                
                $(".modal_cansel_btn").on("click", () => {
                    $("#modal_team_settings").css("display", "none");
                })
            }
        }
    })
}

function add_partics(team_id, schb) {
    
    $.ajax({
        type: "POST",
        url: "php/get_team_compos.php",
        datatype: 'text',
        data: {
            team_id: team_id
        },
        success: function (data) {

            data = change_data_to_JSON(data, true);
            
            for (let i in data){
                let p_id = data[i]['id'],
                    p_name = data[i]['name'],
                    p_surname = data[i]['surname'],
                    p_role = data[i]['role'];

                let show_role = true;
                switch (p_role) {
                    case '0':
                        p_role = 'У';
                        break;
                    case '1':
                        p_role = 'М';
                        break;
                    case '2':
                        p_role = 'С';
                        break;
                    default:
                        console.error("Undefind role value for user id: " + p_id);
                        show_role = false;
                }
                
                // создание элементов'
                $("#participant_list").append($('<div>', {
                    'id': "participant--" + p_id,
                    'class': 'participant-list_el list_el'
                }));

                $("#participant--" + p_id).append($('<p>', {
                    'id': 'partic_name--' + i,
                    'class': 'partic_name'
                }));

                if (show_role) {
                    let attrStr = "  (<abbr title='Роли участников:\nУ - участник\nМ - модератор\nС - создатель'>" + p_role + "</abbr>)";
                    $('#partic_name--' + i).html(p_name + " " + p_surname + attrStr);
                } else {
                    $('#partic_name--' + i).html(p_name + " " + p_surname)
                }

                if (USER_ID != p_id) {

                    if (schb) {
                        $("#participant--" + p_id).append($('<button>', {
                            'id': "rem_p--" + p_id + "--" + team_id,
                            'class': 'rem_p',
                            'onclick': `rem_p(${p_id}, ${team_id})`
                        }));
    
                        $("#rem_p--" + p_id + "--" + team_id).text("Исключить")
                    }

                } else {

                    $("#participant--" + p_id).append($('<p>', {
                        'id': 'user_pointer',
                    }));
    
                    $("#user_pointer").text("(вы)")

                }

                // костыли
                // кнопка отмены в модальном окне
                $(".modal_cansel_btn").on("click", () => {
                    $("#modal_add_partic").css("display", "none");
                    $("#modal_rem_p").css("display", "none");
                    $("#modal_team_settings").css("display", "none");
                })
            }


            $("#current_team").css("display", "flex");

            hide_preloader();
        }
    })
}

// поиск пользователя
function search_user(team_id) {
    show_preloader();

    let partic = $("#partic_name");
    partic.text("")

    btn = $("#modal_addP_btn");

    $.ajax({
        type: "POST",
        url: "php/search_user.php",
        datatype: 'json',
        data: {
            u_id: $("#sought_user")[0].value,
            team_id: team_id
        },
        success: function (data) {
            data = JSON.parse(data);

            if (data.status) {

                partic.text(data.user_name);

                let new_val = team_id + '--' + data.user_id;
                
                btn.attr('class', 'modal_sub_btn');
                btn.removeAttr('disabled');
                btn.val(new_val);

                $("#addP_role_selector").css('display', 'block')

            } else {

                $("#addP_role_selector").css('display', 'none')
                switch (data.error_code) {
                    case 1: 
                        partic.text("Такого человека нет");
                        break;
                    case 2:
                        partic.text("Этот человек уже в команде");
                        break;
                }

                $("#modal_addP_btn").attr('class', 'modal_sub_btn--inactive');
                btn.attr('disabled', true);
                btn.removeAttr('value');
            }

            hide_preloader();
        }
    });
}

// добавление участника
function append_p(){
    show_preloader();

    let data_str = $("#modal_addP_btn")[0].value.split('--'),
        team_id = data_str[0],
        u_id = data_str[1],
        u_role = $("#addP_role_selector")[0].value;
        
    
    $.ajax({
        type: "POST",
        url: "php/add_partic.php",
        datatype: 'json',
        data: {
            u_id: u_id,
            team_id: team_id,
            role: u_role
        },
        success: function (data) {
            if (Boolean(data)) {
                reloadPage()
            }
        }
    });
}

// удаление участника
function rem_p(u_id, team_id) {
    $("#modal_rem_p").css("display", "flex");

    $("#rem_partic_btn").on("click", () => {
        show_preloader();

        $.ajax({
            type: "POST",
            url: "php/rem_p.php",
            data: {
                u_id: u_id,
                team_id: team_id
            },
            success: function (data) {
                if (Boolean(data)) {
                    reloadPage()
                }
            }
        });
    })
    
    return;
}


// модальное окно профиля
function show_user_modal() {
    let modal = $("#u_profile_modal");
    let fill = $("#fill");
    
    if ( !(modal.hasClass("u_profile_modal--active")) ) {
        
        fill.css("display","block");
        
        modal.css("display","flex");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
    } else {
        
        fill.css("display","none");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
        modal.css("display","none");
        
    };
}


const USER_ID = getCookie("user");

$(document).ready(main());