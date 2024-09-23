import { FaUser, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <section className="container_home">
            <h1>Bem-vindo ao React Password Manager</h1>
            <p>Este sistema permite que você cadastre e gerencie informações de forma simples e eficiente. Veja abaixo algumas das principais funcionalidades:</p>

            <section className="container_cards">

                <div className="card" >
                    <div className='img'>
                        <FaUser></FaUser>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Cadastro de Informações</h5>
                        <p className="card-text">Cadastre dados como login, senha e uma observação adicional.</p>

                    </div>
                </div>


                <div className="card" >
                    <div className='img'>
                        <FaSearch />
                    </div>

                    <div className="card-body">
                        <h5 className="card-title">Consulta</h5>
                        <p className="card-text">Utilize a funcionalidade de pesquisa para consultar rapidamente informações cadastradas.</p>

                    </div>
                </div>


                <div className="card" >
                    <div className='img'>
                        <FaEdit></FaEdit>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Editar Senhas</h5>
                        <p className="card-text">Altere as senhas e outras informações cadastradas a qualquer momento.</p>

                    </div>
                </div>

                <div className="card" >
                    <div className='img'>
                        <FaTrash></FaTrash>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">Excluir Senhas</h5>
                        <p className="card-text">Exclua senhas e informações que não são mais necessárias.</p>

                    </div>
                </div>
            </section>

            <section>
                <Link to="/dashboard" className=' btn-enter'>Conhecer</Link>

            </section>


        </section >
    );
}

export default Home;
