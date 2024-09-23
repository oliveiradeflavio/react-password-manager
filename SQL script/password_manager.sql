-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 23/09/2024 às 19:17
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `password_manager`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `specifications`
--

CREATE TABLE `specifications` (
  `id` int(11) NOT NULL,
  `login` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `especificacao` text NOT NULL,
  `observacao` text DEFAULT NULL,
  `data_criacao` timestamp NOT NULL DEFAULT current_timestamp(),
  `data_modificacao` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `criado_por` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `specifications`
--

INSERT INTO `specifications` (`id`, `login`, `senha`, `especificacao`, `observacao`, `data_criacao`, `data_modificacao`, `criado_por`) VALUES
(1, 'admin', 'admin', 'Login de Acesso ', 'Login de acesso ao React Password Manager', '2024-09-23 14:13:20', '2024-09-23 14:13:20', 1),
(2, 'admin', '1234', 'Segundo login de acesso ', 'Essa especificação foi alterada.', '2024-09-23 14:14:40', '2024-09-23 14:15:21', 1);

--
-- Acionadores `specifications`
--
DELIMITER $$
CREATE TRIGGER `before_specifications_update` BEFORE UPDATE ON `specifications` FOR EACH ROW BEGIN
    SET NEW.data_modificacao = CURRENT_TIMESTAMP;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `usuario` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `usuario`, `senha`) VALUES
(1, 'admin', '$2y$10$rZYDq59krL/88tmce6acXOJm8inyvolyifzXpQkBHgNfyXAYtzVzO');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `specifications`
--
ALTER TABLE `specifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_criado_por` (`criado_por`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `specifications`
--
ALTER TABLE `specifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `specifications`
--
ALTER TABLE `specifications`
  ADD CONSTRAINT `fk_criado_por` FOREIGN KEY (`criado_por`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
