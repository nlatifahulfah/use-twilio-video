import React, { useState } from 'react'
import useConfig from './hooks/useConfig'
import Lobby from './components/Lobby'
import Room from './components/Room'
// import { useMyHook } from 'use-twilio-video'

const App = () => {
  const [joined, setJoined] = useState(false)
  const {
    isLoading: configLoading,
    token,
    identity,
    roomName,
    error: configError,
    getToken
  } = useConfig()

  // Loading
  if (configLoading) return 'get config...'

  // error
  if (configError) return `Error: ${configError.message}`

  // Lobby
  if (!joined) {
    return (
      <div style={{ textAlign: 'center' }}>
        <Lobby
          handleSubmit={data => {
            getToken({ identity: data.username, roomName: data.roomName })
            setJoined(true)
          }}
        />
      </div>
    )
  }

  return (
    <div className='App'>
      <Room
        token={token}
        identity={identity}
        roomName={roomName}
        onDisconnected={() => setJoined(false)}
      />
    </div>
  )
}
export default App
