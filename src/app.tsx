import React, {ChangeEvent, SyntheticEvent} from 'react'
import heat from 'heatmap.js'
import './app.css'
import layout, {Coordinates} from './layouts/mac-qwerty'
import {KeySymbol} from './code-to-symbol'
import * as R from 'ramda'
import Plot from 'react-plotly.js'
import Bluebird from 'bluebird'

const path1 = require('./keycounter.mir.log')
const path2 = require('./keycounter.vostok.log')
const paths: string[] = [path1, path2]

namespace App {
  export type Props = {
    skipLetters?: boolean
    skipEnter?: boolean
    skipSpace?: boolean
    skipBackspace?: boolean
  }
  export type State = {
    data?: {keySymbol: KeySymbol; count: number}[][]
  }
}

class App extends React.Component<App.Props, App.State> {
  ref: React.RefObject<HTMLElement>

  constructor(props: App.Props) {
    super(props)
    this.ref = React.createRef()
    this.text = this.text.bind(this)
    this.state = {data: []}
  }

  text(event: any) {
    //   console.log(event.target.value);
  }

  componentDidMount() {
    const {skipBackspace, skipEnter, skipLetters, skipSpace} = this.props

    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .map((text) => {
        const rejectKeys = <T extends {keySymbol: KeySymbol}>(
          list: KeySymbol[],
        ) =>
          R.reject<T>(({keySymbol}: T) => R.contains<string>(keySymbol)(list))
        const rejectLetters = rejectKeys(
          'QWERTYUIOPASDFGHJKLZXCVBNM'.split('') as KeySymbol[],
        )

        const heatmap = heat.create({
          container: document.getElementById('canvas')!,
          //   container: this.ref.current!,
          // maxOpacity: 0.6,
          // radius: 30,
          // blur: 0.9,
          backgroundColor: 'rgba(1, 1, 1, 0)',
        })

        var heatmapContainer = document.getElementById('wrapper')!

        const keys = R.pipe(
          (content: string) => content,
          R.pipe(
            R.split('\n'),
            R.reject(R.isEmpty),
            R.map(R.split(/[\:\,]/)),
            R.map(([k, count]): [KeySymbol, number] => [
              k as KeySymbol,
              parseInt(count),
            ]),
          ),
          R.sortBy(([_, c]) => c),
          R.map(([keySymbol, count]) => ({
            keySymbol,
            count,
            key: layout[keySymbol],
          })),
          R.pipe(
            skipLetters ? rejectLetters : R.identity,
            skipEnter ? rejectKeys(['ENTER']) : R.identity,
            skipSpace ? rejectKeys(['SPACE']) : R.identity,
            skipBackspace ? rejectKeys(['BACKSPACE']) : R.identity,
          ),
          R.forEach(({keySymbol, count, key}) =>
            R.isNil(key)
              ? console.warn(
                  `Layout does not define key: ${keySymbol}; count: ${count}`,
                )
              : undefined,
          ),
          R.reject(R.compose(R.isNil, R.prop('key'))),
          R.forEach(({keySymbol, count, key}) => {
            const [x, y] = key!
            heatmap.addData({x, y, value: count})
          }),
        )(text)

        // heatmap.repaint()

        // heatmap.addData({x, y, value: count})
        return keys
      })
      .then((symbols) => {
        this.setState({data: symbols})
      })
  }

  render() {
    const {data} = this.state

    return (
      <div>
        <textarea onChange={this.text.bind(this)} />
        <h1>Heatmap</h1>
        <div id="image">
          <div id="wrapper">
            <div id="canvas" className="qwerty" />
          </div>
        </div>
        <h1>Histogram</h1>
        {data ? (
          <Plot
            data={data.map(
              (data, idx): Plotly.Data => {
                const sum = R.reduce((acc, {count}) => acc + count, 0, data)
                return ({
                  type: 'bar',
                  y: R.map(({ keySymbol }) => keySymbol, data),
                  x: R.map(({ count }) => count / sum, data),
                  orientation: 'h',
                  name: paths[idx],
                })
              },
              data,
            )}
            layout={{width: 1000, height: 1500}}
          />
        ) : undefined}
      </div>
    )
  }
}

export default App
