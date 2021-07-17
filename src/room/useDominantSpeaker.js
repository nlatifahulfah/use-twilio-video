import { useEffect, useState } from 'react'

/**
 * hanya remote participant yang dapat didetect as dominant speaker
 * https://www.twilio.com/docs/video/detecting-dominant-speaker#javascript
 */
export default function useDominantSpeaker ({ room }) {
  const [dominantSpeaker, setDominantSpeaker] = useState(null)

  useEffect(() => {
    if (room) {
      const handleDominantSpeakerChanged = participant =>
        setDominantSpeaker(participant)

      room.on('dominantSpeakerChanged', handleDominantSpeakerChanged)

      return () => {
        room.off('dominantSpeakerChanged', handleDominantSpeakerChanged)
      }
    }
  }, [room])

  return { dominantSpeaker }
}
