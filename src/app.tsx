import Bluebird from 'bluebird'
import React from 'react'
import './app.css'
import extractKeyCounts from './extract-keys'
import { KeyCount } from './layouts/layout'
import { Histogram } from './histogram'
import { Heatmap } from './heatmap'
import layout from './layouts/mac-qwerty'

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
    const {skipBackspace, skipEnter, skipLetters, skipSpace} = this.props

    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .map(extractKeyCounts({skipBackspace, skipEnter, skipLetters, skipSpace}))
      .then((symbols) => this.setState({data: symbols}))
  }

  render() {
    const {data} = this.state
    console.log({data, cl: 'app'});
    

    return (
      <div>
        <textarea onChange={this.text.bind(this)} />
        <h1>Heatmap</h1>
        {data && data[0] ? (
          <Heatmap
            data={data[0]}
            layout={layout}
            image={require('./layouts/mac-qwerty.png')}
          />
        ) : undefined}
        <h1>Histogram</h1>
        {data ? <Histogram name="asd" data={data} /> : undefined}
      </div>
    )
  }
}

export default App
