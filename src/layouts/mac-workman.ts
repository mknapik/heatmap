import {Layout} from './layout'
import qwerty from './mac-qwerty'
import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

type Mapping = Partial<{[key in KeySymbol]: KeySymbol}>
const mapToQwerty: Mapping = {
  D: 'W',
  R: 'E',
  W: 'R',
  B: 'T',
  J: 'Y',
  F: 'U',
  U: 'I',
  P: 'O',
  SEMICOLON: 'P',
  H: 'D',
  T: 'F',
  Y: 'H',
  N: 'J',
  E: 'K',
  O: 'L',
  I: 'SEMICOLON',
  M: 'C',
  C: 'V',
  V: 'B',
  K: 'N',
  L: 'M',
}

const layout: Layout = {
  ...qwerty,
  ...R.fromPairs(R.map(([key, q]) => [key, qwerty[q!]], R.toPairs(mapToQwerty))),
}

export default layout
