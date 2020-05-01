import React, {ChangeEvent, SyntheticEvent} from 'react'
import heat from 'heatmap.js'
import './app.css'
import layout from './layouts/mac-qwerty'
import {KeyCount} from './layouts/layout'
import {KeySymbol} from './code-to-symbol'
import * as R from 'ramda'

type ExtractKeysOptions = {
  skipBackspace?: boolean
  skipEnter?: boolean
  skipLetters?: boolean
  skipSpace?: boolean
}

function extractKeyCounts({
  skipBackspace,
  skipEnter,
  skipLetters,
  skipSpace,
}: ExtractKeysOptions): (text: string) => KeyCount[] {
  const rejectKeys = <T extends {keySymbol: KeySymbol}>(list: KeySymbol[]) =>
    R.reject<T>(({keySymbol}: T) => R.contains<string>(keySymbol)(list))
  const rejectLetters = rejectKeys(
    'QWERTYUIOPASDFGHJKLZXCVBNM'.split('') as KeySymbol[],
  )

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
    ),
  )
}

export default extractKeyCounts
