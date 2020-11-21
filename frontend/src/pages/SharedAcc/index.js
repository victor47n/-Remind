import React, { useState } from 'react';
import api from '../../sevices/api';
import jwt from 'jsonwebtoken';
import './styles.css';
import vinc from '../../assets/vinculation.svg'

export default function SharedAcc({ match }) {

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [already, setAlready] = useState(false);


    async function handleVincConfirmation(e) {
        e.preventDefault();

        const data = {
            token: match.params.token
        };

        try {

            const response = await api.put('/autorizacao_update', data)
            console.log(response);
            if (response.data) {
                setIsConfirmed(true);

            } else {
                
                setAlready(true);

            }

        } catch (error) {
            alert("Erro da api");
        }

    }

    const confirmation = () => {
        if (!already) {
            return (
                <div className="form">

                    <p>Vincular Contas</p>
                    <p className="subTitle">Deseja vincular sua conta e dar acesso ao gerenciamento de seus lembretes?  </p>
                    <form onSubmit={handleVincConfirmation}>
                        <button className="button" type="submit">CONFIRMAR VINCULO</button>
                    </form>

                </div>
            )
        } else {
            return (
                <div className="form">

                    <p>Essa conta já havia sido vinculada</p>

                </div>
            )

        }


    }
    const confirmed = () => {

        if (!already) {
            return (
                <div className="form">

                    <p>Vinculo Confirmado</p>

                </div>
            )
        } else {
            return null;
        }

    }

    return (
        <div className="app">

            <div className="container">
                <div className="img">
                    <img src={vinc} alt="Vinculo" />
                </div>
                {isConfirmed ? confirmed() : confirmation()}

            </div>

        </div>
    );
}