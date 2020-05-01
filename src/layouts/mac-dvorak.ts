import {KeyLayout, Layout, keyMapper} from './layout'
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

const keyLayout: KeyLayout = {
  ...qwerty.keyLayout,
  ...keyMapper(qwerty.keyLayout)(mapToQwerty),
}

const layout: Layout = {
  keyLayout,
  name: 'mac dvorak',
  image: require('./mac-qwerty.png'),
}

export default layout
