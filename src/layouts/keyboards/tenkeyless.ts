import {Keyboard, KeyLayout} from '../layout'

const d = 54
const d2 = 67.5

// const d = r1 - r2
// const r2 = 282
const r1 = 336
const r2 = r1 - 1 * d
const r3 = r1 - 2 * d
const r4 = r1 - 3 * d
const r5 = r1 - 4 * d
const r6 = 38

const r4c2 = 123
const r3c2 = 137
const r2c2 = 164

const r5c1 = 42
const r1lctrl = 49

const r1rctrl = 792
const r1space = (r1rctrl - d2 + r1lctrl) / 2

const r6c1 = r5c1
const r6f1 = r5c1 + 2 * d
const r6f5 = r4c2 + 5 * d
const r6f9 = r5c1 + 11 * d

const navigationX = 866

const keyLayout: KeyLayout = {
  ESC: [r6c1, r6],

  F1: [r6f1 + 0 * d, r6],
  F2: [r6f1 + 1 * d, r6],
  F3: [r6f1 + 2 * d, r6],
  F4: [r6f1 + 3 * d, r6],

  F5: [r6f5 + 0 * d, r6],
  F6: [r6f5 + 1 * d, r6],
  F7: [r6f5 + 2 * d, r6],
  F8: [r6f5 + 3 * d, r6],

  F9: [r6f9 + 0 * d, r6],
  F10: [r6f9 + 1 * d, r6],
  F11: [r6f9 + 2 * d, r6],
  F12: [r6f9 + 3 * d, r6],

  GRAVE: [r5c1 + 0 * d, r5],
  1: [r5c1 + 1 * d, r5],
  2: [r5c1 + 2 * d, r5],
  3: [r5c1 + 3 * d, r5],
  4: [r5c1 + 4 * d, r5],
  5: [r5c1 + 5 * d, r5],
  6: [r5c1 + 6 * d, r5],
  7: [r5c1 + 7 * d, r5],
  8: [r5c1 + 8 * d, r5],
  9: [r5c1 + 9 * d, r5],
  0: [r5c1 + 10 * d, r5],
  MINUS: [r5c1 + 11 * d, r5],
  EQUAL: [r5c1 + 12 * d, r5],
  BACKSPACE: [r5c1 + 13 * d, r5],

  TAB: [r4c2 - d, r4],
  Q: [r4c2 + 0 * d, r4],
  W: [r4c2 + 1 * d, r4],
  E: [r4c2 + 2 * d, r4],
  R: [r4c2 + 3 * d, r4],
  T: [r4c2 + 4 * d, r4],
  Y: [r4c2 + 5 * d, r4],
  U: [r4c2 + 6 * d, r4],
  I: [r4c2 + 7 * d, r4],
  O: [r4c2 + 8 * d, r4],
  P: [r4c2 + 9 * d, r4],
  LEFTBRACE: [r4c2 + 10 * d, r4],
  RIGHTBRACE: [r4c2 + 11 * d, r4],
  BACKSLASH: [r4c2 + 12 * d, r4],

  CAPSLOCK: [r3c2 - d, r3],
  A: [r3c2 + 0 * d, r3],
  S: [r3c2 + 1 * d, r3],
  D: [r3c2 + 2 * d, r3],
  F: [r3c2 + 3 * d, r3],
  G: [r3c2 + 4 * d, r3],
  H: [r3c2 + 5 * d, r3],
  J: [r3c2 + 6 * d, r3],
  K: [r3c2 + 7 * d, r3],
  L: [r3c2 + 8 * d, r3],
  SEMICOLON: [r3c2 + 9 * d, r3],
  APOSTROPHE: [r3c2 + 10 * d, r3],
  ENTER: [r3c2 + 11 * d, r3],

  LEFTSHIFT: [r2c2 - d, r2],
  Z: [r2c2 + 0 * d, r2],
  X: [r2c2 + 1 * d, r2],
  C: [r2c2 + 2 * d, r2],
  V: [r2c2 + 3 * d, r2],
  B: [r2c2 + 4 * d, r2],
  N: [r2c2 + 5 * d, r2],
  M: [r2c2 + 6 * d, r2],
  COMMA: [r2c2 + 7 * d, r2],
  DOT: [r2c2 + 8 * d, r2],
  SLASH: [r2c2 + 9 * d, r2],
  RIGHTSHIFT: [r2c2 + 10 * d, r2],

  LEFTCTRL: [r1lctrl + 0 * d2, r1],
  LEFTMETA: [r1lctrl + 1 * d2, r1],
  LEFTALT: [r1lctrl + 2 * d2, r1],
  SPACE: [r1space, r1],
  RIGHTALT: [r1rctrl - 3 * d2, r1],
  RIGHTMETA: [r1rctrl - 2 * d2, r1],
  COMPOSE: [r1rctrl - 1 * d2, r1],
  RIGHTCTRL: [r1rctrl - 0 * d2, r1],

  LEFT: [navigationX, r1],
  DOWN: [navigationX + d, r1],
  UP: [navigationX + d, r1 - d],
  RIGHT: [navigationX + 2 * d, r1],

  PRINT: [navigationX + 0 * d, r6],
  SYSRQ: [navigationX + 0 * d, r6],
  SCROLLLOCK: [navigationX + 1 * d, r6],
  PAUSE: [navigationX + 2 * d, r6],
  BREAK: [navigationX + 2 * d, r6],
  INSERT: [navigationX + 0 * d, r5],
  HOME: [navigationX + 1 * d, r5],
  PAGEUP: [navigationX + 2 * d, r5],
  DELETE: [navigationX, r4],
  END: [navigationX + 1 * d, r4],
  PAGEDOWN: [navigationX + 2 * d, r4],
}

const layout: Keyboard = {
  name: 'tenkeyless',
  keyLayout,
  image: require('./tenkeyless/tenkeyless.svg'),
  dimensions: {
    width: 1005,
    height: 370,
  },
}

export default layout
