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

const rejectKeys = <T extends {keySymbol: KeySymbol}>(list: KeySymbol[]) =>
  R.reject<T>(({keySymbol}: T) => R.contains<string>(keySymbol)(list))

const rejectLetters = rejectKeys(
  'QWERTYUIOPASDFGHJKLZXCVBNM'.split('') as KeySymbol[],
)
const rejectNumbers = rejectKeys('1234567890'.split('') as KeySymbol[])
const rejectArrows = rejectKeys(['UP', 'LEFT', 'RIGHT', 'DOWN'])
const rejectModifiers = rejectKeys([
  'LEFTCTRL',
  'LEFTSHIFT',
  'LEFTALT',
  'LEFTMETA',
  'RIGHTCTRL',
  'RIGHTSHIFT',
  'RIGHTALT',
  'RIGHTMETA',
])
const rejectDualKeys = rejectKeys(['COMPOSE', 'TAB', 'BACKSLASH'])
const rejectEscape = rejectKeys(['ESC'])
const rejectPunctuation = rejectKeys([
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
const rejectNavigation = rejectKeys(['PAGEDOWN', 'PAGEUP', 'HOME', 'END'])
const rejectEnter = rejectKeys(['ENTER'])
const rejectSpace = rejectKeys(['SPACE'])
const rejectBackspace = rejectKeys(['BACKSPACE'])
const rejectFunction = rejectKeys([
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
const rejectOther = rejectKeys([
  'SYSRQ',
  'PAUSE',
  'INSERT',
  'DELETE',
  'SCROLLLOCK',
])
const rejectOrphans = rejectKeys([])
const rejectNumpad = rejectKeys([
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
    R.pipe(
      skipLetters ? rejectLetters : R.identity,
      skipNumbers ? rejectNumbers : R.identity,
      skipEnter ? rejectEnter : R.identity,
      skipSpace ? rejectSpace : R.identity,
      skipBackspace ? rejectBackspace : R.identity,
      skipModifiers ? rejectModifiers : R.identity,
      skipDualKeys ? rejectDualKeys : R.identity,
      skipArrows ? rejectArrows : R.identity,
      skipNavigation ? rejectNavigation : R.identity,
      R.pipe(
        (i: SymbolCount[]) => i,
        skipEscape ? rejectEscape : R.identity,
        skipPunctuation ? rejectPunctuation : R.identity,
        skipFunction ? rejectFunction : R.identity,
        skipOther ? rejectOther : R.identity,
        skipOrphans ? rejectOrphans : R.identity,
        skipNumpad ? rejectNumpad : R.identity,
      ),
    ),
  )

export default extractKeyCounts
