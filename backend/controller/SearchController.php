<?php
require_once '../config/Database.php';
require_once '../model/Spec.php';

class SearchController
{

    public function search($params)
    {
        // Conectar ao banco de dados
        $database = new Database();
        $db = $database->getConnection();

        // Instanciar o modelo Spec
        $spec = new Spec($db);

        // verificar se parametro (q) foi enviado
        if (isset($params['q'])) {
            $q = $params['q'];
            $stmt = $spec->search($q);
            $num = $stmt->rowCount();
            if ($num > 0) {
                $specs_arr = [];
                while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                    extract($row);
                    $spec_item = [
                        "id" => $id,
                        "login" => $login,
                        "senha" => $senha,
                        "especificacao" => $especificacao,
                        "observacao" => $observacao,
                        "criado_por" => $criado_por
                    ];
                    array_push($specs_arr, $spec_item);
                }
                return json_encode($specs_arr);
            } else {
                http_response_code(404);
                return json_encode(["message" => "Nenhuma especificação encontrada"]);
            }
        } else {
            http_response_code(400);
            return json_encode(["message" => "Erro ao buscar especificações. Tente novamente."]);
        }
    }
}
