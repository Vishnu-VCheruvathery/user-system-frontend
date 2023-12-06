import axios from 'axios'
import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import toast from 'react-hot-toast';

const MODAL_STYLES = {
    position: "fixed",
    display: 'flex',
    gap: '2px',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    padding: '50px',
    zIndex: 1000,
    border: '1px solid gray',
    borderRadius: '0.5em'
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


const AddTeam = ({userId,open, onClose}) => {
     const [teamId, setTeamId] = useState('')

     const addTeam = async(id) => {
        try {

              const response = await axios.post(`https://user-system-api-dzpj.onrender.com/api/users/team/`, {id, userId})
              console.log(response.data)
              toast(response.data.message)
              return response.data
           
        } catch (error) {
            console.log(error)
        }
     }

    if(!open) return null

  return createPortal(
    <>
    <div style={OVERLAY_STYLE} />
    <div style={MODAL_STYLES}>
    <button onClick={onClose}>Close Modal</button>
    <label>Add a team Id</label>
      <input type="number" value={teamId} onChange={(e) => setTeamId(e.target.value)}></input>
      <button onClick={() => addTeam(teamId)}>Submit</button>
    </div>
    </>,

    document.getElementById('portal')
  )
}

export default AddTeam
