import { all as notes } from '@/core/notes'

import { Gig } from 'gig'
// import { notesIn } from 'bach-js'
import Tone, { Sampler, Transport } from 'tone'
import { ref } from '@vue/composition-api'

const gig = ref(null)
// const playing = ref(false)

export function load (source) {
  gig.value = new Gig({
    source,
    loop: true
  }).play()

  gig.value.on('beat:play', () => {
    const { sections, cursor } = gig.value
    const section = sections[cursor.section]

    console.log('beat played (section)', section)

    play(section)
  })
}

export function play (section) {
  // FIXME: Hard-coding chord for now, but probably auto-detect or allow user to specify this!
  const { notes } = section.parts.chord

  Transport.schedule(time => {
    notes.forEach(note => {
      const duration = section.duration * gig.value.interval

      sampler.triggerAttackRelease(
        note,
        duration,
        Tone.now(),
        1
      )
    // }, Tone.now() + 0.5)
    }, Tone.now())
  })
}

export function stop () {
  gig.value.stop()
}

export function sample (note) {
  // const burl = 'https://tonejs.github.io/audio/salamander/'
  // TODO: Append octave of 2 if missing
  const pitch = note.name.replace(/#/, 's')
  // const url = `${burl}${pitch}.mp3`
  const url = `${pitch}.mp3`
  console.log('sampling note!', url, note)

  return url
}

console.log('DA MAP', notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {}))

// @see: https://github.com/sustained/sforzando/blob/master/src/library/instruments.js
export const sampler = new Sampler({
  release: 1,
  baseUrl: 'https://tonejs.github.io/audio/salamander/',
  urls: notes.reduce((map, note) => ({ ...map, [note.name]: sample(note) }), {})
}).toDestination()
