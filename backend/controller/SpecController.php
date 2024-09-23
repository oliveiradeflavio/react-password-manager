<?php
include_once '../config/Database.php';
include_once '../model/Spec.php';
require_once '../vendor/autoload.php'; // Carrega a biblioteca JWT
use \Firebase\JWT\JWT;

class SpecController
{
    private $secretKey = "password_manager_-102931-03871-837-0128730-183-18301831jsdopjfasfj20-97-09"; // Substitua pela sua chave secreta

    public function createSpec($data)
    {

        // Conectar ao banco de dados
        $database = new Database();
        $db = $database->getConnection();

        // Instanciar o modelo Spec
        $spec = new Spec($db);

        // Recuperar o token do cabeçalho Authorization
        $headers = apache_request_headers(); // Captura todos os cabeçalhos
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            $arr = explode(" ", $authHeader); // Divide o valor do header para pegar o token

            if (isset($arr[1])) {
                $jwt = $arr[1]; // O token JWT está aqui
                try {

                    // Decodificar o token JWT para obter o ID do usuário
                    $decoded = JWT::decode($jwt, new \Firebase\JWT\Key($this->secretKey, 'HS256')); // Decodifica o token
                    $userId = $decoded->user_id; // Pega o ID do usuário do token

                    // Definir os dados a partir do corpo da requisição
                    $spec->login = $data->login;
                    $spec->senha = $data->senha;
                    $spec->especificacao = $data->especificacao;
                    $spec->observacao = $data->observacao;
                    $spec->criado_por = $userId; // Usa o ID do usuário decodificado do token

                    // Criar a especificação
                    if ($spec->create()) {
                        http_response_code(201);
                        return json_encode(["message" => "Especificação criada com sucesso."]);
                    } else {
                        http_response_code(500);
                        return json_encode(["message" => "Erro ao criar especificação."]);
                    }
                } catch (Exception $e) {
                    http_response_code(401); // Token inválido
                    return json_encode(["message" => "Acesso não autorizado. Token inválido."]);
                }
            }
        }

        // Caso o token não seja encontrado no cabeçalho
        http_response_code(401);
        return json_encode(["message" => "Token não encontrado"]);
    }

    public function updateSpec($data)
    {
        // Conectar ao banco de dados
        $database = new Database();
        $db = $database->getConnection();

        // Instanciar o modelo Spec
        $spec = new Spec($db);

        // Recuperar o token do cabeçalho Authorization
        $headers = apache_request_headers(); // Captura todos os cabeçalhos
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            $arr = explode(" ", $authHeader); // Divide o valor do header para pegar o token

            if (isset($arr[1])) {
                $jwt = $arr[1]; // O token JWT está aqui
                try {

                    // Decodificar o token JWT para obter o ID do usuário
                    $decoded = JWT::decode($jwt, new \Firebase\JWT\Key($this->secretKey, 'HS256')); // Decodifica o token
                    $userId = $decoded->user_id; // Pega o ID do usuário do token

                    // Definir os dados a partir do corpo da requisição
                    $spec->id = $data->id;
                    $spec->login = $data->login;
                    $spec->senha = $data->senha;
                    $spec->especificacao = $data->especificacao;
                    $spec->observacao = $data->observacao;
                    $spec->criado_por = $userId; // Usa o ID do usuário decodificado do token

                    // Atualizar a especificação
                    if ($spec->update($data->id)) {
                        http_response_code(200);
                        return json_encode(["message" => "Especificação atualizada com sucesso."]);
                    } else {
                        http_response_code(500);
                        return json_encode(["message" => "Erro ao atualizar especificação."]);
                    }
                } catch (Exception $e) {
                    http_response_code(401); // Token inválido
                    return json_encode(["message" => "Acesso não autorizado. Token inválido."]);
                }
            }
        }

        // Caso o token não seja encontrado no cabeçalho
        http_response_code(401);
        return json_encode(["message" => "Token não encontrado"]);
    }



    public function deleteSpec($data)
    {

        // Conectar ao banco de dados
        $database = new Database();
        $db = $database->getConnection();

        // Instanciar o modelo Spec
        $spec = new Spec($db);

        // excluir a especificação
        if ($spec->deleteSpec($data->id)) {
            http_response_code(200);
            return json_encode(["message" => "Especificação excluída com sucesso."]);
        } else {
            http_response_code(500);
            return json_encode(["message" => "Erro ao excluir especificação."]);
        }
    }
}
