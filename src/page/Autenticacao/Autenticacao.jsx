// import react
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// sweet alert
import Swal from 'sweetalert2'

// import axios
import axios from 'axios'

// components
import Loading from "../../components/Loading/Loading"


const Autenticacao = () => {

    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    // chamada a api
    const apiURL = import.meta.env.VITE_API_URL


    const getAutenticacao = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post(`${apiURL}/login`, {
                usuario: usuario,
                senha: senha
            });

            if (response.status === 200) {
                sessionStorage.setItem('token', response.data.token); // Armazena o token
                navigate('/dashboard');
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: `${response.data.message}`,
                    confirmButtonText: "Fechar"
                });
            }

        } catch (error) {
            // Verifique se a resposta contém informações
            if (error.response) {
                // A requisição foi feita e o servidor respondeu com um status de erro
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: error.response.data.message || "Credenciais inválidas.",
                    confirmButtonText: "Fechar"
                });
            } else {
                // Se a requisição falhou antes de chegar ao servidor
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: "Não foi possível autenticar, tente novamente em alguns instantes",
                    confirmButtonText: "Fechar"
                });
            }
        } finally {
            setIsLoading(false)
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        const autenticacao = {
            usuario: usuario,
            senha: senha
        }

        const verificaInputs = Object.values(autenticacao).some((input) => input === '')
        if (verificaInputs) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'Preencha todos os campos',
                confirmButtonText: "Fechar"

            })
            return
        } else {

            getAutenticacao()
        }

    }

    return (
        <>
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card_login">
                                <div className="card-body">
                                    <h5 className="card-title">Autenticação</h5>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Usuário de acesso</label>
                                            <input type="text" className="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} />

                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Senha</label>
                                            <input type="password" className="form-control" value={senha} onChange={(e) => setSenha(e.target.value)} />
                                        </div>

                                        {isLoading ? (
                                            <>
                                                <Loading />
                                                <button type="submit" className="btn btn-primary" disabled>Carregando...</button>
                                            </>
                                        ) : (
                                            <button type="submit" className="btn btn-primary">Entrar</button>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section >


        </>
    )
}

export default Autenticacao