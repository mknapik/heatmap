import * as R from 'ramda'

export function compact<T>(t: (T | undefined)[]): T[] {
  return R.reject(R.isNil, t) as T[]
}
