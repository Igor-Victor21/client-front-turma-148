import './userList.module.css'

import { useEffect, useState } from 'react'
import { api }  from './api/api'
import { Menu } from './components/menu'
import { useNavigate } from 'react-router'

function UserList() {

    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [editUserId, setEditUserId] = useState(null);
    const [editData, setEditData] = useState({name: '', email: '', password: ''});

    useEffect(() =>{
        const storedUser = localStorage.getItem('user')
        if(!storedUser) navigate('/')
    },[navigate])

    const fetchUsers = async () => {
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
    
    useEffect (() => {
        fetchUsers()
    }, [])

    const handleDelete = async (id) => {
        try{
            await api.delete(`/user/${id}`)
            setUsers(users.filter((u) => u.id !== id))
        }catch(err){
            setError("Erro ao deletar usuário", err)
        }
    }

    const handleEditClick = (user) => {
        setEditUserId(user.id)
        setEditData({name: user.name, email: user.email, password: ''})// não mostra a senha antiga
    }

    const handleEditChange = (e) => {
        const {name, value} = e.target
        setEditData({...editData, [name]: value})
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            await api.put(`/user/${editUserId}`,editData)
            setEditUserId(null)
            fetchUsers()

        } catch (err) {
            setError("Erro ao atualizar o usuário ", err)
        }
    }

    if (loading) return <p>Carregando usuarios...</p>
    if (error) return  <p>{error}</p>
    return(

        <section>
            <Menu/>
            <div style={{padding:'2rem'}}>
            <h1>Lista de usuarios</h1>
            <ul>
                {users.map((user) => 
                    (
                    <li key={user.id} style={{marginTop: '2rem', marginLeft: '1rem'}}>
                        {editUserId === user.id ? (
                            <form onSubmit={handleUpdate} style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                                <input type="text" name='name' value={editData.name} onChange={handleEditChange} required/>
                                <input type="email" name='email' value={editData.email} onChange={handleEditChange} required/>
                                <input type="password" name='password' value={editData.password} onChange={handleEditChange} placeholder='Nova senha' required/>
                                <button type='submit'>SALVAR</button>
                                <button type='button' onClick={() => setEditUserId(null)}>CANCELAR</button>
                                
                            </form>
                            
                        ): (
                            <>
                            <strong>{user.name}</strong> - <i>{user.email}</i>
                            <div style={{display: 'inline-flex', gap: '0.5rem', marginLeft: '1rem'}}>
                                <button onClick={() => handleEditClick(user)}>EDITAR</button>
                                <button onClick={()  => handleDelete(user.id)}>DELETAR</button>
                            </div>
                            </>
                        )}
                    </li>
                    )
                )}
            </ul>
        </div>
        </section>
        
    )
}

export default UserList