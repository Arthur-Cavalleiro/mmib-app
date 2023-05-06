import "./Status.css";

const Status = (props) => {
    return (
        <>
            <div className="statusContainer" >
                <div className="nomeDoSensor">
                    <p>{props.nomeSensor}</p>
                </div>
                <div>
                    <p>Status</p>
                    <div className="divStatus"></div>
                </div>
            </div>
        </>
    )
}

export default Status;