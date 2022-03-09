import React, { useState, useEffect, useRef } from 'react'
import socket from './socket';
import '../App.css';

const Chat = ({ name }) => {
    const [msg, setMsg] = useState('');
    const [msgs, setMsgs] = useState([]);

    useEffect(() => {
        socket.emit('conectado', name);
    }, [name]);

    useEffect(() => {
        socket.on('mensajes', mensaje => {
            setMsgs([...msgs, mensaje]);
        });

        return () => {
            socket.off();
        }
    }, [msgs]);

    // Auto scroll
    const divRef = useRef(null);
    useEffect(() => {
        divRef.current.scrollIntoView({ behavior: 'smooth' });
    });

    const submit = (e) => {
        e.preventDefault();
        socket.emit('mensaje', name, msg);
        setMsg('');
    }


    return (
        <div>
            <div className='chat'>{msgs.map((el, idx) => <div key={idx}>
                    <div>{el.name}</div>
                    <div>{el.message}</div>
                </div>)}

                <div ref={divRef}></div>
            </div>

            <form onSubmit={submit}>
                <label htmlFor="">Escriba su mensaje</label>
                <textarea name="" id="" cols="30" rows="10" value={msg} onChange={e => setMsg(e.target.value)}></textarea>

                <button type="submit">Enviar</button>
            </form>
        </div>
        
    )
};

export default Chat;