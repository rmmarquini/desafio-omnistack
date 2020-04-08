import React from 'react';
import { Link } from 'react-router-dom'; // Link faz com que as páginas de nossa aplicação não sejam carregadas toda vez que acessadas
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import logoImg from '../../assets/logo.png';

export default function NewIncident() {
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
                    <input type="text" placeholder="Tĩtulo do caso" />
                    <textarea placeholder="Descrição" />
                    <input type="text" placeholder="Valor em R$" />
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
