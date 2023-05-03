import React, {useEffect, useState } from "react";
import './AdmPage.css';
import homeSvg from '../../assets/home.svg';

const AdmPage = () => {

    // const [name, setName] = useState('');
    const [jsonData, setJsonData] = useState('');


    useEffect(() => {
        fetch('./data.json', {
            headers: {
                Accetp: "application/json"
            }
        }).then(res => res.json())
            .then(res => setJsonData(res))
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

            <section className="notificacoes">
                {}
            </section>
        </div>
    );
}

export default AdmPage;