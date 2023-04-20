import './ErrorPage.css';
import {Link} from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='telaErro'>
            <div className='caixa'>
                <img className='triste' src='https://png.pngtree.com/png-clipart/20221220/big/pngtree-yellow-sad-emoji-design-with-big-glassy-eyes-png-image_8786136.png' alt='Emoji Triste' />
                <h1>ERRO 404</h1>
                <h3>A pagina não foi encontrada, volte ao menu.</h3>
                <Link className='btnVoltar' to='/'>Voltar</Link>
            </div>
        </div>
    );
}

export default ErrorPage;