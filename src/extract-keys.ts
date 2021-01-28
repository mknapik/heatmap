import * as R from 'ramda'
import './app.css'
import {KeySymbol} from './code-to-symbol'

export type ExtractKeysOptions = {
  skipBackspace: boolean
  skipEnter: boolean
  skipNumbers: boolean
  skipLetters: boolean
  skipSpace: boolean
  skipModifiers: boolean
  skipDualKeys: boolean
  skipArrows: boolean
  skipNavigation: boolean
  skipEscape: boolean
  skipPunctuation: boolean
  skipFunction: boolean
  skipOther: boolean
  skipOrphans: boolean
  skipNumpad: boolean
}

const includeKeys = <T extends {keySymbol: KeySymbol}>(list: KeySymbol[]) =>
  R.filter<T>(({keySymbol}: T) => R.contains<string>(keySymbol)(list))

const includeLetters = includeKeys(
  'QWERTYUIOPASDFGHJKLZXCVBNM'.split('') as KeySymbol[],
)
const includeNumbers = includeKeys('1234567890'.split('') as KeySymbol[])
const includeArrows = includeKeys(['UP', 'LEFT', 'RIGHT', 'DOWN'])
const includeModifiers = includeKeys([
  'LEFTCTRL',
  'LEFTSHIFT',
  'LEFTALT',
  'LEFTMETA',
  'RIGHTCTRL',
  'RIGHTSHIFT',
  'RIGHTALT',
  'RIGHTMETA',
])
const includeDualKeys = includeKeys(['COMPOSE', 'TAB', 'BACKSLASH'])
const includeEscape = includeKeys(['ESC'])
const includePunctuation = includeKeys([
  'MINUS',
  'EQUAL',
  'GRAVE',
  'COMMA',
  'DOT',
  'SEMICOLON',
  'APOSTROPHE',
  'LEFTBRACE',
  'RIGHTBRACE',
  'SLASH',
  'BACKSLASH',
])
const includeNavigation = includeKeys(['PAGEDOWN', 'PAGEUP', 'HOME', 'END'])
const includeEnter = includeKeys(['ENTER'])
const includeSpace = includeKeys(['SPACE'])
const includeBackspace = includeKeys(['BACKSPACE'])
const includeFunction = includeKeys([
  'F1',
  'F2',
  'F3',
  'F4',
  'F5',
  'F6',
  'F7',
  'F8',
  'F9',
  'F10',
  'F11',
  'F12',
  'F13',
  'F14',
  'F15',
  'F16',
  'F17',
  'F18',
  'F19',
  'F20',
  'F21',
  'F22',
  'F23',
  'F24',
])
const includeOther = includeKeys([
  'SYSRQ',
  'PAUSE',
  'INSERT',
  'DELETE',
  'SCROLLLOCK',
])
const includeOrphans = includeKeys([])
const includeNumpad = includeKeys([
  'KP0',
  'KP1',
  'KP2',
  'KP3',
  'KP4',
  'KP5',
  'KP6',
  'KP7',
  'KP8',
  'KP9',
  'KPPLUS',
  'KPPLUSMINUS',
  'KPASTERISK',
  'KPCOMMA',
  'KPDOT',
  'KPENTER',
  'KPEQUAL',
  'KPSLASH',
  'KPMINUS',
  'NUMLOCK',
  'CALC',
  'CLEAR',
])
type SymbolCount = {keySymbol: KeySymbol; count: number}

const extractKeyCounts = ({
  skipBackspace,
  skipEnter,
  skipLetters,
  skipSpace,
  skipModifiers,
  skipDualKeys,
  skipArrows,
  skipNavigation,
  skipEscape,
  skipNumbers,
  skipPunctuation,
  skipFunction,
  skipOther,
  skipOrphans,
  skipNumpad,
}: ExtractKeysOptions) =>
  R.pipe(
    (content: string) => content,
    R.pipe(
      R.split('\n'),
      R.reject(R.isEmpty),
      R.map(R.split(/[\:\,]/)),
      R.map(([k, count]): [KeySymbol, number] => [
        k as KeySymbol,
        parseInt(count),
      ]),
    ),
    R.sortBy(([_, c]) => c),
    R.map(([keySymbol, count]) => ({
      keySymbol,
      count,
    })),
    (keys) => {
      const fnss = [
        skipLetters ? [] : [includeLetters],
        skipNumbers ? [] : [includeNumbers],
        skipEnter ? [] : [includeEnter],
        skipSpace ? [] : [includeSpace],
        skipBackspace ? [] : [includeBackspace],
        skipModifiers ? [] : [includeModifiers],
        skipDualKeys ? [] : [includeDualKeys],
        skipArrows ? [] : [includeArrows],
        skipNavigation ? [] : [includeNavigation],
        skipEscape ? [] : [includeEscape],
        skipPunctuation ? [] : [includePunctuation],
        skipFunction ? [] : [includeFunction],
        skipOther ? [] : [includeOther],
        skipOrphans ? [] : [includeOrphans],
        skipNumpad ? [] : [includeNumpad],
      ]

      return R.pipe(
        () => fnss,
        R.flatten,
        R.map((fn) => fn(keys)),
        R.flatten,
        R.uniqBy(R.prop('keySymbol')),
      )()
    },
  )

export default extractKeyCounts
