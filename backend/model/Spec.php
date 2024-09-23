<?php
class Spec
{
    private $conn;
    private $table_name = "specifications"; // Nome da tabela de especificações

    public $id;
    public $login;
    public $senha;
    public $especificacao;
    public $observacao;
    public $criado_por;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Criar uma nova especificação
    public function create()
    {
        $query = "INSERT INTO " . $this->table_name . " (login, senha, especificacao, observacao, criado_por) VALUES (:login, :senha, :especificacao, :observacao, :criado_por)";

        $stmt = $this->conn->prepare($query);

        // Sanitizar e vincular parâmetros
        $stmt->bindParam(":login", $this->login);
        $stmt->bindParam(":senha", $this->senha);
        $stmt->bindParam(":especificacao", $this->especificacao);
        $stmt->bindParam(":observacao", $this->observacao);
        $stmt->bindParam(":criado_por", $this->criado_por);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // Buscar especificações por termo de busca (q)
    public function search($q)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE especificacao LIKE :q OR observacao LIKE :q OR login LIKE :q OR senha LIKE :q";

        $stmt = $this->conn->prepare($query);

        // Sanitizar e vincular parâmetros
        $q = htmlspecialchars(strip_tags($q));
        $q = "%{$q}%";
        $stmt->bindParam(":q", $q);

        $stmt->execute();

        return $stmt;
    }

    public function update($id)
    {

        $query = "UPDATE " . $this->table_name . " SET login = :login, senha = :senha, especificacao = :especificacao, observacao = :observacao WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar e vincular parâmetros
        $stmt->bindParam(":login", $this->login);
        $stmt->bindParam(":senha", $this->senha);
        $stmt->bindParam(":especificacao", $this->especificacao);
        $stmt->bindParam(":observacao", $this->observacao);
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }



    // deletar uma especificação via ID
    public function deleteSpec($id)
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE id = :id";

        $stmt = $this->conn->prepare($query);

        // Sanitizar e vincular parâmetros
        $stmt->bindParam(":id", $id);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
