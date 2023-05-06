import React, {useEffect, useState } from "react";
import './AdmPage.css';
import homeSvg from '../../assets/home.svg';
import Notificacao from "../../components/Notificacao/Notificacao";
import Status from "../../components/Status/Status";
import { Link } from "react-router-dom";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AdmPage = () => {

    // const [name, setName] = useState('');
    const [notify, setNotify] = useState([]);
    const [isAlarmActive, setIsAlarmActive] = useState(false);
    const [buttonColor, setButtonColor] = useState("");
    const [textButton, setTextButton] = useState("Ligado");


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

    const changeAlarm = () => {
        console.log("entrou")
        if (isAlarmActive) {
            setIsAlarmActive(false);
            setButtonColor("#3FCF4D");
            setTextButton("Ligado");
        } else {
            setIsAlarmActive(true);
            setButtonColor("#CD1515");
            setTextButton("Desligado");
        }
    }

      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

    return (
        <div className="telaDashboard">
            <header className="header">
                <div className="homeIcon">
                    <img onClick={handleClickOpen} src={homeSvg} alt="Imagem de um símbolo de casa" />
                    <Dialog
                        open={open}
                        TransitionComponent={Transition}
                        keepMounted
                        onClose={handleClose}
                    >
                        <DialogTitle>Menu Gerente</DialogTitle>
                        <DialogActions className="linksMenuPopupConteiner">
                            <Link className="linkMenuPopup" to='/suporte' onClick={handleClose}>Suporte</Link>
                            <Link className="linkMenuPopup" to='/' onClick={handleClose}>Sair</Link>
                        </DialogActions>
                    </Dialog>
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

            <section className="statusSensores">
                <Status nomeSensor="Sensor de Temperatura"/>
                <Status nomeSensor="Sensor de Alarme 1"/>
                <Status nomeSensor="Sensor de Alarme 2"/>
                <Status nomeSensor="Sensor de Alarme 3"/>
            </section>

            <section className="botaoAlarmeContainer">
                <h3>Alarme</h3>
                <button onClick={changeAlarm} className="botaoAlarme" style={{borderColor: buttonColor}}>Clique</button>
                <h3>{textButton}</h3>
            </section>

        </div>
    );
}

export default AdmPage;