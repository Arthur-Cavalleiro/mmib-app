import 'Notificacao.css';

const Notificacao = (props) => {
    return (
        <div className='notificacao'>
            <img src='' alt='' />
            <h2>Sensor: {props.tituloNotificacao}</h2>
            <p>Data: {props.dataNotificacao}</p>
            <p>Hora: {props.horaNotificacao}</p>
        </div>
    )
}

export default Notificacao;