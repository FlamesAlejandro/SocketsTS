import { connectToServer } from './socket-client'
import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>WebSockets - Clients</h1>
    <span>offline</span>
  </div>
`
connectToServer()
