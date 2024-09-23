<?php

class User
{
    private $conn;
    private $table_name = "users";

    public $id;
    public $usuario;
    public $senha;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Verificando login
    public function login()
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE usuario = :usuario LIMIT 0,1";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':usuario', $this->usuario);

        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            if (password_verify($this->senha, $row['senha'])) {
                return $row['id']; //login com sucesso
            }
        }

        return false; //login falhou



    }
}
