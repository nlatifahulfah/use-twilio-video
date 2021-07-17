import useTrackSubscription from './track/useTrackSubscription'
import useTrackAudio from './track/useTrackAudio'
import useTrackVideo from './track/useTrackVideo'

export default function useTrack ({ participant }) {
  const { audioTrack, videoTrack } = useTrackSubscription({ participant })
  const { audioOn } = useTrackAudio({ audioTrack })
  const { videoOn } = useTrackVideo({ videoTrack })

  return {
    audioTrack,
    videoTrack,
    audioOn,
    videoOn
  }
}
