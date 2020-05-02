import Bluebird from 'bluebird'
import * as R from 'ramda'
import React from 'react'
import './app.css'
import Form from './form'
import Loading from './loading'

const path1 = require('./keycounter.mir.log')
const path2 = require('./keycounter.vostok.log')
const paths: string[] = R.take(1, [path1, path2])

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
    Bluebird.all(paths)
      .map((path) => fetch(path))
      .map((response) => response.text())
      .then((texts) => this.setState({texts}))
  }

  render() {
    const {texts} = this.state

    return (
      <Loading ready={R.complement(R.isEmpty)(texts)}>
        <Form texts={texts} />
      </Loading>
    )
  }
}

export default App
