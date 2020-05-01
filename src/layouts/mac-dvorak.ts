import {Layout} from './layout'
import qwerty from './mac-qwerty'
import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

type Mapping = Partial<{[key in KeySymbol]: KeySymbol}>
const mapToQwerty: Mapping = {
  LEFTBRACE: 'MINUS',
  RIGHTBRACE: 'EQUAL',
  APOSTROPHE: 'Q',
  COMMA: 'W',
  DOT: 'E',
  P: 'R',
  Y: 'T',
  F: 'Y',
  G: 'U',
  C: 'I',
  R: 'O',
  L: 'P',
  SLASH: 'LEFTBRACE',
  EQUAL: 'RIGHTBRACE',
  A: 'A',
  O: 'S',
  E: 'D',
  U: 'F',
  I: 'G',
  D: 'H',
  H: 'J',
  T: 'K',
  N: 'L',
  S: 'SEMICOLON',
  MINUS: 'APOSTROPHE',
  SEMICOLON: 'Z',
  Q: 'X',
  J: 'C',
  K: 'V',
  X: 'B',
  B: 'N',
  M: 'M',
  W: 'COMMA',
  V: 'DOT',
  Z: 'SLASH',
}

const layout: Layout = {
  ...qwerty,
  ...R.fromPairs(R.map(([key, q]) => [key, qwerty[q!]], R.toPairs(mapToQwerty))),
}

export default layout
