// import 
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


// verificação do token 
const isTokenValid = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // tempo atual em segundos
        return decodedToken.exp > currentTime; //verificar a expiração do token
    } catch (error) {
        return false
    }
}

// rotas protegidas 
const ProtectedRoute = ({ children }) => {
    const token = sessionStorage.getItem('token');

    // se o token for invalido redireciona para a página de login
    if (!token || !isTokenValid(token)) {
        return <Navigate to="/autenticacao" />;
    }

    // se o token for valido retorna o componente
    return children;
}

export default ProtectedRoute