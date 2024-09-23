import { useState } from 'react'

// icons
import { HiTrash, HiMiniPencilSquare } from "react-icons/hi2";

// axios
import axios from 'axios'

// import sweetalert2
import Swal from 'sweetalert2'

// components
import Loading from '../Loading/Loading'

const ModalSearch = ({ search, results, onClose, onDeleteSuccess, onEdit }) => {

    const [isLoading, setIsLoading] = useState(false)

    //chamada a api
    const apiURL = import.meta.env.VITE_API_URL


    const handleDelete = (item) => async () => {

        setIsLoading(true);
        try {
            const token = sessionStorage.getItem('token'); // Recupera o token do sessionStorage

            if (!token) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Token não encontrado. Por favor, faça login novamente.',
                    confirmButtonText: "Fechar"
                });
                return;
            }

            const config = {
                headers: {
                    'Authorization': `Bearer ${token}` // Passa o token no cabeçalho de Authorization
                }
            };

            const response = await axios.delete(`${apiURL}/spec`, {
                data: { id: item },
            }, config);

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso',
                    text: `${response.data.message}`,
                    confirmButtonText: "Fechar"
                });

                // Chama a função de sucesso para atualizar os resultados
                onDeleteSuccess(item);

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
            setIsLoading(false);
        }

    }


    const handleEdit = (item) => async () => {
        onEdit(item); // Chama a função de edição passando o item selecionado
        onClose(); // Fecha o modal após clicar em editar
    };


    return (

        <>
            {isLoading && <Loading />}
            <div className="modal fade show" tabIndex="-1" style={{ display: 'block' }} aria-modal="true" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Resultados de busca para {search}</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            {/* table com os resultados */}
                            <table className="table  table-hover table-responsive">
                                <thead>
                                    <tr>
                                        <th>Especificação</th>
                                        <th>Login</th>
                                        <th>Senha</th>
                                        <th>Observação</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.especificacao}</td>
                                            <td>{item.login}</td>
                                            <td>{item.senha}</td>
                                            <td>{item.observacao}</td>
                                            <td>
                                                <button className="btn btn-sm btn-danger" onClick={handleDelete(item.id)}><HiTrash /></button>
                                                <button className="btn btn-sm btn-warning" onClick={handleEdit(item)}><HiMiniPencilSquare /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={onClose}>Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default ModalSearch
