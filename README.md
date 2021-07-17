# use-twilio-video

> React hooks to manage twilio video state in React application

[![NPM](https://img.shields.io/npm/v/use-twilio-video.svg)](https://www.npmjs.com/package/use-twilio-video) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features
- connect and disconnect room
- toggle mute camera
- toggle mute microphone
- get dominant speaker

## Install

```bash
npm install --save twilio-video use-twilio-video
```

## Prerequisite

You need Twilio Access Token to use Twilio Video. You can use Testing Tools in the Twilio Console to generate the token. You can read the [guide here](https://www.twilio.com/docs/video/javascript-v2-getting-started#3-generate-an-access-token). 

Or you can also follow the next instruction while running the sample project in folder [example](https://github.com/nlatifahulfah/use-twilio-video/tree/master/example). To run example:

1. From root repo directory, change directory to example folder: `cd example`
2. Install dependencies: `npm install`
3. Copy .env.example and rename to .env
4. Add your Twilio API Key to the .env file. You can get your API Key from your Twilio account. You can follow [this guide](https://www.twilio.com/docs/video/javascript-v2-getting-started#2-get-an-api-key).
5. Run server to generate token: `npm run server`
6. Open different tab and run the react app: `npm start`

## Usage
There are two main hooks, `useRoom` and `useTrack`. 

`useRoom` is used to manage room state. In Twilio, a **Room** represents a real-time audio, data, video, and/or screen-share session, and is the basic building block for a Programmable Video application.

`useTrack` is used to manage tracks in a room. In Twilio, **Tracks** represent the individual audio, data, and video media streams that are shared within a Room. This tracks are shared by Participants. **Participants** represent client applications that are connected to a Room and sharing audio, data, and/or video media with one another.

![Room Participant and Track in Twilio](https://github.com/nlatifahulfah/use-twilio-video/blob/master/img/room-participant-track.png?raw=true)

The following are the minimum components needed to be able to create a simple video call application using `twilio` and `use-twilio-video`.

1. Create a component that represent a **Room**. 
    ```jsx
    // Room.js
    import Participant from './Participant'
    import { useRoom } from 'use-twilio-video'
    
    function Room ({ token, roomName }) {
      const { room, error, connectRoom, disconnectRoom, localParticipant, remoteParticipants, dominantSpeaker, isCameraOn, toggleCamera, isMicrophoneOn, toggleMicrophone } = useRoom()
    
      
      useEffect(() => {
        if (!room && token && roomName) {
          connectRoom({ token, options: { name: roomName, dominantSpeaker: true } })
          return () => disconnectRoom()
        }
      }, [connectRoom, disconnectRoom, room, roomName, token])
    
      // ... other
    
      // usage example in simple component
      if (room)
        return (
          <div>
            <div>
              <button onClick={() => disconnectRoom()}>disconnect</button>
              <button onClick={() => toggleCamera()}>
                {isCameraOn ? 'turn off camera' : 'turn on camera'}
              </button>
              <button onClick={() => toggleMicrophone()}>
                {isMicrophoneOn ? 'turn off mic' : 'turn on mic'}
              </button>
            </div>

            <div>Local participant: {JSON.stringify(localParticipant?.identity)}</div>
            <Participant participant={localParticipant} />

            <div>
              Remote participants:{' '}
              {JSON.stringify(remoteParticipants.map(v => v.identity))}
            </div>

            <div>Dominant speaker: {JSON.stringify(dominantSpeaker?.identity)}</div>

            <div>
              {remoteParticipants.map(p => (
                <Participant participant={p} />
              ))}
            </div>
          </div>
        )
    
      // ... other
    }
    ```

2. Create a component represent **Participants**. 

    ```jsx
    // Participant.js
    import AudioTrack from './AudioTrack'
    import VideoTrack from './VideoTrack'
    import { useTrack } from 'use-twilio-video'
    
    function Participant ({ participant }) {
      const { videoOn, audioOn, videoTrack, audioTrack } = useTrack({ participant })
    
      return (
        <div>
          {videoOn ? <VideoTrack track={videoTrack} /> : 'video off'}
          <br />
          {audioOn ? <AudioTrack track={audioTrack} /> : 'audio off'}
        </div>
      )
    }
    
    export default Participant
    ```

3. Create two components, to attach participants' video and audio
    ```jsx
    // VideoTrack.js
    import { useEffect, useRef } from 'react'
    
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
    
    ``` 
    ```jsx
    // AudioTrack.js
    import { useEffect, useRef } from 'react'
    
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
    ```

## License

MIT © [Nur Latifah Ulfah](https://github.com/nlatifahulfah)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
