import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; // Link faz com que as páginas de nossa aplicação não sejam carregadas toda vez que acessadas
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function NewIncident() {
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId,
                }
            });

            // RETORNA O USUARIO PARA A PAGINA DE PROFILE APOS CADASTRAR UM NOVO INCIDENTE
            history.push('/profile');
        } catch(err) {
            alert('Erro ao cadastrar o incidente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="register-content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói que irá ajudá-lo a resolver este incidente.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e14242" />
                        Voltar para Incidentes
                    </Link>
                </section>

                <form>
                    <input 
                        type="text" 
                        placeholder="Tĩtulo do caso" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        type="text" 
                        placeholder="Valor em R$" 
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />
                    <button className="button" type="submit" onClick={handleNewIncident}>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
