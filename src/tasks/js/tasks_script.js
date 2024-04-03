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


    
    $(".modal_cansel_btn").on("click", () => {
        $("#modal_add_partic").css("display", "none");
        $("#modal_rem_p").css("display", "none");
        $("#modal_team_settings").css("display", "none");
        $("#modal_change_task").css("display", "none");
    })
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
            $(".team").on("click", (el) => get_user_role(el["currentTarget"].getAttribute("id").split("--")[1]) );
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
function get_user_role(team_id) {
    show_preloader();

    $("#no_team_selected_block").css("display", "none");
    $("#create_team").css("display", "none");
    $("#current_team").css("display", "none");
    $(".team--settings_btn").remove();

    
    $("#no_task_selected_block").css("display", 'flex');
    $("#current_task").css("display", 'none');
    $("#create_task").css("display", 'none');

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
    $("#tasks-list").empty();
    $("#participant_list").empty();

    
    if (show_change_btns) {
        $(".team_add_btn").css("display", "flex")

        
        $('#team--add_partic').off('click');

        // открытие модального окна
        $("#team--add_partic").on("click", () => {
            $("#modal_add_partic").css("display", "flex");
        })


        $("#team--add_task").off('click');

        $("#team--add_task").on("click", () => {
            show_preloader();
            get_partics(team_id)
        })
    } else {
        $(".team_add_btn").css("display", "none")
    }
    
    
    // Вывод данных из БД
    add_team_info(team_id, show_settings_btn);
    add_tasks(team_id, u_role);
    add_partics(team_id, show_change_btns);
    
    // кнопки в модальных окнах
    $("#modal_addP_btn").off("click")
    $("#modal_addP_btn").on("click", () => { append_p() })

    $("#modal_search_partic").submit(function(e) {
        e.preventDefault();
        search_user(team_id);
    })
}

// Получение информации о команде
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


                $("#team--settings_btn").off("click");
                $("#team--settings_btn").on("click", () => {
                    $("#modal_team_settings").css("display", "flex")

                    $("#modal_team_title").val(data.team_name);
                    $("#modal_team_description").text(data.team_description);

                    $("#modal_save_team_changes").on("click", () => { cahange_team(team_id, data.team_name, data.team_description) })
                })

                $("#modal_remove_team").on("click", () => {
                    delete_team(team_id);
                })
                
                $(".modal_cansel_btn").on("click", () => {
                    $("#modal_team_settings").css("display", "none");
                })
            }
        }
    })
}

// Изменение данных о команде
function cahange_team(team_id) {
    show_preloader();

    let tn = $("#modal_team_title").val(),
        td = $("#modal_team_description").val();

    // Запрос данных о команде
    $.ajax({
        type: "POST",
        url: "php/change_team.php",
        datatype: 'text',
        data: {
            u_id: USER_ID,
            team_id: team_id,
            team_name: tn,
            team_desc: td
        },
        success: function (data) {
            data = JSON.parse(data);
            
            const notif = new Notification();
            notif.settings['messages'] = [
                "Изменения сохранены",
                "У вас нет прав для внесения изменений",
            ];

            
            if (data.status) {
                notif.create(0)
            } else {
                notif.create(data.error_type)
            }

            hide_preloader();
            notif.show();
            return;
        }
    })
}

// Удаление команды
function delete_team(team_id) {
    show_preloader();

    $.ajax({
        type: "POST",
        url: "php/delete_team.php",
        datatype: 'json',
        data: {
            u_id: USER_ID,
            team_id: team_id,
        },
        success: function (data) {
            data = JSON.parse(data);
            
            const notif = new Notification();
            notif.settings['messages'] = [
                "",
                "У вас нет прав для внесения изменений",
            ];
            
            if (data.status) {
                reloadPage();
            } else {
                notif.create(data.error_type)

                hide_preloader();
                notif.show();
                return;
            }
        }
    })
}

// Добавить задач команды
function add_tasks(team_id, u_role) {
    $.ajax({
        type: "POST",
        url: "php/get_tasks.php",
        datatype: 'json',
        data: {
            team_id: team_id
        },
        success: function (data) {

            if (data != "[]") {
                $("#task-list_noTaskBlock").css("display", "none");
                
                data = change_data_to_JSON(data, false);

                for (let i in data) {
                    let t_id = data[i]['id'],
                        t_text = data[i]['task_text'],
                        t_status = data[i]['task_status'],
                        t_exec_id = data[i]['executor_id'],
                        t_exec_name = data[i]['exe_name']
                    
                    // блок задачи
                    $("#tasks-list").append($('<div>', {
                        'id': "task--" + t_id + '--' + t_exec_id,
                        'class': 'task-list_el list_el',
                        'data-text': t_text,
                        'data-execName': t_exec_name,
                        'data-status': t_status
                    }));

                    // исполнитель
                    $("#task--" + t_id + '--' + t_exec_id).append($('<p>', {
                        'id': "task_exec--" + t_id,
                        'class': 'task_executor'
                    }));

                    if (t_exec_id != 0){
                        $("#task_exec--" + t_id).html("Выполняет: " + t_exec_name)
                    } else {
                        $("#task_exec--" + t_id).html("Исполнитель не выбран");
                    }
    
                    // текст задачи
                    $("#task--" + t_id + '--' + t_exec_id).append($('<p>' + t_text + '</p>'));
                    // маркер задачи
                    if (t_status == '1') {
                        $("#task--" + t_id + '--' + t_exec_id).append($('<div>', {
                            'class': 'task_mark task_mark-c'
                        }));

                    } else {
                            
                        $("#task--" + t_id + '--' + t_exec_id).append($('<div>', {
                            'class': 'task_mark task_mark-nc'
                        }));
                    }
                    // затенение снизу
                    $("#task--" + t_id + '--' + t_exec_id).append($('<div>', {
                        'class': 'task_el_shadow'
                    }));
                }

                // Вызов функции по нажатию на задачу
                $(".task-list_el").off('click')
                $(".task-list_el").on("click", (el) => show_task_window(el['currentTarget'], u_role, team_id) );
            } else {
                $("#tasks-list").append($('<div>', {
                    'id': "task-list_noTaskBlock"
                }));

                $("#task-list_noTaskBlock").append($('<p>В команде нет задач</p>'));
            } 
                       
        }
    })
}

// вывод участников команды команды
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
                    p_role = data[i]['role'],
                    p_role_text = '';

                let show_role = true;
                switch (p_role) {
                    case '0':
                        p_role_text = 'У';
                        break;
                    case '1':
                        p_role_text = 'М';
                        break;
                    case '2':
                        p_role_text = 'С';
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
                    let attrStr = "  (<abbr title='Роли участников:\nУ - участник\nМ - модератор\nС - создатель'>" + p_role_text + "</abbr>)";
                    $('#partic_name--' + i).html(p_name + " " + p_surname + attrStr);
                } else {
                    $('#partic_name--' + i).html(p_name + " " + p_surname)
                }

                if (USER_ID != p_id) {

                    if (schb && p_role != '2') {
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

                $("#addP_role_selector").css('display', 'block');
                $(".partic").css('justify-content', 'space-between');

            } else {

                switch (data.error_code) {
                    case 1: 
                        partic.text("Такого человека нет");
                        break;
                    case 2:
                        partic.text("Этот человек уже в команде");
                        break;
                }

                $("#addP_role_selector").css('display', 'none');
                $(".partic").css('justify-content', 'center');
                $("#modal_addP_btn").attr('class', 'modal_sub_btn--inactive');

                btn.attr('disabled', true);
                btn.removeAttr('value');
            }

            hide_preloader();
            return;
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
                
                $("#modal_add_partic").css("display", "none");
                const notif = new Notification;
                notif.settings['messages'] = [ "Пользователь добавлен" ]
                notif.create(0);
                notif.show();

                get_user_role(team_id)
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
                    $("#modal_rem_p").css("display", "none");
                    const notif = new Notification;
                    notif.settings['messages'] = [ "Пользователь исключён" ]
                    notif.create(0);
                    notif.show();
    
                    get_user_role(team_id)
                }
            }
        });
    })
    
    return;
}


// получение участников команды
function get_partics(team_id) {
    $.ajax({
        type: "POST",
        url: "php/get_team_compos.php",
        datatype: 'text',
        data: {
            team_id: team_id
        },
        success: function (data) {
            partics = change_data_to_JSON(data, true);

            show_create_task_window(team_id, partics);
        }
    })
}

// добавление команды в список исполнителей
function show_create_task_window(team_id, data){
    let selector = $("#task_partic_selector");

    $("#task_text").val('');
    $("#task_partic_selector").empty();

    selector.append($("<option value='0'>Не выбран (можно оставить)</option>"))
    for (let i in data) {
        let p_id = data[i]['id'],
            p_name = data[i]['name'],
            p_surname = data[i]['surname'];

        selector.append($("<option value="+p_id+">"+p_name+' '+p_surname+"</option>"))
    }

    $("#no_task_selected_block").css("display", 'none');
    $("#current_task").css("display", 'none');
    $("#create_task").css("display", 'flex');
    hide_preloader();


    $('#create_new_task_btn').off('click');
    $('#create_new_task_btn').on("click", (e) => {
        e.preventDefault();

        let task_text = $("#task_text_textarea").val(),
            executor = $("#task_partic_selector").val();

        const notif = new Notification;
        notif.settings['messages'] = [
            'Задача добавленна',
            'Заполните текст задачи',
            'Ошибка'
        ]

        if (task_text != '') {
            show_preloader();

            $.ajax({
                type: "POST",
                url: "php/create_task.php",
                datatype: 'json',
                data: {
                    team_id: team_id,
                    u_id: executor,
                    tt: task_text
                },
                success: function (data) {
                    if (Boolean(data)) {
                        $("#task_text").val('');
                        $("#task_partic_selector").val('');
        
                        notif.create(0);
        
                        get_user_role(team_id);
                    }
                }
            });

        } else {
            notif.create(1);
        }

        notif.show();
    })
}

// показ задачи
function show_task_window(task, u_role, team_id) {
    let task_id = task.getAttribute('id').split('--')[1],
        task_exec_id = task.getAttribute('id').split('--')[2],
        task_text = task.dataset.text,
        task_execName = task.dataset.execname,
        task_status = task.dataset.status;

    
    let task_text_lable = $("#task_text"),
        task_executor = $("#task_executor"),
        task_status_text = $("#task--task_status");


    task_text_lable.text(task_text);
    task_executor.text('Выполняет: ' + task_execName);

    switch (task_status) {
        case '0':
            task_status_text.text('Не выполнена');
            //task_status_mark.attr('class', 'task_status_mark task_status_mark-nc')
            break;

        case '1':
            task_status_text.text('Выполнена');
            //task_status_mark.attr('class', 'task_status_mark task_status_mark-c')
            break;
    }


    let show_done_task_btn = false,
        show_change_task_btn = false,
        show_delete_task_btn = false;

        task_btns_block = $('#task_btns_block');

    switch (u_role) {
        case 1:
            show_change_task_btn = true;
            show_done_task_btn = true;
            break;
        case 2:
            show_change_task_btn = true;
            show_done_task_btn = true;
            show_delete_task_btn = true;
            break;
    }
    

    task_btns_block.empty();
    
    if (show_change_task_btn) task_btns_block.append($("<button class='task_btn' id='task_change_task_btn'>Изменить задачу</button>"));
    if (USER_ID == task_exec_id || show_done_task_btn) task_btns_block.append($("<button class='task_btn' id='task_set_task_done_btn'>Выполнена</button>"));
    if (show_delete_task_btn) {
        task_btns_block.append($("<button class='task_delete_btn' id='task_delete_task_btn'><i class='fa fa-trash' aria-hidden='true'></i></button>"));
    }



    $('#task_set_task_done_btn').off('click');
    $('#task_set_task_done_btn').on('click', () => {
        if (confirm("Задача выполненна?")) {
            show_preloader();

            $.ajax({
                type: "POST",
                url: "php/set_task_done.php",
                datatype: 'json',
                data: {
                    task_id: task_id
                },
                success: function (data) {
                    if (Boolean(data)) {
                        const notif = new Notification;
                        notif.settings['messages'] = [ "Изменения сохранены" ]
                        notif.create(0);
                        notif.show();
        
                        get_user_role(team_id)
                    }
                }
            });
        }
    })

    $('#task_change_task_btn').off('click');
    $('#task_change_task_btn').on('click', () => {
        show_preloader();

        $("#modal_change_team_textarea").val(task_text);
        let selector = $("#modal_change_team_select");
        
        $.ajax({
            type: "POST",
            url: "php/get_team_compos.php",
            datatype: 'text',
            data: {
                team_id: team_id
            },
            success: function (data) {
                data = change_data_to_JSON(data, true);

                

                selector.empty();

                for (let i in data) {             
                    let p_id = data[i]['id'],
                        p_name = data[i]['name'],
                        p_surname = data[i]['surname'];
                    
                    if (p_id != task_exec_id) selector.append($("<option value="+p_id+">"+p_name+' '+p_surname+"</option>"));
                    else selector.append($("<option selected='selected' value="+p_id+">"+p_name+' '+p_surname+"</option>"));
                }

                
                $("#change_task_btn").off('click');
                $("#change_task_btn").on('click', () => { change_task(task_id, team_id) });

                $("#modal_change_task").css('display', 'flex');
                hide_preloader();
            }
        })
    })

    $('#task_delete_task_btn').off('click');
    $('#task_delete_task_btn').on('click', () => {
        console.log(USER_ID, task_id, team_id);

        if (confirm("Удалить эту задачу?")) {
            show_preloader();
            $.ajax({
                type: "POST",
                url: "php/delete_task.php",
                datatype: 'json',
                data: {
                    u_id: USER_ID,
                    task_id: task_id,
                    team_id: team_id
                },
                success: function (data) {
                    data = JSON.parse(data);

                    const notif = new Notification;
                    notif.settings['messages'] = [
                        "Задача удалена",
                        "у вас нет парв"
                    ]

                    if (data.status) {
                        notif.create(0);
                        get_user_role(team_id);
                    } else {
                        notif.create(data.error_type)
                        hide_preloader();
                    }

                    notif.show();
                }
            });
        }
    })
    

    $("#no_task_selected_block").css("display", 'none');
    $("#create_task").css("display", 'none');
    $("#current_task").css("display", 'flex');
}

function change_task(task_id, team_id) {
    show_preloader();

    $.ajax({
        type: "POST",
        url: "php/change_task.php",
        datatype: 'text',
        data: {
            u_id: USER_ID,
            team_id: team_id,
            ti: task_id,
            tt: $("#modal_change_team_textarea").val(),
            te: $("#modal_change_team_select").val()
        },
        success: function (data) {
            data = JSON.parse(data);
            console.log(data)
            const notif = new Notification;
            notif.settings['messages'] = [ "Задача изменена", "Недостаточно прав" ]

            if (data.status) {
                notif.create(0);
                $("#modal_change_task").css('display', 'none');
                get_user_role(team_id);
            } else {
                notif.create(data.error_type);
                hide_preloader();
            }
            notif.show();
            return;
        }
    })
}


// модальное окно профиля
function show_user_modal() {
    let modal = $("#u_profile_modal");
    let fill = $("#fill");
    
    if ( !(modal.hasClass("u_profile_modal--active")) ) {
        
        fill.css("display","block");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
        modal.css("display","flex");
        
    } else {
        
        fill.css("display","none");
        
        modal.toggleClass("u_profile_modal--active")
        modal.toggleClass("u_profile_modal--inactive")
        
        modal.css("display","none");
        
    };
}


const USER_ID = getCookie("user");

$(document).ready(main());