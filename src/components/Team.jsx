import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom';
import axios from 'axios';
import './Team.css'

const MODAL_STYLES = {
    position: "fixed",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    width: '50%'
}

const OVERLAY_STYLE = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, .7)',
    zIndex: 1000
}

const Team = ({open, onClose}) => {
    const [id, setId] = useState('')
    const [users, setUsers] = useState([])

    const getTeam = async() => {
      try {
         const response = await axios.get(`https://user-system-api-dzpj.onrender.com/api/users/team/${id}`)
         console.log(response.data)
         setUsers(response.data)
      } catch (error) {
        console.log(error)
      }
    }

  


    if(!open) return null

    return createPortal(
      <>
      <div style={OVERLAY_STYLE} />
      <div style={MODAL_STYLES}>
      <button onClick={onClose} style={{marginBottom: '5px'}}>Close</button>
      <div className='teamId'>
      <label>Which Team are you searching for?</label>
      <input value={id} onChange={(e) => setId(e.target.value)}></input>
      <button onClick={getTeam}>Get</button>
      </div>
      <div className='model'>

      {users.length > 0 ? (
  users[0].team.map((user) => (
    <div className='user' key={user._id}>
      <div className='user-image'>
        <img src={user.avatar} alt='User Avatar' />
      </div>
      <div className='user-info'>
        <h3>{user.first_name}</h3>
        <h3>{user.last_name}</h3>
        <p>Domain: {user.domain}</p>
        <p>Availability: {String(user.available) || 'N/A'}</p>
      </div>
    </div>
  ))
) : (
  <div
    style={{
      width: '100px',
      backgroundColor: 'white',
      margin: '150px auto',
    }}
  >
    <h1>No Users yet.</h1>
  </div>
)}
    
      </div>
     
      </div>
      </>,
  
      document.getElementById('portal')
    )
}

export default Team
