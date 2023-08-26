import { Manager, Socket } from "socket.io-client"


export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')
    const socket = manager.socket('/')
    addListeners(socket)
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!
    const messageForm = document.querySelector<HTMLFormElement>('#message-form')!
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!
    const clientsUl = document.querySelector('#clients-ul')!
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!

    // socket para ver el estado del cliente
    socket.on('connect', () =>{
        serverStatusLabel.innerHTML = 'connected'
    })
    socket.on('disconnect', () =>{
        serverStatusLabel.innerHTML = 'disconnected'
    })
    // para ver en el servidor los id's de los clientes conectados
    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach( clientId => {
            clientsHtml += `
                <li>${ clientId }</li>
            `
        });
        clientsUl.innerHTML = clientsHtml;
    })

    // mensaje para que escuche el servidor
    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if( messageInput.value.trim().length <= 0 ) return;

        socket.emit('message-from-client', { 
            id: 'YO!!', 
            message: messageInput.value 
        });

        messageInput.value = '';
    })

    // mensajes del servidor
    socket.on('message-from-server', ( payload: { fullName: string, message: string }) => {
        const newMessage = `
            <li>
                <strong>${ payload.fullName }</strong>
                <span>${ payload.message }</span>
            </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append( li );

    })
}