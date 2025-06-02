import { useNavigate } from "react-router";
import MenuImg from '../assets/menu.png'
import styles from './menu.module.css'
import { useState } from "react";

export const Menu = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);


    const goToDashboard = () => navigate('/dashboard')

    const goToUsers = () => navigate('/userList')
    
    const logout = () => {
        localStorage.removeItem('user')
        navigate('/')
    }




    return(
        <nav className={open ? styles.navBar : styles.navBarClosed}>
            <img src={MenuImg} alt="menu-nav" onClick={() => setOpen(prev => !prev)}/>
            <p onClick={goToDashboard}>DashBoard</p>
            <p>Criar usuarios</p>
            <p onClick={goToUsers}>Lista de usuarios</p>
            <p>Criar Produto</p>
            <p>Lista de produtos</p>
            <p onClick={logout}>Sair</p>
        </nav>


    )
}
