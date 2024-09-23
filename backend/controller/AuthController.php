<?php

require_once "../config/Database.php";
require_once "../model/User.php";

use \Firebase\JWT\JWT;

class AuthController
{
    private $secretKey = "password_manager_-102931-03871-837-0128730-183-18301831jsdopjfasfj20-97-09"; // Altere para uma chave segura

    public function login($data)
    {
        // Conexão com o banco de dados
        $database = new Database();
        $db = $database->getConnection();

        // Instanciar o model User
        $user = new User($db);

        // Setar os dados do usuário
        $user->usuario = $data->usuario;
        $user->senha = $data->senha;

        // Verificar o login
        $user_id = $user->login();

        if ($user_id) {

            // Gerar o token
            $token = $this->generateToken($user_id);

            http_response_code(200);
            return json_encode(["message" => "Login realizado com sucesso.", "token" => $token]);
        } else {
            http_response_code(401);
            return json_encode(["message" => "Credenciais inválidas."]);
        }
    }

    private function generateToken($user_id)
    {
        $payload = [
            "iss" => "localhost", // Emissor
            "aud" => "localhost", // Público
            "iat" => time(), // Hora em que o token foi emitido
            "exp" => time() + 3600, // Hora em que o token expira (1 hora)
            "user_id" => $user_id // ID do usuário
        ];

        return JWT::encode($payload, $this->secretKey, 'HS256');;
    }
}
