import {Layout} from './layout'
import qwerty from './mac-qwerty'
import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

type Mapping = Partial<{[key in KeySymbol]: KeySymbol}>
const mapToQwerty: Mapping = {
  Q: 'Q',
  W: 'W',
  F: 'E',
  P: 'R',
  G: 'T',
  J: 'Y',
  L: 'U',
  U: 'I',
  Y: 'O',
  SEMICOLON: 'P',
  A: 'A',
  R: 'S',
  S: 'D',
  T: 'F',
  D: 'G',
  H: 'H',
  N: 'J',
  E: 'K',
  I: 'L',
  O: 'SEMICOLON',
  Z: 'Z',
  X: 'X',
  C: 'C',
  V: 'V',
  B: 'B',
  K: 'N',
  M: 'M',
  COMMA: 'COMMA',
  DOT: 'DOT',
  SLASH: 'SLASH',
}

const layout: Layout = {
  ...qwerty,
  ...R.fromPairs(R.map(([key, q]) => [key, qwerty[q!]], R.toPairs(mapToQwerty))),
}

export default layout
