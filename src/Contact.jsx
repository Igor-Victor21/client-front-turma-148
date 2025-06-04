import { useState } from "react"

import style from './Contact.module.css'

function Contact() {
 const defaultNumber = "5541999999999"
 const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value})
    }

    const handleZap = () => {
        const { name, email, password } = formData;
      
        const message = `Nome: ${name}%0AEmail: ${email}%0AMensagem: ${password}`;
        const URLzap = `https://api.whatsapp.com/send?phone=${defaultNumber}&text=${message}`;
      
        window.open(URLzap, "_blank");
      };
      

    return(
        <>
        <section className={style.wrapMensagem}>
        <h1>Contato</h1>
            <input placeholder="Informe o seu nome " type="text" id='name' name="name" value={formData.name} onChange={handleChange} required />
            <input placeholder="Informe o seu email " type="text" id="email" name="email" value={formData.email} onChange={handleChange} required/>
            <textarea placeholder="Informe suas duvidas "  id="password" name="password" value={formData.password} onChange={handleChange} cols={30} rows={10} required></textarea>
            <button onClick={handleZap}>Enviar Cadastro</button>
        </section>
        </>
    )
}

export default Contact