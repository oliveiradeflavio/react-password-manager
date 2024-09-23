<?php

require_once __DIR__ . '/../vendor/autoload.php';


// Habilitar CORS para permitir requisições do frontend React
header("Access-Control-Allow-Origin: *"); // Permitir todas as origens
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Obter a rota completa a partir da URL
$request_uri = $_SERVER['REQUEST_URI'];
$request_method = $_SERVER['REQUEST_METHOD'];

// Definir o prefixo da API
$api_prefix = '/backend/public/api/';

// Verificar se a URL contém o prefixo "/api/"
if (strpos($request_uri, $api_prefix) !== false) {
    // Extrair apenas a parte da rota que vem após "/api/"
    $route = substr($request_uri, strpos($request_uri, $api_prefix) + strlen($api_prefix));

    // Remover qualquer parâmetro da query string, se houver (ex: ?id=1)
    $route = strtok($route, '?');

    // Se a requisição for do tipo OPTIONS, retorne uma resposta 200
    if ($request_method === 'OPTIONS') {
        http_response_code(200);
        exit();
    }
} else {
    http_response_code(404);
    echo json_encode(["message" => "Rota não encontrada"]);
    exit();
}

// Switch para determinar qual rota foi chamada
switch ($route) {
    case 'login':
        if ($request_method === 'POST') {
            require_once '../controller/AuthController.php';
            $authController = new AuthController();
            $data = json_decode(file_get_contents("php://input"));
            echo $authController->login($data);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido"]);
        }
        break;

    case 'spec':
        if ($request_method === 'POST') {
            require_once '../controller/SpecController.php';
            $specController = new SpecController();
            $data = json_decode(file_get_contents("php://input"));
            echo $specController->createSpec($data);
        } else if ($request_method === 'PUT') {
            require_once '../controller/SpecController.php';
            $specController = new SpecController();
            $data = json_decode(file_get_contents("php://input"));
            echo $specController->updateSpec($data);
        } else if ($request_method === 'DELETE') {
            require_once '../controller/SpecController.php';
            $specController = new SpecController();
            $data = json_decode(file_get_contents("php://input"));
            echo $specController->deleteSpec($data);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido"]);
        }
        break;

    case 'search':
        if ($request_method === 'GET') {
            require_once '../controller/SearchController.php';
            $searchController = new SearchController();
            echo $searchController->search($_GET);
        } else {
            http_response_code(405);
            echo json_encode(["message" => "Método não permitido"]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Rota não encontrada"]);
        break;
}
