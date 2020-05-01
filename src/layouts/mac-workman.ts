import {KeyLayout, KeyMapping, keyMapper, Layout} from './layout'
import qwerty from './mac-qwerty'
import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

const mapToQwerty: KeyMapping = {
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

const keyLayout: KeyLayout = {
  ...qwerty.keyLayout,
  ...keyMapper(qwerty.keyLayout)(mapToQwerty),
}

const layout: Layout = {
  keyLayout,
  name: 'mac workman',
  image: require('./mac-qwerty.png'),
}

export default layout
