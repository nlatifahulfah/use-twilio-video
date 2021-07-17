import { useEffect, useState } from 'react'

/**
 * handle participant events
 *
 * References:
 * https://www.twilio.com/docs/video/javascript-getting-started#connect-to-a-room
 * https://www.twilio.com/docs/video/javascript-getting-started#handle-connected-participants
 */
export default function useParticipant ({
  room,
  onNewParticipantConnected,
  onParticipantDisconnected
}) {
  const [participants, setParticipants] = useState([])
  const localParticipant = room && room.localParticipant

  useEffect(() => {
    if (room) {
      /**
       * When Participants connect to or disconnect from a Room that you're connected to,
       * you'll be notified via Participant connection events
       */
      const handleAlreadyConnected = participant =>
        setParticipants(p => [...p, participant])

      const handleNewConnected = participant => {
        setParticipants(p => [...p, participant])
        onNewParticipantConnected && onNewParticipantConnected(participant)
      }

      const handleParticipantDisconnected = participant => {
        setParticipants(current => current.filter(p => p !== participant))
        onParticipantDisconnected && onParticipantDisconnected(participant)
      }

      // Log any Participants already connected to the Room
      room.participants.forEach(handleAlreadyConnected)
      // new participant connected
      room.on('participantConnected', handleNewConnected)

      room.on('participantDisconnected', handleParticipantDisconnected)

      return () => {
        room.off('participantConnected', handleNewConnected)
        room.off('participantDisconnected', handleParticipantDisconnected)
      }
    }
  }, [onNewParticipantConnected, onParticipantDisconnected, room])

  return { localParticipant, remoteParticipants: participants }
}
