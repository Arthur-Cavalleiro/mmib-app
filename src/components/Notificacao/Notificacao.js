import './Notificacao.css';
import notificacaoImg from '../../assets/notificacao.svg';

const Notificacao = (props) => {
    return (
        <div className='notificacao'>
            <img src={notificacaoImg} alt='Logo de notificacao' />
            <div className='textoNotificacao' >
                <h2>Sensor: {props.tituloNotificacao}</h2>
                <div className='infoTextoNotificacao' >
                    <p>Data: {props.dataNotificacao}</p>
                    <p>Hora: {props.horaNotificacao}</p>
                </div>
            </div>
        </div>
    )
}

export default Notificacao;