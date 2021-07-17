/**
 * Connection mode
 * resources:
 * https://www.twilio.com/docs/video/tutorials/developing-high-quality-video-applications#presentation-mode
 */

export const grid = {
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 },
  bandwidthProfile: {
    video: {
      mode: 'grid'
    }
  },
  maxAudioBitrate: 16000, // For music remove this line
  // For multiparty rooms (participants>=3) uncomment the line below
  // preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  networkQuality: { local: 1, remote: 1 }
}

export const collaboration = {
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 },
  bandwidthProfile: {
    video: {
      mode: 'collaboration',
      dominantSpeakerPriority: 'standard'
    }
  },
  dominantSpeaker: true,
  maxAudioBitrate: 16000, // For music remove this line
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  networkQuality: { local: 1, remote: 1 }
}

export const presentation = {
  audio: true,
  video: { height: 720, frameRate: 24, width: 1280 },
  bandwidthProfile: {
    video: {
      mode: 'presentation',
      dominantSpeakerPriority: 'standard'
    }
  },
  dominantSpeaker: true,
  maxAudioBitrate: 16000, // For music remove this line
  preferredVideoCodecs: [{ codec: 'VP8', simulcast: true }],
  networkQuality: { local: 1, remote: 1 }

}
