// import de react
import { Link, useNavigate } from "react-router-dom"

// heroicons2
import { HiHome, HiArrowRightCircle, HiSquares2X2, HiUser } from "react-icons/hi2";

import { jwtDecode } from "jwt-decode";

const Navbar = () => {

    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();

    // verificar se o token é valido
    const isTokenValid = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000; // tempo atual em segundos
            return decodedToken.exp > currentTime; //verificar a expiração do token
        } catch (error) {
            return false
        }
    }
    // deslogar usuario
    const logout = () => {
        sessionStorage.removeItem('token');
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <HiHome />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">

                            {/* se o usuario estiver logado, mostraremos o link de Sair. Caso contrário mostrar apenas o botão Entrar */}
                            {token && isTokenValid(token) ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/dashboard">
                                            <HiSquares2X2 />
                                            Dashboard</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link" to="/" onClick={logout}>
                                            <HiArrowRightCircle />
                                            Sair</button>
                                    </li>
                                </>
                            ) : (

                                <li className="nav-item">
                                    <Link className="nav-link" to="/autenticacao">
                                        <HiUser />
                                        Entrar</Link>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar