import Bluebird from 'bluebird'
import * as R from 'ramda'
import React from 'react'
import Analyzer from './analyzer'
import './app.css'
import extractKeyCounts, {ExtractKeysOptions} from './extract-keys'
import {KeyCount} from './layouts/layout'

namespace Form {
  export type Props = ExtractKeysOptions & {
    texts: string[]
  }
  export type State = {
    data: KeyCount[][]
  }
}

class Form extends React.Component<Form.Props, Form.State> {
  constructor(props: Form.Props) {
    super(props)
    this.state = {data: []}
  }

  componentDidMount() {
    const {texts, ...skip} = this.props

    this.setState({
      data: R.map(
        extractKeyCounts({
          ...skip,
        }),
        texts,
      ),
    })
  }

  render() {
    const {...skips} = this.props
    const {data} = this.state

    return (
      <Analyzer
        skipArrows
        skipBackspace
        skipEnter
        skipSpace
        skipModifiers
        skipLetters
        data={data}
        {...skips}
      />
    )
  }
}

export default Form
