# bach-editor
> :musical_score: Web editor for the bach music notation
---

Minimalist web editor for the [`bach` music notation](https://github.com/slurmulon/bach) that allows you to learn and play with `bach`.

## Features

 - Write your `bach` tracks with instant audio and visual feedback
 - Easily access resulting `bach.json` data and other useful track information
 - Import and export entire track collection archives
 - Validation messages to ensure track can be played musically
 - Useful player and usability preferences
 - Run stand-alone or a-la-carte, using only the components you need (:construction: in prog.)

## Limitations

 - Piano is currently the only supported instrument and is limited to octave 2, due to complexities with acquiring open-source samples
 - All tracks are stored using browser storage APIs, so there is currently no centralized persistent back-end
 - Syntax highlighting is in the early stages, and all validation happens during save

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

You will also need to run the audio server to hear playback:

```
npm run serve:audio
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## License

MIT
