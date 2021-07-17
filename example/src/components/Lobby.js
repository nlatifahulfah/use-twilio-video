import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Lobby = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [roomName, setRoomName] = useState('')

  const onSubmit = e => {
    e.preventDefault()
    console.log('username', username)
    console.log('roomName', roomName)
    handleSubmit && handleSubmit({ username, roomName })
  }
  return (
    <form onSubmit={onSubmit}>
      <h2>Enter a room</h2>
      <div>
        <label htmlFor='name'>Name:</label>
        <input
          type='text'
          id='field'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor='room'>Room name:</label>
        <input
          type='text'
          id='room'
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
          required
        />
      </div>

      <button type='submit'>Join</button>
    </form>
  )
}

Lobby.propTypes = {
  handleSubmit: PropTypes.func
}

export default Lobby
