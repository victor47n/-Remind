import React, { useState }  from 'react';
import api from '../../sevices/api';
import './styles.css';
import useRouter from "use-react-router"
import { matchPath } from "react-router-dom"

export default function Recovery() {
const [password, setPassword] = useState('');
const [passwordConf, setPasswordConf] = useState('');


function handleConfirmation(e) {
    const params = useParams("/forgot_password/:email=:token");
    const {token, email} = params
    e.preventDefault();
    if(password === passwordConf){
      const data = {
        email,
        token,
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

export default function useParams(path) {
    const { location } = useRouter()
    const { pathname } = location
  
    const pattern = `(.*)?${path}`
    const match = matchPath(pathname, { path: pattern }) || {}
  
    return match.params
  }

    return(
        <div className="body">
    
        <div>
            
        <h1>Recuperar Senha</h1>

        <p>Preencha os campos corretamente para que sua senha seja redefinida.</p>

        </div>

        <form onSubmit={handleConfirmation}>
            <div>
            <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" type="password"/>
            <input value={passwordConf} onChange={e => setPasswordConf(e.target.value)}  placeholder="ConfirmarSenha" type="password"/>
            </div>

            <button className="button" type="submit">CONFIRMAR</button>
        </form>

        </div>
    );
}