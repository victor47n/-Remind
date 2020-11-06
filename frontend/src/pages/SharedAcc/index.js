import React, { useState } from 'react';
import api from '../../sevices/api';

import './styles.css';
import vinc from '../../assets/vinculation.svg'

export default function SharedAcc({ match }) {
    const [email, setEmail] = useState('');
    

    

    return (
        <div className="app">


            <div className="container">
                <div className="img">
                    <img src={vinc} alt="Vinculo" />
                </div>

                <div className="form">

                    <p>Vincular Contas</p>
                    <p className="subTitle">Deseja vincular sua conta e dar acesso a criação de lembretes ao email loremipsum@ipsum.com?  </p>
                      


            
                        <button className="button" type="submit">CONFIRMAR VINCULO</button>
                    

                </div>
            </div>


        </div>
    );
}