import Bluebird from 'bluebird'
import React from 'react'
import * as R from 'ramda'
import './app.css'
import extractKeyCounts from './extract-keys'
import {KeyCount} from './layouts/layout'
import {Histogram} from './histogram'
import {Heatmap} from './heatmap'
import qwerty from './layouts/mac-qwerty'
import workman from './layouts/mac-workman'
import dvorak from './layouts/mac-dvorak'
import colemak from './layouts/mac-colemak'

const path1 = require('./keycounter.mir.log')
const path2 = require('./keycounter.vostok.log')
const paths: string[] = R.take(1, [path1, path2])
const names = ['mir', 'vostok']

const layouts = [
  {
    layout: qwerty,
    name: 'qwerty',
  },
  {
    layout: workman,
    name: 'workman',
  },
  {
    layout: colemak,
    name: 'colemak',
  },
  {
    layout: dvorak,
    name: 'dvorak',
  },
]
namespace App {
  export type Props = {
    skipLetters?: boolean
    skipEnter?: boolean
    skipSpace?: boolean
    skipBackspace?: boolean
    skipModifiers?: boolean
    skipArrows?: boolean
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
    const {
      skipBackspace,
      skipEnter,
      skipLetters,
      skipSpace,
      skipModifiers,
      skipArrows,
    } = this.props

    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .map(
        extractKeyCounts({
          skipBackspace,
          skipEnter,
          skipLetters,
          skipSpace,
          skipModifiers,
          skipArrows,
        }),
      )
      .then((symbols) => this.setState({data: symbols}))
  }

  render() {
    const {data} = this.state

    return (
      <div className="flex row">
        <textarea onChange={this.text.bind(this)} />
        <div>
          <h1>Heatmap</h1>
          <div className="flex column">
            {layouts.map(({layout, name}) =>
              data.map((data, idx) => (
                <div className="">
                  <h3>{name}</h3>
                  <Heatmap
                    key={idx}
                    data={data}
                    layout={layout}
                    image={require('./layouts/mac-qwerty.png')}
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
