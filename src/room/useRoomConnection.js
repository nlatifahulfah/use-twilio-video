import { useCallback, useEffect, useState } from 'react'
import { connect } from 'twilio-video'

const INITIAL_STATE = {
  room: null,
  error: null
}

export default function useRoomConnection () {
  const [roomState, setRoomState] = useState(INITIAL_STATE)
  const { room } = roomState

  /**
   * connect to a room
   */
  const connectRoom = useCallback(({ token, options }) => {
    connect(token, options)
      .then(room => {
        setRoomState(c => ({ ...c, room }))
        console.log(`Successfully joined a Room: ${room}`)
      })
      .catch(error => {
        console.error(`Unable to connect to Room: ${error.message}`)
        setRoomState(c => ({ ...c, error }))
      })
  }, [])

  /**
   * Disconnect from room
   */
  const disconnectRoom = useCallback(() => {
    if (room) {
      room.disconnect()
    }
  }, [room])

  /**
   * handle on beforeunload & on pagehide
   */
  useEffect(() => {
    if (room) {
      window.addEventListener('beforeunload', disconnectRoom)
      window.addEventListener('pagehide', disconnectRoom)

      // remove listener
      room.once('disconnected', () => {
        window.removeEventListener('beforeunload', disconnectRoom)
        window.removeEventListener('pagehide', disconnectRoom)
      })

      return () => {
        window.removeEventListener('beforeunload', disconnectRoom)
        window.removeEventListener('pagehide', disconnectRoom)
      }
    }
  }, [disconnectRoom, room])

  return { ...roomState, disconnectRoom, connectRoom }
}
