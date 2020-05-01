import 'fomantic-ui-css/semantic.css'
import {Grid, Header} from 'semantic-ui-react'
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
        <Grid>
          <Grid.Column width={8} stackable>
            <Header size="medium">Heatmap</Header>
            <Grid>
              {layouts.map(({layout, name}) =>
                data.map((data, idx) => (
                  <Grid.Row className="">
                    <Grid.Column>
                      <Header size="tiny">{name}</Header>
                    </Grid.Column>
                    <Grid.Column>
                      <Heatmap
                        key={idx}
                        data={data}
                        layout={layout}
                        image={require('./layouts/mac-qwerty.png')}
                      />
                    </Grid.Column>
                  </Grid.Row>
                )),
              )}
            </Grid>
          </Grid.Column>
          <Grid.Column floated={'left'}>
            <Header size="medium">Histogram</Header>
            <Histogram
              data={data.map((keys, idx) => ({
                name: names[idx],
                keys,
              }))}
            />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default App
