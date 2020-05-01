import {KeySymbol} from '../code-to-symbol'
import { Layout } from './layout'

const r1 = 348
const r2 = 295
const d = (r1 - r2)
const r3 = r2 - d
const r4 = r3 - d
const r5 = r4 - d
const r6 = 50

const c1 = 55

const layout: Layout = {
  ESC: [c1, r6],
  F1: [35 + 1 * d, r6],
  F2: [35 + 2 * d, r6],
  F3: [35 + 3 * d, r6],
  F4: [35 + 4 * d, r6],
  F5: [35 + 5 * d, r6],
  F6: [35 + 6 * d, r6],
  F7: [35 + 7 * d, r6],
  F8: [35 + 8 * d, r6],
  F9: [35 + 9 * d, r6],
  F10: [35 + 10 * d, r6],
  F11: [35 + 11 * d, r6],
  F12: [35 + 12 * d, r6],

  GRAVE: [35, r5],
  1: [90, r5],
  2: [144, r5],
  3: [198, r5],
  4: [253, r5],
  5: [307, r5],
  6: [361, r5],
  7: [415, r5],
  8: [469, r5],
  9: [524, r5],
  0: [579, r5],
  MINUS: [630, r5],
  EQUAL: [685, r5],
  BACKSPACE: [685 + d, r5],
  DELETE: [685 + 2 * d, r5],

  TAB: [115 - d, r4],
  Q: [115, r4],
  W: [169, r4],
  E: [224, r4],
  R: [278, r4],
  T: [332, r4],
  Y: [386, r4],
  U: [440, r4],
  I: [494, r4],
  O: [548, r4],
  P: [602, r4],
  LEFTBRACE: [656, r4],
  RIGHTBRACE: [710, r4],
  BACKSLASH: [764, r4],

  CAPSLOCK: [130 - d, r3],
  A: [130, r3],
  S: [184, r3],
  D: [238, r3],
  F: [292, r3],
  G: [346, r3],
  H: [400, r3],
  J: [454, r3],
  K: [508, r3],
  L: [562, r3],
  SEMICOLON: [616, r3],
  APOSTROPHE: [670, r3],
  ENTER: [724, r3],

  LEFTSHIFT: [70, r2],
  Z: [158, r2],
  X: [212, r2],
  C: [266, r2],
  V: [320, r2],
  B: [374, r2],
  N: [428, r2],
  M: [482, r2],
  COMMA: [536, r2],
  DOT: [590, r2],
  SLASH: [644, r2],
  RIGHTSHIFT: [644 + d, r2],

  LEFTCTRL: [c1, r1],
  LEFTALT: [145, r1],
  LEFTMETA: [145 + d, r1],
  SPACE: [400, r1],
  RIGHTALT: [602, r1],
  LEFT: [656, r1 + d / 4],
  DOWN: [656 + d, r1 + d / 3],
  UP: [656 + d, r1 - d / 4],
  RIGHT: [656 + 2 * d, r1 + d / 4],
}

export default layout
