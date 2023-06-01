import './LoginPage.css';
import backIMG from '../../assets/silhueta.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    const [accptableCadastro, setAcceptableCadastro] = useState('');
    const [pin, setPin] = useState('');
    const [inpStyle, setInpStyle] = useState('form');
    const [aviso, setAviso] = useState('nAvisar');

    useEffect(() => {
        fetch('./data.json', {
            headers: {
                Accetp: "application/json"
            }
        }).then(res => res.json())
            .then(res => setAcceptableCadastro(res.cadastros))
            .catch((err) => {
                console.log(err);
            })
    }, []);

    const aoClicar = (evento) => {

        // alert("Seu pin é: " + pin);
        // alert("Pins possíveis: " + accptableCadastro);

        let contem = false;
        let index = 0;

        accptableCadastro.forEach(e => {
            if (e["pins"].includes(pin)) {
                contem = true;
                index = accptableCadastro.indexOf(e);
            }
        });

        if (contem) {
            //troca de tela pro gerenciamento
            setInpStyle("form");
            setAviso("nAvisar");
            localStorage.setItem("user", accptableCadastro[index]["user"])
            return true;
        } else {
            evento.preventDefault();
            setInpStyle("formNegado");
            setAviso("avisar")
            return false;
        }

    }


    const limitarInput = (evento) => {
        if (evento.target.value.length > 5) {
            evento.preventDefault();
        }
    }


    return (
        <div className='telaLogin'>
            <div className="container">
                <div className="card">
                    <div className="image">
                        <img src={backIMG} alt='Imagem da silhueta de uma pessoa'></img>
                    </div>
                    <div className="title">
                        <h1>Login</h1>
                    </div>
                    <div className={inpStyle}>
                        <input
                            maxLength={5}
                            onKeyDown={limitarInput}
                            type="password"
                            inputMode='numeric'
                            value={pin}
                            onChange={valor => setPin(valor.target.value)}
                            autoComplete="off"
                            placeholder="Informe o seu PIN"
                        />
                    </div>
                    <div className="button">
                        <p className={aviso}>Pin incorreto</p>
                        <button><Link className='link' onClick={aoClicar} to="/dashboard" >ENTRAR</Link></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;