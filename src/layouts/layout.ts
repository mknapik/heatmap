import * as R from 'ramda'
import {KeySymbol} from '../code-to-symbol'

export type Coordinates = [number, number]
export type KeyLayout = Partial<{[key in KeySymbol]: Coordinates}>
export type KeyCount = {keySymbol: KeySymbol; count: number}
export type KeyFreq = KeyCount & {
  coordinates: Coordinates
}
export type Layout = {
  name: string
  keyLayout: KeyLayout
  image: any
}

export type KeyMapping = Partial<{[key in KeySymbol]: KeySymbol}>

export const extractLayoutKeys = (
  layout: KeyLayout,
): ((_: KeyCount[]) => KeyFreq[]) =>
  R.pipe(
    R.map(({keySymbol, count}: KeyCount) => ({
      keySymbol,
      count,
      coordinates: layout[keySymbol],
    })),
    // R.forEach(({keySymbol, count, coordinates}) =>
    //   R.isNil(coordinates)
    //     ? console.warn(
    //         `Layout does not define key: ${keySymbol}; count: ${count}`,
    //       )
    //     : undefined,
    // ),
    R.reject(R.compose(R.isNil, R.prop('coordinates'))),
    R.map(({coordinates, ...keys}) => ({...keys, coordinates: coordinates!})),
  )

export const keyMapper = (layout: KeyLayout) => (
  mapping: KeyMapping,
): KeyLayout =>
  R.fromPairs(R.map(([key, q]) => [key, layout[q!]], R.toPairs(mapping)))
