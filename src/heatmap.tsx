
import {v4 as uuid} from 'uuid'
import * as R from 'ramda'
import React from 'react'
import heat from 'heatmap.js'

import './heatmap.css'
import {Layout, KeyCount, extractLayoutKeys} from './layouts/layout'

namespace Heatmap {
  export type Props = {
    data: KeyCount[]
    layout: Layout
    image: any
  }
  export type State = {
    uid: string
  }
}

export class Heatmap extends React.Component<Heatmap.Props, Heatmap.State> {
  ref: React.RefObject<HTMLElement>

  constructor(props: Heatmap.Props) {
    super(props)
    this.ref = React.createRef()
    this.state = {uid: uuid()}
  }

  componentDidMount() {
    const {data, layout} = this.props
    const {uid} = this.state

    const canvasDomId = `canvas-${uid}`
    const wrapperDomId = `wrapper-${uid}`

    R.pipe(
      (keys: KeyCount[]) => keys,
      extractLayoutKeys(layout),
      (keys) => {
        const heatmap = heat.create({
          container: document.getElementById(canvasDomId)!,
          //   container: this.ref.current!,
          // maxOpacity: 0.6,
          // radius: 30,
          // blur: 0.9,
          backgroundColor: 'rgba(1, 1, 1, 0)',
        })

        var heatmapContainer = document.getElementById(wrapperDomId)!

        R.forEach(({keySymbol, count, coordinates}) => {
          const [x, y] = coordinates

          heatmap.addData({x, y, value: count})
        }, keys)

        heatmap.repaint()

        return keys
      },
    )(data)
  }

  render() {
      const {image} = this.props
    const {uid} = this.state
    const style = {backgroundImage: `url(${image})`}
    // const style = {}
    return uid ? (
      <div id="image" className="image" style={style}>
        <div id={`wrapper-${uid}`} className="wrapper">
          <div id={`canvas-${uid}`} className="canvas" />
        </div>
      </div>
    ) : undefined
  }
}
