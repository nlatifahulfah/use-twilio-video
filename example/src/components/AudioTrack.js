import React, { useEffect, useRef } from 'react'

export default function AudioTrack ({ track }) {
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

  return <audio ref={ref} />
}
