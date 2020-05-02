import Bluebird from 'bluebird'
import React from 'react'
import * as R from 'ramda'
import './app.css'
import extractKeyCounts, {ExtractKeysOptions} from './extract-keys'
import {KeyCount} from './layouts/layout'
import {Histogram} from './histogram'
import {Heatmap} from './heatmap'

import qwerty from './layouts/pc/qwerty'
import colemak from './layouts/pc/colemak'
import workman from './layouts/pc/workman'
import dvorak from './layouts/pc/dvorak'
import norman from './layouts/pc/norman'

const path1 = require('./keycounter.mir.log')
const path2 = require('./keycounter.vostok.log')
const paths: string[] = R.take(1, [path1, path2])
const names = ['mir', 'vostok']

const layouts = [qwerty, colemak, workman, dvorak, norman]

namespace Analyzer {
  export type Props = {
    data: KeyCount[][]
  }
  export type State = {}
}

class Analyzer extends React.Component<Analyzer.Props, Analyzer.State> {
  constructor(props: Analyzer.Props) {
    super(props)
    this.state = {data: []}
  }

  render() {
    const {data} = this.props

    return (
      <div className="flex row">
        <div>
          <h1>Heatmap</h1>
          <div className="flex column">
            {layouts.map(({keyLayout: layout, image, name}) =>
              data.map((data, idx) => (
                <div key={idx} className="">
                  <h3>{name}</h3>
                  <Heatmap
                    key={idx}
                    data={data}
                    layout={layout}
                    image={image}
                  />
                </div>
              )),
            )}
          </div>
        </div>
        <div>
          <h1>Histogram</h1>
          <Histogram
            data={data.map((keys, idx) => ({
              name: names[idx],
              keys,
            }))}
          />
        </div>
      </div>
    )
  }
}

export default Analyzer
