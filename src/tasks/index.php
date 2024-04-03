<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Worker | Главная</title>
    <link rel="icon" type="image/x-icon" href="../img/logo.png">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/preloader_style.css">
    <link rel="stylesheet" href="css/tasks_style.css">
</head>

<body>
    <div id="fill"></div>

    <div id="preloader">
        <div class="preloader-wrap">
            <div class="preloader-circle" id="circle_1"></div>
            <div class="preloader-circle" id="circle_2"></div>
            <div class="preloader-circle" id="circle_3"></div>
        </div>
    </div>


    <?php
        $u_id = $_COOKIE['user'];
        if($u_id != ''):

            require_once '../php/db_connect.php';

            $user = $db->query("SELECT name, surname, email FROM `users` WHERE `id` = '$u_id'")->fetch_assoc();
            
            $u_name = $user['name'];
            $u_surname = $user['surname'];
            $u_email = $user['email'];

            $initials = mb_substr($u_name, 0, 1, "UTF-8") . mb_substr($u_surname, 0, 1, "UTF-8");

            $roles = $db->query("SELECT * FROM `roles`");
    ?>


    <div id="modal_exit" class="modal_wrap">
        <div class="modal_window">
            <p>Выйти из аккаунта?</p>
            <div class="btns">
                <button class="modal_sub_btn" id="exit_btn">Выйти</button>
                <button class="modal_cansel_btn" id="cansel_exit_btn">Отмена</button>
            </div>
        </div>
    </div> 

    <div id="modal_add_partic" class="modal_wrap">
        <div class="modal_window">
            <p class="modal_title">Добавить участника</p>

            <form id="modal_search_partic">
                <input type="text" id="sought_user" placeholder="Код участника (id)" autocomplete="off" required>
                <input type="submit" value="Поиск">
            </form>

            <div class="partic">
                <p id="partic_name"></p>
                
                <select id="addP_role_selector">
                    <?php
                        while ($row = $roles->fetch_assoc()) {
                            if ($row['id'] == 2) {
                                continue;
                            }
                            echo "<option value=".$row['id'].">".$row['name']."</option>";
                        }
                    ?>
                </select>
            </div>
            
            <div class="btns">
                <button class="modal_sub_btn--inactive" id="modal_addP_btn" disabled>Добавить</button>
                <button class="modal_cansel_btn">Отмена</button>
            </div>
        </div>
    </div>
    
    <div id="modal_rem_p" class="modal_wrap">
        <div class="modal_window">
            <p>Удалить участника из команды?</p>
            <div class="btns">
                <button class="modal_sub_btn" id="rem_partic_btn">Удалить</button>
                <button class="modal_cansel_btn">Отмена</button>
            </div>
        </div>
    </div>

    <div id="modal_team_settings" class="modal_wrap">
        <div class="modal_window">
            <div class="team_title modal_cont">
                <p class="modal_label">Название команды</p>
                <input id="modal_team_title" placeholder="Название">
            </div>

            <div class="team_description">
                <p class="modal_label">Описание команды</p>
                <textarea id="modal_team_description" cols="30" rows="5" placeholder="Описание"></textarea>
            </div>

            <div class="btns">
                <button id="modal_save_team_changes">Сохранить</button>
                <button id="modal_remove_team" class='modal_remove_team'>
                    <i class="fa fa-trash" aria-hidden="true"></i>
                </button>
                <button class="modal_cansel_btn">Закрыть</button>
            </div>
        </div>
    </div>

    <div id="modal_change_task" class="modal_wrap">
        <div class="modal_window">
            <div class="change_task_wrap">        
                <textarea id="modal_change_team_textarea"></textarea>
                
                <div class="label">Выполняет:</div>
                <select id="modal_change_team_select"></select>
            </div>
            
            <div class="btns">
                <button class="modal_sub_btn" id="change_task_btn">Изменить</button>
                <button class="modal_cansel_btn">Отмена</button>
            </div>
        </div>
    </div>

    
    <header>
        <div class="wrap">
            <div class="header_wrap">
                <div class="logo">
                    <div class="product_name">
                        <p>Team Worker</p>
                    </div>
                </div>

                <div class="user">
                    <a id="u_profile">
                        <p><?php echo $initials; ?></p>
                    </a>

                    <div id="u_profile_modal" class="u_profile_modal--inactive">
                        <div class="u_info">
                            <div class="u_name">
                                <p><?php echo $u_name . ' ' . $u_surname; ?></p>
                            </div>
                            <div class="u_id">
                                <span>u_id: <?php echo $u_id; ?></span>
                            </div>
                            <div class="u_email">
                                <p><?php echo $u_email; ?></p>
                            </div>
                        </div>

                        <div class="modal_btns">
                            <button id="profile_settings">
                                <i class="fa fa-cog icon" aria-hidden="true"></i>
                            </button>
                            <button id="profile_exit">
                                <i class="fa fa-sign-out icon" aria-hidden="true"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <section class="teams_sect main_sect">
            <div class="sect_title">
                <i class="fa fa-users icon" aria-hidden="true"></i>
                <p>команды</p>
            </div>

            <div id="create_team_btn">
                <p>+</p>
                <p>создать команду</p>
            </div>

            <div id="teams_list"></div>
        </section>

        <section class="team_sect main_sect">
            <div id="no_team_selected_block" class="no_data">
                <p>Команда не выбранна</p>
            </div>

            <div id="current_team">
                <div class="team--about">
                    <div class="team--team_name" id="team--name_wrap">
                        <p id="team--team_name"></p>
                    </div>

                    <div class="team--team_descriprion">
                        <p id="team--team_descriprion"></p>
                    </div>
                </div>

                <div class="team--content_lists">

                    <div class="team--tasks_list list_wrap">
                        <div class="list_title">
                            <p>Список задач</p>
                            <p id="team--add_task" class='team_add_btn'>+</p>
                        </div>

                        <div class="list" id="tasks-list"></div>
                    </div>

                    <div class="team--participant_list list_wrap">
                        <div class="list_title">
                            <p>Участники</p>
                            <p id="team--add_partic" class='team_add_btn'>+</p>
                        </div>

                        <div class="list" id="participant_list"></div>
                    </div>
                    
                </div>
            </div>

            <div id="create_team">
                <div class="sect_title">
                    <p>Создание команды</p>
                </div>

                <div class="form_wrap">
                    <form id="create_team_form">
                        <p class="label">
                            Придумайте название для команды
                            <br><br>
                            Можно оставить пустым, тогда названием команды будет её номер
                        </p>

                        <input type="text" id="team_name" placeholder="Название команды" autocomplete="off">


                        <p class="label">
                            Придумайте описание команды
                            <br><br>
                            (цель, для которой команда создавалась)
                            <br><br>
                            Можно оставить пустым
                        </p>

                        <textarea id="description" cols="30" rows="5" placeholder="Описание команды">Команда для ...</textarea>

                        <input type="submit" class="submit--active" name="team_name" value="Создать">
                    </form>
                </div>
            </div>
        </section>

        <section class="task_sect main_sect">
            <div id="no_task_selected_block" class="no_data" style="display: none">
                <p>Задача не выбранна</p>
            </div>

            <div id="current_task">
                <div class="task_text_wrap"><p id="task_text"></p></div>
                    
                <div class="task_executor_wrap"><p id="task_executor"></p></div>

                <div class="task_status-wrap">
                    <span>Статус: </span><span id="task--task_status"></span>
                    <!-- <div id="task_status_mark"></div> -->
                </div>

                <div id='task_btns_block'></div>
            </div>

            <div id="create_task">
                <div class="sect_title">
                    <p>Новая задача</p>
                </div>

                <div class="form_wrap">
                    <form>
                        <textarea id="task_text_textarea" rows="5" placeholder="Текст задачи"></textarea>
                        
                        <p class="label">Выполняет</p>
                        <select id="task_partic_selector"></select>

                        <button id="create_new_task_btn">Создать задачу</button>
                    </form>
                </div>

                <div></div>
            </div>
        </section>
    </main>

    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/notification.js"></script>
    <script src="../js/preloader.js"></script>
    <script src="../js/get_cookie.js"></script>
    <script src="../js/length_limit.js"></script>
    <script src="js/tasks_script.js"></script>


    <?php
        else:
            header("Location: ../");
        endif;
    ?>
</body>

</html>
