import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

export type Coordinates = [number, number]
export type Layout = Partial<{[key in KeySymbol]: Coordinates}>
export type KeyCount = {keySymbol: KeySymbol; count: number}
export type KeyFreq = KeyCount & {
  coordinates: Coordinates
}

export const extractLayoutKeys = (layout: Layout): ((_: KeyCount[]) => KeyFreq[]) =>
  R.pipe(
    R.map(({keySymbol, count}: KeyCount) => ({
      keySymbol,
      count,
      coordinates: layout[keySymbol],
    })),
    R.forEach(({keySymbol, count, coordinates}) =>
      R.isNil(coordinates)
        ? console.warn(
            `Layout does not define key: ${keySymbol}; count: ${count}`,
          )
        : undefined,
    ),
    R.reject(R.compose(R.isNil, R.prop('coordinates'))),
    R.map(({coordinates, ...keys}) => ({...keys, coordinates: coordinates!}))
  )
