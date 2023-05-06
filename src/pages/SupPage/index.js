import React from 'react'
import './SupPage.css'
import supIcon from '../../assets/supSymbol.svg'
import voltarIcon from '../../assets/arrow.svg'
import { Link } from 'react-router-dom'

const SupPage = () => {
    return (
        <div className='telaSuporte'>
            <header className='headerSup'>

                <Link className='linkHeaderSup' to='/dashboard'><img src={voltarIcon} alt='icone de voltar'/></Link>

                <p className='supText'>Suporte</p>

            </header>

            <div className='conteudoSup'>

                <img src={supIcon} alt='Icone de suporte' />

                {/* <form className='formSup'>
                    <label for="nome" >Nome</label>
                    <input type='text' id='nome' placeholder='Nome'/>
                    <label for="pin" >Pin</label>
                    <input type='text' inputMode='numeric' id='pin' placeholder='Pin'/>
                    <label for="email" >E-mail</label>
                    <input type='email' inputMode='email' id='email' placeholder='E-mail'/>
                    <label for="descricao" >Descrição do problema</label>
                    <textarea id='descricao'></textarea>
                    <button>Enviar</button>
                </form> */}

                <div className='contatosSup'>
                    <h3>Contatos:</h3>
                    <div>
                        <p>Membro do Suporte 1:</p>
                        <p>(91) 91234-5678</p>
                        <p>meuemail@email.com</p>
                    </div>
                    <div>
                        <p>Membro do Suporte 2:</p>
                        <p>(91) 91234-5678</p>
                        <p>meuemail@email.com</p>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SupPage;