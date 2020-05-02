import * as R from 'ramda'
import React from 'react'
import Plot from 'react-plotly.js'
import './app.css'
import {KeyCount} from './layouts/layout'

type Props = {
  name: string
  keys: KeyCount[]
}

export const Histogram: React.FC<Props> = ({name, keys}) => {
  // const sum = R.reduce((acc, {count}) => acc + count, 0, data)
  const sum = 1

  return (
    <Plot
      data={[
        {
          type: 'bar',
          y: R.map(({keySymbol}) => keySymbol, keys),
          x: R.map(({count}) => count / sum, keys),
          orientation: 'h',
          name,
        },
      ]}
      layout={{width: 1000, height: 1500}}
    />
  )
}
