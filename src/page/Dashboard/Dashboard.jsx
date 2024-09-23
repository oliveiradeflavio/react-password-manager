// import react
import { useState } from "react"

// import sweetalert2
import Swal from 'sweetalert2'

// icons
import { FaSearch } from 'react-icons/fa'

// import axios
import axios from 'axios'

// components
import ModalSearch from "../../components/ModalSearch/ModalSearch"
import Loading from "../../components/Loading/Loading"


const Dashboard = () => {

    const [isLoading, setIsLoading] = useState(false)
    const [id, setId] = useState('')
    const [especificacao, setEspecificacao] = useState('')
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [observacao, setObservacao] = useState('')
    const [busca, setBusca] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [searchResults, setSearchResults] = useState(null)
    const [isEditing, setIsEditing] = useState(false);

    //chamada a api
    const apiURL = import.meta.env.VITE_API_URL

    const getAutenticacao = async () => {
        setIsLoading(true)
        try {
            const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // Passa o token no cabeçalho de Authorization
                }
            };

            // verificando se é alteração ou salvar para mudar o método POST:salvar ou PUT:alterar
            let response;
            if (isEditing) {
                response = await axios.put(`${apiURL}/spec`, {
                    id: id,
                    especificacao: especificacao,
                    login: login,
                    senha: senha,
                    observacao: observacao
                }, config);
            } else {
                response = await axios.post(`${apiURL}/spec`, {
                    especificacao: especificacao,
                    login: login,
                    senha: senha,
                    observacao: observacao
                }, config);
            }

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: `${response.data.message}`,
                    confirmButtonText: "Fechar"
                });
                clearInputs();
                setIsEditing(false); // Reseta para modo de salvar
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: `${response.data.message}`,
                    confirmButtonText: "Fechar"
                });
            }

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: `${error}`,
                confirmButtonText: "Fechar"
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const dados = {
            especificacao: especificacao,
            login: login,
            senha: senha,
        }

        const verificaInputs = Object.values(dados).some((input) => input === '')
        if (verificaInputs) {
            Swal.fire({
                icon: 'error',
                title: 'Atenção',
                text: 'Preencha todos os campos',
                confirmButtonText: "Fechar"
            })
            return false
        }

        getAutenticacao()
    }

    const clearInputs = () => {
        setEspecificacao('')
        setLogin('')
        setSenha('')
        setObservacao('')
    }

    const handleSubmitSearch = async (e) => {
        e.preventDefault()

        if (busca === '') {
            return false
        }

        setIsLoading(true)
        try {

            const response = await axios.get(`${apiURL}/search?q=${busca}`)

            // atualiza o estado com os resultados da busca
            setSearchResults(response.data)
            setShowModal(true)


        } catch (error) {
            if (error.response.status === 404) {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: 'Nenhuma especificacao encontrada'
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Atenção',
                    text: `${error}`
                })
            }
        } finally {
            setIsLoading(false)
        }

    }

    // atualizando a lista de resultados o modal
    const handleDeleteSuccess = (deleteId) => {
        // atualiza a lista 
        setSearchResults((prevResults) => prevResults.filter(item => item.id !== deleteId))
    }

    // Função para preencher os campos do formulário quando o item for editado
    const handleEdit = (item) => {
        setId(item.id)
        setEspecificacao(item.especificacao);
        setLogin(item.login);
        setSenha(item.senha);
        setObservacao(item.observacao);
        setIsEditing(true); // Define que estamos no modo de edição
    };


    return (
        <>
            {isLoading && <Loading />}
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container_form_search">
                                <form onSubmit={handleSubmitSearch}>
                                    <div className="input-group">
                                        <input type="search" className="form-control" placeholder="Pesquisar" onChange={(e) => setBusca(e.target.value)} value={busca} />
                                        <button className="btn btn-primary" type="submit"><FaSearch /></button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Condicional para exibir o modal */}
                {showModal && (
                    <ModalSearch
                        search={busca}
                        results={searchResults}
                        onClose={() => setShowModal(false)}
                        onDeleteSuccess={handleDeleteSuccess} //Atualiza a lista de busca depois que algum item é excluído
                        onEdit={handleEdit} // Passa a função de edição
                    />
                )}
            </section>


            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="container_form">
                                <form onSubmit={handleSubmit}>
                                    <label>Especificação</label>
                                    <input type="text" className="form-control" onChange={(e) => setEspecificacao(e.target.value)} value={especificacao} />

                                    <label>Login</label>
                                    <input type="text" className="form-control" onChange={(e) => setLogin(e.target.value)} value={login} />

                                    <label>Senha</label>
                                    <input type="text" className="form-control" onChange={(e) => setSenha(e.target.value)} value={senha} />

                                    <label>Observação</label>
                                    <textarea className="form-control" rows="3" onChange={(e) => setObservacao(e.target.value)} value={observacao}></textarea>

                                    <button type="submit" className={isEditing ? "btn btn-warning" : "btn btn-primary"}>
                                        {isEditing ? "Alterar" : "Salvar"}
                                    </button>

                                </form>

                            </div>
                        </div>
                    </div>
                </div>


            </section>


        </>
    )
}

export default Dashboard