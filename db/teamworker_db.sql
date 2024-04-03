-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 03 2024 г., 12:33
-- Версия сервера: 5.7.17
-- Версия PHP: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `teamworker_db`
--

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id` int(1) NOT NULL,
  `name` varchar(20) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id`, `name`) VALUES
(0, 'Участник'),
(1, 'Модератор');

-- --------------------------------------------------------

--
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(8) UNSIGNED NOT NULL,
  `task_text` varchar(500) NOT NULL,
  `task_status` int(2) NOT NULL,
  `team_id` int(8) UNSIGNED NOT NULL,
  `executor_id` int(8) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `tasks`
--

INSERT INTO `tasks` (`id`, `task_text`, `task_status`, `team_id`, `executor_id`) VALUES
(21, 'Прогулять 13 пар за месяц, 12 из которых по ув. причине', 1, 24, 10),
(19, 'Отчислить лёшу 2 раза', 1, 36, 16),
(18, 'Дать Лёше второй подзатыльник', 0, 36, 5),
(17, 'Дать Лёше подзатыльник', 0, 36, 10);

-- --------------------------------------------------------

--
-- Структура таблицы `teams`
--

CREATE TABLE `teams` (
  `id` int(8) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `team_description` varchar(500) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `teams`
--

INSERT INTO `teams` (`id`, `name`, `team_description`) VALUES
(36, '122', ''),
(24, 'Крутые', 'Команда для прогуливанья пар'),
(40, '232132131', 'Команда для ...');

-- --------------------------------------------------------

--
-- Структура таблицы `team_composition`
--

CREATE TABLE `team_composition` (
  `id` int(8) UNSIGNED NOT NULL,
  `team_id` int(8) UNSIGNED NOT NULL,
  `u_id` int(8) UNSIGNED NOT NULL,
  `role` int(1) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='Роли 0 - лидер, 1 - ассистент, 2 - участник';

--
-- Дамп данных таблицы `team_composition`
--

INSERT INTO `team_composition` (`id`, `team_id`, `u_id`, `role`) VALUES
(40, 24, 13, 0),
(71, 38, 5, 2),
(36, 24, 12, 0),
(34, 24, 10, 0),
(70, 37, 5, 2),
(35, 24, 11, 0),
(27, 24, 5, 2),
(48, 24, 16, 1),
(69, 36, 10, 0),
(64, 36, 16, 1),
(61, 36, 5, 2),
(72, 39, 5, 2),
(75, 40, 16, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(8) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `email`, `password`) VALUES
(5, 'Михаил', 'Губанов', 'god@mail.ru', '202cb962ac59075b964b07152d234b70'),
(10, 'Арина', 'Кокшарова', 'arina@mail.ru', '202cb962ac59075b964b07152d234b70'),
(11, 'Алексей', 'Шувалов', 'shuvalov@mail.ru', '202cb962ac59075b964b07152d234b70'),
(12, 'Андрей', 'Блинов', 'blinov@mail.ru', '202cb962ac59075b964b07152d234b70'),
(13, 'Алексей', 'Колташев', 'koltashev@mail.ru', '202cb962ac59075b964b07152d234b70'),
(16, 'Артём', 'Гапчук', 'gapchuk@mail.ru', '202cb962ac59075b964b07152d234b70');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`);

--
-- Индексы таблицы `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `team_composition`
--
ALTER TABLE `team_composition`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `u_id` (`u_id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT для таблицы `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
--
-- AUTO_INCREMENT для таблицы `team_composition`
--
ALTER TABLE `team_composition`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
