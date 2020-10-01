import React, { useState }  from 'react';
import api from '../../sevices/api';
import './styles.css';


export default function Recovery({ match }) {
const [password, setPassword] = useState('');
const [passwordConf, setPasswordConf] = useState('');

function handleConfirmation(e) {
    
    e.preventDefault();
    if(password === passwordConf){
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

    return(
        <div className="app">
            
                
        <div className="container">
            
    
        <form onSubmit={handleConfirmation}>
            <div>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password"/>
            <input value={passwordConf} onChange={e => setPasswordConf(e.target.value)}  placeholder="ConfirmarSenha" type="password"/>
            </div>

            <button className="button" type="submit">CONFIRMAR</button>
        </form>

        </div>

        

        </div>
    );
}