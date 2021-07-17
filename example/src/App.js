import React from 'react'
import { useMyHook } from 'use-twilio-video'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App