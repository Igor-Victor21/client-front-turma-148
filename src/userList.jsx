import './userList.module.css'

import { useEffect, useState } from 'react'
import { api }  from './api/api'
import { Menu } from './components/menu'

function UserList() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect (() => {
        async function fetchUsers(){
            try {
                const response = await api.get('/user')
                    setUsers(response.data)
                    console.log(response.data)
                
            } catch (err) {
                setError('Erro ao carregar os usuarios', err)
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    }, [])

    if (loading) return <p>Carregando usuarios...</p>
    if (error) return  <p>{error}</p>
    return(

        <section>
            <Menu/>
            <div style={{padding:'2rem'}}>
            <h1>Lista de usuarios</h1>
            <ul>
                {users.map((item) => 
                    (
                    <li key={item.id}>
                        <strong>{item.name}</strong> - <i>{item.email}</i>
                    </li>
                    )
                )}
            </ul>
        </div>
        </section>
        
    )
}

export default UserList