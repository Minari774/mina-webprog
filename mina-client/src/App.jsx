import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="App">
       <header className="App-header"></header>
        <h1>Welcome to My React App!</h1>
        <p>
          Name: [Luigi Mina]<br />
          Email: [luigimina36@gmail.com]<br />
          Other Personal Info: <a href="https://github.com/Minari774/mina-webprog.git">github repository</a> 
        </p>
    </div>
        );}


