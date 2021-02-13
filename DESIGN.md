# Editor

## Features

### Editor

#### Code
 - Edit bach code in a good-enough looking prism editor (syntax highlighting is not MVP)
 - Use must press a "run" button in order to update code
 - All tracks will be saved to LocalStorage or the Cache API if we use Service Workers

##### Audio
 - Allow user to upload a single audio file per track
   * Use Uppy for uploading: https://uppy.io/docs/vue/
 - When used a-la-carte, allow destination audio upload URL to be configured
 - When used a-la-carte, allow list of tracks (i.e. track store) to be provided
 - Use waveform.js to show soundwave

##### JSON
 - Read-only click-to-copy `bach.json` output of `bach` code
 - Allow multiple views/versions of `bach.json` output
   * Raw
   * Sections

#### Info
 - Provides the user with post-compilation details about their `bach` track
   * Meter
   * Tempo (guage speed, maybe)
   * Durations (e.g. duration related headers)
   * Totals
     - Beats
     - Measures/Bars
     - Sections
       * Actually, could/should inverse "totals" and "durations" and group by beat, bar, etc.
   * Sections
 - Location: Right-side Drawer

#### Tracks
 - No limit on tracks for now since everything will be stored locally
 - Location: Left-side Drawer

#### Player
 - Use `tone.js` (eventually wrapped in a new `bach-tone` library) to play `bach` entities 
 - Use `gig` to handle synchronization of `bach` with audio 
 - Optional looping (disabled by default)
 - Warn user if any of the scales or chords cannot have their notes inferred
 - Warn user if track is NOT loopable due to audio fragmentation (i.e. misaligned total durations)
 - No seek functionality for now
