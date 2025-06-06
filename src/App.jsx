
import { useState, useEffect } from "react";
import { api } from "./api/api.ts";
import { useNavigate } from "react-router";
import style from "./App.module.css"
import Eye from "./assets/icons8-eye.gif"
import Contact from './Contact'


function App() {
  const navigate = useNavigate()

  const [email, setEmail] =  useState('')
  const [password, setPassword] =  useState('')
  const [user, setUser] =  useState(null)
  const [message, setMessage] =  useState('')
  const [showPassword,  setShowPassword] = useState(false)

  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const response = await api.post('/login',{email, password})
      const user = response.data

      localStorage.setItem('user', JSON.stringify(user));
      setUser(user)
      navigate('/dashboard')
    } catch (error) {
      setMessage('Erro no login' + (error.response?.data?.message || 'Verifique os dados'))
    }
  }

  const handleContactClick = () => {
    navigate('/contact')
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if(storedUser){
      setUser(JSON.parse(storedUser))
      navigate('/dashboard')
    }
  },[navigate])
  return (
    <div className={style.wrapLogin}> 
      <div className={style.wrapImg}>
        <div className={style.degrade}>

        </div>
        
      </div>
      <div className={style.wrapForm}>
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <div style={{position: "relative", width: "100%"}}>
            <input type={showPassword ? 'text' : 'password'} placeholder='Senha' value={password} onChange={(e) => setPassword(e.target.value)} required />
            <img onClick={() => setShowPassword(prev => !prev)} style={{position: "absolute", width: '20px', borderRadius: '100%', right: '10px', top: '10px', cursor: 'pointer'}} src={Eye} alt="Olho da senha" />
          </div>
        <button type='submit'>Entrar</button>
        <p className={style.userCad}>Cadastrar usuário</p>
        <p>{message}</p>
        </form>
        <div className={style.wrapContact}>
              <button onClick={handleContactClick}>Entrar em Contato</button>
            </div>
      </div>
    </div>
  )
}

export default App
