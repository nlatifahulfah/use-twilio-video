import useDominantSpeaker from './room/useDominantSpeaker'
import useParticipant from './room/useParticipant'
import useRoomConnection from './room/useRoomConnection'
import useToggleCamera from './room/useToggleCamera'
import useToggleMicrophone from './room/useToggleMicrophone'

export default function useRoom () {
  const { room, error, connectRoom, disconnectRoom } = useRoomConnection()
  const { localParticipant, remoteParticipants } = useParticipant({ room })
  const { dominantSpeaker } = useDominantSpeaker({ room })
  const { isCameraOn, toggleCamera } = useToggleCamera({
    room,
    initialState: true
  })
  const { isMicrophoneOn, toggleMicrophone } = useToggleMicrophone({
    room,
    initialState: true
  })

  return {
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
  }
}
