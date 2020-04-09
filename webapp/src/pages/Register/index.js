import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Link faz com que as páginas de nossa aplicação não sejam carregadas toda vez que acessadas
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.png';

export default function Register() {
    // NAVEGACAO ATRAVES DO JS UTILIZADO PARA REDIRECIONAMENTOS APOS ACOES DA API
    const history = useHistory();

    // ARMAZENANDO OS ESTADOS DE CADA INPUT DA PAGINA
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    // FUNCAO PARA ENVIAR PARA A API OS VALORES PARA CADASTRO
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name, 
            email,
            whatsapp,
            city,
            uf
        };

        try {
            const response = await api.post('/ongs', data);
            alert(`Seu ID de acesso é: ${response.data.id}`);
            history.push('/'); // QDO NAO PODEMOS UTILIZAR A TAG Link, UTILIZAMOS ESTE METODO PARA REDIRECIONAR O USUARIO
        } catch (err) {
            alert(`Erro no cadastro: ${err}`);
        }
    
    }


    return (
        <div className="register-container">
            <div className="register-content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e14242" />
                        Voltar para o logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        type="text" 
                        placeholder="Nome da ONG" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Whatsapp" 
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />
                    <div className="input-group">
                        <input 
                            type="text" 
                            placeholder="Cidade" 
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input 
                            type="text" 
                            placeholder="UF" 
                            style={{ width: 80 }}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}