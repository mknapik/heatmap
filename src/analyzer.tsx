import * as R from 'ramda'
import React from 'react'
import './app.css'
import {Heatmap} from './heatmap'
import {Histogram} from './histogram'
import {KeyCount, Layout} from './layouts/layout'

type Props = {
  counts: KeyCount[]
  name: string
  layouts: Layout[]
}

const Analyzer: React.FC<Props> = ({counts, name, layouts}) => {
  return (
    <div className="flex row">
      <div>
        <h1>Heatmap</h1>
        <div className="flex column">
          {layouts.map(({keyLayout: layout, image, name}, idx) => (
            <div key={idx} className="">
              <h3>{name}</h3>
              <Heatmap key={idx} data={counts} layout={layout} image={image} />
            </div>
          ))}
        </div>
      </div>
      <div>
        <h1>Histogram</h1>
        <Histogram keys={counts} name={name} />
      </div>
    </div>
  )
}

export default Analyzer
