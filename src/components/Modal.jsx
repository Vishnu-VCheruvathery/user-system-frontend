import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { addUsers } from '../features/userSlice';


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


const Modal = ({open, onClose}) => {
  
    const dispatch = useDispatch()
      const [id, setID] = useState('')
      const [first, setFirst] = useState('')
      const [last, setLast] = useState('')
      const [email, setEmail] = useState('')
      const [gender, setGender] = useState('')
      const [avatar, setAvatar] = useState('')
      const [domain, setDomain] = useState('')
      const [available, setAvailable] = useState('')



    if(!open) return null
    return createPortal(
    <>
     <div style={OVERLAY_STYLE} />
      <div style={MODAL_STYLES}>
      <button onClick={onClose}>X</button>
      <label>Enter ID</label>
      <input 
      placeholder='id'
      value={id}
      onChange={(e) => setID(e.target.value)}
      ></input>
      <label>Enter First Name</label>
      <input 
      placeholder='FirstName'
      value={first}
      onChange={(e) => setFirst(e.target.value)}
      ></input>
      <label>Enter Last Name</label>
      <input 
      placeholder='LastName'
      value={last}
      onChange={(e) => setLast(e.target.value)}
      ></input>
       <label>Enter Email</label>
      <input 
      placeholder='email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      ></input>
       <label>Enter Gender</label>
      <input 
      placeholder='gender'
      value={gender}
      onChange={(e) => setGender(e.target.value)}
      ></input>
      <label>Insert Avatar</label>
      <input 
      placeholder='url'
      value={avatar}
      onChange={(e) => setAvatar(e.target.value)}
      ></input>
      <label>Enter Domain</label>
      <input 
      placeholder='domain'
      value={domain}
      onChange={(e) => setDomain(e.target.value)}
      ></input>
      <label>Enter Availability</label>
      <input 
      placeholder='available'
      value={available}
      onChange={(e) => setAvailable(e.target.value)}
      ></input>
      <button onClick={() => 
        dispatch(addUsers({id, first, last, email, gender, avatar, domain, available}))
      }>Submit</button>
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default Modal
