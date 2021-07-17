import React, { useEffect, useRef } from 'react'

export default function VideoTrack ({ track }) {
  const ref = useRef()

  useEffect(() => {
    if (track) {
      const el = ref.current
      track.attach(el)

      return () => {
        track.detach(el)
      }
    }
  }, [track])

  return <video style={{ maxWidth: '100%' }} ref={ref} />
}
