<?php

class Database
{
    private $host = "localhost";
    private $db_name = "password_manager";
    private $username = "root";
    private $password = "";
    public $conn;


    public function getConnection()
    {

        $this->conn = null;

        try {
            //code...
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
        } catch (PDOException $e) {
            //throw $th;
            echo "Erro de conexão com o banco de dados: " . $e->getMessage();
        }

        return $this->conn;
    }
}
