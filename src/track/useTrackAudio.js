import { useEffect, useState } from 'react'

export default function useTrackAudio ({ audioTrack }) {
  const [audioOn, setAudioOn] = useState(false)

  useEffect(() => {
    if (audioTrack) {
      setAudioOn(audioTrack.isEnabled)

      const handleAudioDisabled = () => {
        setAudioOn(false)
      }

      const handleAudioEnabled = () => {
        setAudioOn(true)
      }

      audioTrack.on('disabled', handleAudioDisabled)
      audioTrack.on('enabled', handleAudioEnabled)

      return () => {
        audioTrack.off('disabled', handleAudioDisabled)
        audioTrack.off('enabled', handleAudioEnabled)
      }
    }
  }, [audioTrack])

  return { audioOn }
}
