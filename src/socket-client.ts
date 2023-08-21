import { Manager, Socket } from "socket.io-client"


export const connectToServer = () => {
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')
    const socket = manager.socket('/')
    addListeners(socket)
}

const addListeners = (socket: Socket) => {
    const serverStatusLabel = document.querySelector('#server-status')!
    socket.on('connect', () =>{
        serverStatusLabel.innerHTML = 'connected'
    })
    socket.on('disconnect', () =>{
        serverStatusLabel.innerHTML = 'disconnected'
    })
}