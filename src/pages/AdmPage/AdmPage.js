import React, { useEffect, useState, /*useMemo*/ } from "react";
import './AdmPage.css';
import homeSvg from '../../assets/home.svg';
import Notificacao from "../../components/Notificacao/Notificacao.js";
import Status from "../../components/Status/Status.js";
import { Link } from "react-router-dom";
import JsonServerHandler from "../../services/index.js";
// import { io } from "socket.io-client";

import { Dialog, DialogActions, DialogTitle, Slide }from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AdmPage = () => {
  const [notify, setNotify] = useState([]);
  // const socket = useMemo(() => io('http://localhost:3001/'), []);
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [buttonColor, setButtonColor] = useState("");
  const [textButton, setTextButton] = useState("Ligado");

  // useEffect(() => {
  //   fetch('./data.json', {
  //     headers: {
  //       Accetp: "application/json"
  //     }
  //   })
  //   .then(res => res.json())
  //   .then(({ notificacoes }) => setNotify(notificacoes))
  //   .catch((err) => {
  //     console.log(err);
  //   });
  // }, []);

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
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  const buscarNotificacoes = () => {

    JsonServerHandler
    .get("/")
    .then((response) => {
    if (Array.isArray(response.data)) {
    console.log(response.data);
    setNotify(response.data);
    } else {
    console.log('A resposta da API não é um array:', response.data);
    }
    })
    .catch((err) => {
    console.error("" + err);
    });
   }

  useEffect(() => {
    buscarNotificacoes();
  }, []);

  const adicionarNotificacao = (sensor) => {
    const date = new Date();
    const dateJson = date.toLocaleDateString("pt-BR");
    const timeJson = date.toLocaleTimeString("pt-BR");
   
    JsonServerHandler.post('/', {
    tituloNotificacao: sensor,
    data: dateJson,
    hora: timeJson
    })
    .then(response => {
    console.log('Notificação adicionada com sucesso:', response.data);
    buscarNotificacoes();
    })
    .catch(error => {
    console.error('Erro ao adicionar notificação:', error);
    });
   }

  useEffect(() => {
    const keyboardActivation = (e) => {
      e.preventDefault();
      switch (e.code) {
        case "KeyQ":
          adicionarNotificacao("Temperatura");
          break;
  
        case "KeyW":
          adicionarNotificacao("Movimento");
          break;
  
        case "KeyE":
          adicionarNotificacao("Presença");
          break;
      
        default:
          console.log(e.code);
          break;
      }
    }
    
    window.addEventListener('keydown', e => keyboardActivation(e));
  }, []);

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
        {[...notify].reverse().map((item, index) => 
          <Notificacao
          key={`notify-${index}`}
          tituloNotificacao={item.tituloNotificacao}
          dataNotificacao={item.data}
          horaNotificacao={item.hora}
          />)
        }
      </section>
      <section className="statusSensores">
        <Status nomeSensor="Sensor de Temperatura"/>
        <Status nomeSensor="Sensor de Alarme 1"/>
        <Status nomeSensor="Sensor de Alarme 2"/>
        <Status nomeSensor="Sensor de Alarme 3"/>
      </section>
      <section className="botaoAlarmeContainer">
          <h3>Alarme</h3>
          <button 
            onClick={changeAlarm} 
            className="botaoAlarme" 
            style={{ borderColor: buttonColor }}
          >
            Clique
          </button>
          <h3>{textButton}</h3>
      </section>
    </div>
  );
}

export default AdmPage;