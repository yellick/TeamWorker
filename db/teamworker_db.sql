-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Мар 06 2024 г., 14:14
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
-- Структура таблицы `tasks`
--

CREATE TABLE `tasks` (
  `id` int(8) UNSIGNED NOT NULL,
  `task_text` varchar(500) NOT NULL,
  `task_ctatus` int(2) NOT NULL,
  `team_id` int(8) UNSIGNED NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

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
(27, '123', ''),
(24, 'Крутые', 'Команда для школьного проекта');

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
(41, 27, 13, 0),
(36, 24, 12, 0),
(34, 24, 10, 0),
(31, 27, 5, 1),
(35, 24, 11, 0),
(27, 24, 5, 2);

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
(5, 'Михаил', 'Губанов', 'gubm04@mail.ru', '202cb962ac59075b964b07152d234b70'),
(6, '123', '123', '22201003@live.preco.ru', '827ccb0eea8a706c4c34a16891f84e7b'),
(10, 'Арина', 'Кокшарова', 'arina@mail.ru', '202cb962ac59075b964b07152d234b70'),
(11, 'Алексей', 'Шувалов', 'shuvalov@mail.ru', '202cb962ac59075b964b07152d234b70'),
(12, 'Андрей', 'Блинов', 'blinov@mail.ru', '202cb962ac59075b964b07152d234b70'),
(13, 'Алексей', 'Колташев', 'koltashev@mail.ru', '202cb962ac59075b964b07152d234b70');

-- --------------------------------------------------------

--
-- Структура таблицы `users_tasks`
--

CREATE TABLE `users_tasks` (
  `id` int(8) UNSIGNED NOT NULL,
  `team_id` int(8) UNSIGNED NOT NULL,
  `u_id` int(8) UNSIGNED NOT NULL,
  `role` varchar(2) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Индексы сохранённых таблиц
--

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
-- Индексы таблицы `users_tasks`
--
ALTER TABLE `users_tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_id` (`team_id`),
  ADD KEY `u_id` (`u_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT для таблицы `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;
--
-- AUTO_INCREMENT для таблицы `team_composition`
--
ALTER TABLE `team_composition`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT для таблицы `users_tasks`
--
ALTER TABLE `users_tasks`
  MODIFY `id` int(8) UNSIGNED NOT NULL AUTO_INCREMENT;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
