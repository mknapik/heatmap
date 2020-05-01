import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

export type Coordinates = [number, number]
export type KeyLayout = Partial<{[key in KeySymbol]: Coordinates}>
export type KeyCount = {keySymbol: KeySymbol; count: number}
export type KeyFreq = KeyCount & {
  coordinates: Coordinates
}
export type KeyFreq2 = KeyCount & {
  coordinates?: Coordinates
}
export type Layout = {
  name: string
  keyLayout: KeyLayout
  image: any
}

export type KeyMapping = Partial<{[key in KeySymbol]: KeySymbol}>

function tap<T>(fn: (t: T) => void): (t: T) => T {
  return (t: T) => {
    fn(t)
    return t
  }
}

export const extractLayoutKeys = (
  layout: KeyLayout,
): ((_: KeyCount[]) => KeyFreq[]) =>
  R.pipe(
    R.map(({keySymbol, count}: KeyCount) => ({
      keySymbol,
      count,
      coordinates: layout[keySymbol],
    })),
    (
      k, // bug in R.tap()() typing
    ) =>
      R.tap(
        R.pipe(
          (keys: (KeyCount & {coordinates?: Coordinates})[]) => keys,
          R.filter(({coordinates, keySymbol, count}) => R.isNil(coordinates)),
          R.map(({keySymbol}) => keySymbol),
          R.tap((keys) => {
            console.warn({
              message: 'Layout does not define all keys',
              keys,
            })
          }),
        ),
        k,
      ),
    R.reject(R.pipe(R.prop('coordinates'), R.isNil)),
    R.map(({coordinates, ...keys}) => ({
      ...keys,
      coordinates: coordinates!,
    })),
  )

export const keyMapper = (layout: KeyLayout) => (
  mapping: KeyMapping,
): KeyLayout =>
  R.fromPairs(R.map(([key, q]) => [key, layout[q!]], R.toPairs(mapping)))
