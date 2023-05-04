import React, {useEffect, useState } from "react";
import './AdmPage.css';
import homeSvg from '../../assets/home.svg';
import Notificacao from "../../components/Notificacao/Notificacao";

const AdmPage = () => {

    // const [name, setName] = useState('');
    const [notify, setNotify] = useState([]);


    useEffect(() => {
        fetch('./data.json', {
            headers: {
                Accetp: "application/json"
            }
        })
        .then(res => res.json())
        .then(({ notificacoes }) => setNotify(notificacoes))
        .catch((err) => {
            console.log(err);
        })
    }, []);

    return (
        <div className="telaDashboard">
            <header className="header">
                <div className="homeIcon">
                    <img src={homeSvg} alt="Imagem de um símbolo de casa" />
                </div>
                <div className="saudacao">
                    <p>{`Bem vindo(a), ${localStorage.getItem("user")}`}</p>
                </div>
            </header>

            <div className="tituloNotificacao">
                <h1>Notificações</h1>
            </div>
            
            <section className="notificacoes">
                {notify.map((item, index) => 
                    <Notificacao
                        key={`notify-${index}`}
                        tituloNotificacao={item.tituloNotificacao}
                        dataNotificacao={item.data}
                        horaNotificacao={item.hora}
                    />
                )}
            </section>
        </div>
    );
}

export default AdmPage;