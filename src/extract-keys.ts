import * as R from 'ramda'
import './app.css'
import {KeySymbol} from './code-to-symbol'
import {KeyCount} from './layouts/layout'

export type ExtractKeysOptions = {
  skipBackspace: boolean
  skipEnter: boolean
  skipNumbers: boolean
  skipLetters: boolean
  skipSpace: boolean
  skipModifiers: boolean
  skipDualKeys: boolean
  skipArrows: boolean
  skipEscape: boolean
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

const extractKeyCounts = ({
  skipBackspace,
  skipEnter,
  skipLetters,
  skipSpace,
  skipModifiers,
  skipDualKeys,
  skipArrows,
  skipEscape,
  skipNumbers,
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
      skipEnter ? rejectKeys(['ENTER']) : R.identity,
      skipSpace ? rejectKeys(['SPACE']) : R.identity,
      skipBackspace ? rejectKeys(['BACKSPACE']) : R.identity,
      skipModifiers ? rejectModifiers : R.identity,
      skipDualKeys ? rejectDualKeys : R.identity,
      skipArrows ? rejectArrows : R.identity,
      skipEscape ? rejectEscape : R.identity,
    ),
  )

export default extractKeyCounts
