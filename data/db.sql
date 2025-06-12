CREATE DATABASE sap_2025_2;

USE sap_2025_2;

CREATE TABLE Usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Tarefa (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_usuario INT NOT NULL,
    descricao TEXT NOT NULL,
    setor VARCHAR(50) NOT NULL,
    prioridade ENUM('baixa', 'média', 'alta') NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('a fazer', 'fazendo', 'pronto') DEFAULT 'a fazer',
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);