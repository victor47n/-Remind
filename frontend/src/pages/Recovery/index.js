import React, { useState } from 'react';
import api from '../../sevices/api';

import './styles.css';
import lostMan from '../../assets/lost.png'

export default function Recovery({ match }) {
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');

    function handleConfirmation(e) {

        e.preventDefault();
        if (password === passwordConf) {
            const data = {
                email: match.params.email,
                token: match.params.token,
                password
            };

            try {
                const response = api.post('/reset_password', data)
                alert("Senha trocada");

            } catch (error) {
                alert("Erro da api");
            }

        } else {
            alert("Senhas diferentes");
        }


    }

    return (
        <div className="app">


            <div className="container">
                <div className="img">
                    <img src={lostMan} alt="LostMan" />
                </div>

                <div className="form">

                    <p>Resetar Senha</p>

                    <form onSubmit={handleConfirmation}>
                        <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password" />
                        <input value={passwordConf} onChange={e => setPasswordConf(e.target.value)} placeholder="Confirmar Senha" type="password" />


                        <button className="button" type="submit">RESETAR SENHA</button>
                    </form>

                </div>
            </div>


        </div>
    );
}