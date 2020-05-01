import * as R from 'ramda'
import React from 'react'
import Plot from 'react-plotly.js'
import './app.css'
import {KeyCount} from './layouts/layout'

type Props = {
  name: string
  data: KeyCount[][]
}

export const Histogram: React.FC<Props> = ({name, data}: Props) => {
  // const sum = R.reduce((acc, {count}) => acc + count, 0, data)
  const sum = 1

  console.log({data, cl: 'histogram'})

  return (
    <Plot
      data={data.map((data, idx) => ({
        type: 'bar',
        y: R.map(({keySymbol}) => keySymbol, data),
        x: R.map(({count}) => count / sum, data),
        orientation: 'h',
        name: idx.toString(),
        //   name: `${name}-${idx}`,
      }))}
      layout={{width: 1000, height: 1500}}
    />
  )
}
