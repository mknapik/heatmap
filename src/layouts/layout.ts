import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

export type Coordinates = [number, number]
export type KeyLayout = Partial<{[key in KeySymbol]: Coordinates}>
export type KeyCount = {keySymbol: KeySymbol; count: number}
export type KeyFreq = KeyCount & {
  coordinates: Coordinates
}
export type KeyFreq2 = KeyCount & {
  coordinates?: Coordinates
}
export type KeyCapConfig = {
  offset: Coordinates
  font: string
  specialCoordinates: KeyLayout
  specialFonts: Partial<{[key in KeySymbol]: string}>
}

export class Layout {
  private _name: string

  constructor(
    name: string,
    private keyboard: Keyboard,
    private mapping: KeyMapping = {},
  ) {
    this._name = name
  }

  get name() {
    return `${this.keyboard.name}-${this._name}`
  }

  get dimensions() {
    return this.keyboard.dimensions
  }

  get keyLayout(): KeyLayout {
    return {
      ...this.keyboard.keyLayout,
      ...keyMapper(this.keyboard.keyLayout)(this.mapping),
    }
  }

  get findKeyCap() {
    return findKeyCap(this.keyboard.keyCapConfig)(this.keyLayout)
  }

  get image() {
    return this.keyboard.image
  }
}

export type Keyboard = {
  name: string
  keyLayout: KeyLayout
  image: any
  keyCapConfig: KeyCapConfig
  dimensions: {
    width: number
    height: number
  }
}

export type KeyMapping = Partial<{[key in KeySymbol]: KeySymbol}>
type KeyCountCoord = KeyCount & {coordinates: Coordinates | undefined}

function tap<T>(fn: (t: T) => void): (t: T) => T {
  return (t: T) => {
    fn(t)
    return t
  }
}

const reportUnhandledKeys = R.tap<KeyCountCoord[]>(
  R.pipe(
    (keys: KeyCountCoord[]) => keys,
    R.filter(({coordinates, keySymbol, count}) => R.isNil(coordinates)),
    R.map(({keySymbol}) => keySymbol),
    R.tap((keys) => {
      if (keys.length !== 0) {
        console.warn({
          message: 'Layout does not define all keys',
          keys,
          name,
        })
      }
    }),
  ),
)

export const extractLayoutKeys = (name: string) => (
  layout: KeyLayout,
): ((_: KeyCount[]) => KeyFreq[]) =>
  R.pipe(
    R.map(
      ({keySymbol, count}: KeyCount): KeyCountCoord => ({
        keySymbol,
        count,
        coordinates: layout[keySymbol],
      }),
    ),
    reportUnhandledKeys,
    R.reject((a: KeyCountCoord) => R.isNil(a.coordinates)),
    R.reject<KeyCountCoord>(R.pipe(R.prop('coordinates'), R.isNil)),
    R.map(({coordinates, ...keys}) => ({
      ...keys,
      coordinates: coordinates!,
    })),
  )

export const keyMapper = (layout: KeyLayout) => (
  mapping: KeyMapping,
): KeyLayout =>
  R.fromPairs(R.map(([key, q]) => [key, layout[q!]], R.toPairs(mapping)))

type KeyCapLabel = string

const keyCaps: Partial<{[key in KeySymbol]: KeyCapLabel}> = {
  RIGHTALT: 'Alt',
  RIGHTCTRL: 'Ctrl',
  RIGHTMETA: 'Meta',
  RIGHTSHIFT: 'Shift',

  LEFTALT: 'Alt',
  LEFTCTRL: 'Ctrl',
  LEFTMETA: 'Meta',
  LEFTSHIFT: 'Shift',

  RIGHTBRACE: '[',
  LEFTBRACE: '[',

  LEFT: '←',
  DOWN: '↓',
  RIGHT: '→',
  UP: '↑',

  MINUS: '-',
  EQUAL: '=',
  SEMICOLON: ';',
  APOSTROPHE: "'",
  COMMA: ',',
  DOT: '.',

  //  ESC: 'Esc',
  PRINT: 'PrtScn',
  //  PAUSE: 'Pause',
  //  DELETE: 'Delete',
  //  BACKSPACE: 'Backspace',
  CAPSLOCK: 'Caps Lock',
  // ENTER: 'Enter',
  BACKSLASH: '\\',
  SLASH: '/',
  GRAVE: '`',
  SCROLLLOCK: 'ScrLk',
  COMPOSE: 'Menu',
  SPACE: ' ',

  PAGEDOWN: 'PgDw',
  PAGEUP: 'PgUp',
}

const offset = (o: Coordinates) => (
  coordinates: Coordinates | undefined,
): Coordinates | undefined =>
  coordinates ? [o[0] + coordinates[0], o[1] + coordinates[1]] : undefined

type KeyCap = {
  label: string
  font: string
  x: number
  y: number
}

export const findKeyCap = (config: KeyCapConfig) => (layout: KeyLayout) => (
  k: KeySymbol,
): KeyCap[] => {
  const cap =
    keyCaps[k] ||
    k.toString().charAt(0).toUpperCase() + k.toString().slice(1).toLowerCase()
  const coordinates =
    config.specialCoordinates[k] || offset(config.offset)(layout[k])
  return coordinates
    ? [
        {
          label: cap,
          font: config.specialFonts[k] || config.font,
          x: coordinates[0],
          y: coordinates[1],
        },
      ]
    : []
}
