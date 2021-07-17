import React, { useEffect } from 'react'
import Participant from './Participant'
import { useRoom } from 'use-twilio-video'

function Room ({ token, identity, roomName, onDisconnected }) {
  const {
    room,
    error,
    connectRoom,
    disconnectRoom,
    localParticipant,
    remoteParticipants,
    dominantSpeaker,
    isCameraOn,
    toggleCamera,
    isMicrophoneOn,
    toggleMicrophone
  } = useRoom()

  useEffect(() => {
    if (!room && token && roomName) {
      connectRoom({ token, options: { name: roomName, dominantSpeaker: true } })
      return () => disconnectRoom()
    }
  }, [connectRoom, disconnectRoom, room, roomName, token])

  if (error) return `Error: ${error.message}`

  // connected
  if (room)
    return (
      <div>
        <div>
          <button
            onClick={() => {
              disconnectRoom()
              onDisconnected && onDisconnected()
            }}
          >
            disconnect
          </button>
          <button onClick={() => toggleCamera()}>
            {isCameraOn ? 'turn off camera' : 'turn on camera'}
          </button>
          <button onClick={() => toggleMicrophone()}>
            {isMicrophoneOn ? 'turn off mic' : 'turn on mic'}
          </button>
        </div>
        <div>
          Local participant: {JSON.stringify(localParticipant?.identity)}
        </div>
        <Participant participant={localParticipant} />
        <div>
          Remote participants:{' '}
          {JSON.stringify(remoteParticipants.map(v => v.identity))}
        </div>
        <div>Dominant speaker: {JSON.stringify(dominantSpeaker?.identity)}</div>
        <div>
          {remoteParticipants.map(p => (
            <Participant participant={p} />
          ))}
        </div>
      </div>
    )

  return 'connecting...'
}

export default Room
