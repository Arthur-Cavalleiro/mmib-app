import './LoginPage.css';
import backIMG from '../../assets/silhueta.png';
import { useState } from 'react';

const LoginPage = () => {
    const [pin, setPin] = useState('');
    
    const aoClicar = () => {
        
        alert("Seu pin é: " + pin)
    }

    const limitarInput = (evento) => {
        if (evento.target.value.length > 5) {
            evento.preventDefault();
        }
    }

    return (
        <div className="container">
            <div className="card">
                <div className="image">
                    <img src={backIMG} alt='Imagem da silhueta de uma pessoa'></img>
                </div>      
                <div className="title">
                    <h1>Login</h1>
                </div>
                <div className="form">
                    <input
                        maxLength={5}
                        onKeyDown={limitarInput}
                        type="text"
                        inputMode='numeric'
                        value={pin}
                        onChange={valor => setPin(valor.target.value)}
                        autoComplete="off"
                        placeholder="Informe o seu PIN"
                    />
                </div>
                <div className="button">
                    <button onClick={aoClicar}>ENTRAR</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;