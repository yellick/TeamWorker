<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Worker | Настройки</title>
    <link rel="icon" type="image/x-icon" href="../img/logo.png">
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <link rel="stylesheet" href="../css/preloader_style.css">
    <link rel="stylesheet" href="css/settings_style.css">
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


        require_once '../php/db_connect.php';

        $result = $db->query("SELECT name, surname, email FROM `users` WHERE `id` = '$u_id'");
        $user = $result->fetch_assoc();

        if($u_id != '' && $user != ''):
            
            $u_name = $user['name'];
            $u_surname = $user['surname'];
            $u_email = $user['email'];

            $initials = mb_substr($u_name, 0, 1, "UTF-8") . mb_substr($u_surname, 0, 1, "UTF-8");
            
    ?>

    <div class="modal_wrap" id="modal_delete_user">
        <div class="modal_window">

            <div id="check_pass_form">
                <div class="modal_content">
                    <input type="pass" placeholder="Введите пароль" id="rem_u_pass" autocomplete="off">

                    <div class="modal_btns"> 
                        <button id="check_pass_btn">Отправить</button>
                        <button class="modal_cansel_btn">Отмена</button>
                    </div>
                </div>
            </div>

            <div id="rem_user_form">
                <div class="modal_content">
                    <p class="modal_title">Удалить аккаунт?</p>

                    <div class="prediction">
                        <p>Удаление вашего аккаунта подразумевает полное и безвозвратное удаление ваших данных с нашего сервиса.</p>
                        <p>В частности:</p>
                        <ul>
                            <li>Личные данных</li>
                            <li>Данные о том, что вы когда то были в команде</li>
                            <li>Данные о том, какие задачи вы выполняли</li>
                            <li>Команды, которые вы создали</li>
                        </ul>
                    </div>

                    <div class="modal_btns"> 
                        <button id="modal_remove_account_btn">Удалить аккаунт</button>
                        <button class="modal_cansel_btn">Отмена</button>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <header>
        <div class="wrap">
            <div class="header_wrap">
                <div class="logo">
                    <div class="product_name">
                        <a href="../tasks/">Team Worker</a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <main>
        <a id="go_back_btn" href="../tasks/" onclick="show_preloader()">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>
        </a>

        <div class="forms">
            <form id="change_u_data_form">
                <div class="form_content">
                    <div class="avatar">
                        <i class="fa fa-user-circle-o" aria-hidden="true"></i>
                        <p id="u_id">
                            u_id: <?php echo $u_id; ?>
                        </p>
                    </div>

                    <div class="inputs">

                        <div class="input_block">
                            <p class="label">Фамилия</p>
                            <input type="text" name="surname" value="<?php echo $u_surname ?>">
                        </div>

                        <div class="input_block">
                            <p class="label">Имя</p>
                            <input type="text" name="name" value="<?php echo $u_name ?>">
                        </div>

                        <div class="input_block">
                            <p class="label">Почта</p>
                            <input type="text" name="email" value="<?php echo $u_email ?>">
                        </div>
                    </div>
                </div>

                <div class="sub_sect">
                    <button id="save_changes_btn">Сохранить</button>
                </div>
            </form>

            <form id="change_u_password_form">

                <div class="form_content">
                    <p class="form_title">Изменение пароля</p>

                    <div class="inputs">
                        <input type="password" placeholder="Пароль" id="old_pass">
                        <input type="text" placeholder="Новый пароль" autocomplete="off" id="new_pass">
                        <input type="password" placeholder="Повторите новый пароль" id="new_pass_rep">
                    </div>
                </div>

                <div class="sub_sect">
                    <button id="change_pass_btn">Изменить пароль</button>
                </div>
            </form>

            <form id="remove_account_form">
                <div class="form_content">
                    <p class="form_title">Удаление аккаунта</p>

                    <div class="pred">
                        <p>Удаление вашего аккаунта из сервиса Team Worker</p>
                    </div>
                </div>

                <div class="sub_sect">
                    <button id="delete_profile_btn">Удалить профиль</button>
                </div>
            </form>
        </div>
    </main>


    <script src="../js/jquery-3.6.0.min.js"></script>
    <script src="../js/preloader.js"></script>
    <script src="../js/notification.js"></script>
    <script src="../js/get_cookie.js"></script>
    <script src="js/settings_script.js"></script>

    <?php
        else:
            header("Location: ../");
        endif;
    ?>
</body>

</html>
