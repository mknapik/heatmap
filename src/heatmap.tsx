import {v4 as uuid} from 'uuid'
import * as R from 'ramda'
import React, {useState, useEffect} from 'react'
import heat from 'heatmap.js'
import {useDebounce} from 'use-debounce'

import './heatmap.css'
import {KeyLayout, KeyCount, extractLayoutKeys} from './layouts/layout'
import Loading from './loading'
import Bluebird from 'bluebird'

namespace Heatmap {
  export type Props = {
    data: KeyCount[]
    layout: KeyLayout
    image: any
  }
  export type State = {
    uid: string
    ready: boolean
  }
}
export const Heatmap: React.FC<Heatmap.Props> = ({
  data: dataProps,
  image,
  layout,
}) => {
  const [uid] = useState(uuid())
  const [ready, setReady] = useState(false)
  const [data] = useDebounce(dataProps, 500)

  const style = {backgroundImage: `url(${image})`}

  useEffect(() => {
    setReady(false)

    const canvasDomId = `canvas-${uid}`
    const heatmap = heat.create({
      container: document.getElementById(canvasDomId)!,
      maxOpacity: 0.9,
      radius: (54 * 2) / 3,
      backgroundColor: 'rgba(1, 1, 1, 0)',
    })

    setTimeout(() => {
      R.pipe(
        (keys: KeyCount[]) => keys,
        extractLayoutKeys(layout),
        (keys) => {
          R.forEach(({keySymbol, count, coordinates}) => {
            const [x, y] = coordinates

            heatmap.addData({
              x,
              y,
              value: count,
            })
          }, keys)
          return keys
        },
      )(data)

      setReady(true)
    })

    return () => {
      if (heatmap) {
        ;(heatmap as any)._renderer.canvas.remove()
      }
    }
  }, [data])

  return (
    <div id="image" className="image" style={style}>
      <div id={`wrapper-${uid}`} className="wrapper">
        <Loading ready={ready} />
        <div id={`canvas-${uid}`} className="canvas" />
      </div>
    </div>
  )
}
