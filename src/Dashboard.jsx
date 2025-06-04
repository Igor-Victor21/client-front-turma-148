import { useNavigate } from "react-router";
import { useEffect, useState } from "react"; 
import { Menu } from "./components/menu";
import { api } from "./api/api"
import styles from './Dashboard.module.css'

function DashBoard(){
    const navigate = useNavigate();
    const [userCont, setUserCont] = useState(0);
    const [productsCont, setProductsCont] = useState(0);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if(!storedUser) navigate('/');
    }, [navigate])

    useEffect(() => {
        async function fetchData(){
            try{
                const [userRes, productsRes] = await Promise.all([
                    api.get('/user'),
                    api.get('/list'),
                ])
                setUserCont(userRes.data.length)
                setProductsCont(productsRes.data.length)
            }catch(err){
                console.error("Erro ao buscar dados do dashboard")
            }
        }
        fetchData()
    }, [])

    return(
        <section>
            <Menu/>
            <div className={styles.wrapNav}>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar produto</p> 
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/listproducts')}>
                    <p>Lista de produtos</p> - ({productsCont} produtos)
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/#')}>
                    <p>Criar usuario</p>
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/userList')}>
                    <p>Lista de usuarios</p> - ({productsCont} usuarios)
                </div>
                <div className={styles.wrapItem} onClick={() => navigate('/contact')}>
                    <p>Contato</p>
                </div>
            </div>
        </section>
    )
}

export default DashBoard
