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
import Analyzer from './analyzer'
import Form from './form'
import Loading from './loading'

const path1 = require('./keycounter.mir.log')
const path2 = require('./keycounter.vostok.log')
const paths: string[] = R.take(1, [path1, path2])
const names = ['mir', 'vostok']

const layouts = [qwerty, colemak, workman, dvorak, norman]

namespace App {
  export type Props = {}
  export type State = {
    texts: string[]
  }
}

class App extends React.Component<App.Props, App.State> {
  constructor(props: App.Props) {
    super(props)
    this.state = {texts: []}
  }

  componentDidMount() {
    const {...skip} = this.props

    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .then((texts) => this.setState({texts}))
  }

  render() {
    const {texts} = this.state

    return (
      <Loading ready={R.complement(R.isEmpty)(texts)}>
        <Form
          skipArrows
          skipBackspace
          skipEnter
          skipSpace
          skipModifiers
          skipLetters
          texts={texts}
        />
      </Loading>
    )
  }
}

export default App
