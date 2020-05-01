import Bluebird from 'bluebird'
import React from 'react'
import * as R from 'ramda'
import './app.css'
import extractKeyCounts, { ExtractKeysOptions } from './extract-keys'
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

namespace App {
  export type Props = ExtractKeysOptions & {
  }
  export type State = {
    data: KeyCount[][]
  }
}

class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props) {
    super(props)
    this.text = this.text.bind(this)
    this.state = {data: []}
  }

  text(event: any) {
    //   console.log(event.target.value);
  }

  componentDidMount() {
    const {...skip} = this.props

    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .map(
        extractKeyCounts({
          ...skip,
        }),
      )
      .then((symbols) => this.setState({data: symbols}))
  }

  render() {
    const {data} = this.state

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

export default App
