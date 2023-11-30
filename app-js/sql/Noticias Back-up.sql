-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 30-11-2023 a las 22:19:36
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `noticias`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articles`
--

CREATE TABLE `articles` (
  `article_id` int NOT NULL,
  `article_title` varchar(140) NOT NULL,
  `article_content` varchar(5000) NOT NULL,
  `article_date_published` date DEFAULT NULL,
  `article_author` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `articles`
--

INSERT INTO `articles` (`article_id`, `article_title`, `article_content`, `article_date_published`, `article_author`) VALUES
(1, 'Artículo de prueba', 'Este es un artículo de prueba', '2023-11-30', 'Autor de prueba'),
(2, 'Guerra en el mundo', 'Este es un artículo de prueba', '2023-11-30', 'Pablo'),
(3, 'Mi abuela ha muerto', 'Este es un artículo de prueba', '2023-11-30', 'SantiagoDela'),
(4, 'Betis gana de nuevo', 'Este es un artículo de prueba', '2023-11-30', 'Paco'),
(5, 'Todo el mundo suspende DIW', 'Este es un artículo de prueba', '2023-11-30', 'Miguel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comments`
--

CREATE TABLE `comments` (
  `comment_id` int NOT NULL,
  `comment_text` varchar(5000) NOT NULL,
  `comment_date` date DEFAULT NULL,
  `article_id` int NOT NULL,
  `comment_author` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `comments`
--

INSERT INTO `comments` (`comment_id`, `comment_text`, `comment_date`, `article_id`, `comment_author`) VALUES
(1, 'Este es un comentario de prueba', '2023-11-30', 1, 'Autor de comentario de prueba'),
(2, 'Paz en el mundo', '2023-11-30', 2, 'Adrian'),
(3, 'Trsite noticia', '2023-11-30', 3, 'Lucia'),
(4, 'Ole er beti', '2023-11-30', 4, 'Juan'),
(5, 'Sinceramente es normal', '2023-11-30', 5, 'Miguel');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`article_id`);

--
-- Indices de la tabla `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`comment_id`),
  ADD KEY `article_id_fk` (`article_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articles`
--
ALTER TABLE `articles`
  MODIFY `article_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `comments`
--
ALTER TABLE `comments`
  MODIFY `comment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `article_id_fk` FOREIGN KEY (`article_id`) REFERENCES `articles` (`article_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
