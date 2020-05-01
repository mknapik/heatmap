import * as R from 'ramda'
import './app.css'
import {KeySymbol} from './code-to-symbol'
import {KeyCount} from './layouts/layout'

type ExtractKeysOptions = {
  skipBackspace?: boolean
  skipEnter?: boolean
  skipLetters?: boolean
  skipSpace?: boolean
  skipModifiers?: boolean
  skipArrows?: boolean
}

function extractKeyCounts({
  skipBackspace,
  skipEnter,
  skipLetters,
  skipSpace,
  skipModifiers,
  skipArrows,
}: ExtractKeysOptions): (text: string) => KeyCount[] {
  const rejectKeys = <T extends {keySymbol: KeySymbol}>(list: KeySymbol[]) =>
    R.reject<T>(({keySymbol}: T) => R.contains<string>(keySymbol)(list))
  const rejectLetters = rejectKeys(
    'QWERTYUIOPASDFGHJKLZXCVBNM'.split('') as KeySymbol[],
  )
  const rejectArrows = rejectKeys(['UP', 'LEFT', 'RIGHT', 'DOWN'])
  const rejectModifiers =
    rejectKeys([
      'LEFTCTRL',
      'LEFTSHIFT',
      'LEFTALT',
      'LEFTMETA',
      'RIGHTCTRL',
      'RIGHTSHIFT',
      'RIGHTALT',
      'RIGHTMETA',
      'CAPSLOCK',
      'COMPOSE',
      'TAB',
      'BACKSLASH',
    ])

  return R.pipe(
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
      skipEnter ? rejectKeys(['ENTER']) : R.identity,
      skipSpace ? rejectKeys(['SPACE']) : R.identity,
      skipBackspace ? rejectKeys(['BACKSPACE']) : R.identity,
      skipModifiers ? rejectModifiers : R.identity,
      skipArrows ? rejectArrows : R.identity,
    ),
  )
}

export default extractKeyCounts
