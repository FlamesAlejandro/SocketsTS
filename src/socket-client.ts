import { Manager, Socket } from "socket.io-client"


export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')
    const socket = manager.socket('/')
    addListeners(socket)
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!
    const clientsUl = document.querySelector('#clients-ul')!
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
}