import { useCallback, useState } from 'react'

/**
 * Toggle on/off local participant microphone
 *
 * References:
 * https://www.twilio.com/docs/video/javascript-getting-started#mute-your-local-media
 */
export default function useToggleMicrophone ({ room, initialState }) {
  const [isMicrophoneOn, setIsMicrophoneOn] = useState(initialState)

  const toggleMicrophone = useCallback(() => {
    if (room) {
      if (isMicrophoneOn) {
        // turn off
        room.localParticipant.audioTracks.forEach(publication => {
          publication.track.disable()
        })

        setIsMicrophoneOn(false)
      } else {
        // turn on
        room.localParticipant.audioTracks.forEach(publication => {
          publication.track.enable()
        })

        setIsMicrophoneOn(true)
      }
    }
  }, [isMicrophoneOn, room])

  return { isMicrophoneOn, toggleMicrophone }
}
