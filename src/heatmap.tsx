import heat from 'heatmap.js'
import * as R from 'ramda'
import React, {useEffect, useState} from 'react'
import {useDebounce} from 'use-debounce'
import {v4 as uuid} from 'uuid'
import './heatmap.css'
import {extractLayoutKeys, KeyCount, Layout} from './layouts/layout'
import Loading from './loading'
import {compact} from './ramda-extensions'

namespace Heatmap {
  export type Props = {
    layout: Layout
    keys: KeyCount[]
    name: string
  }
  export type State = {
    uid: string
    ready: boolean
  }
}

export const Heatmap: React.FC<Heatmap.Props> = ({
  layout: {keyLayout, image, findKeyCap},
  name,
  keys,
}) => {
  const [uid] = useState(uuid())
  const [ready, setReady] = useState(false)
  const [data] = useDebounce(keys, 500)

  const style = {backgroundImage: `url(${image})`}

  useEffect(() => {
    setReady(false)

    const canvasDomId = `canvas-${uid}`
    const container = document.getElementById(canvasDomId)!

    const heatmap = heat.create({
      container,
      maxOpacity: 0.9,
      radius: (54 * 2) / 3,
      backgroundColor: 'rgba(1, 1, 1, 0)',
    })

    setTimeout(() => {
      R.pipe(
        (keys: KeyCount[]) => keys,
        extractLayoutKeys(name)(keyLayout),
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

      const canvas: HTMLCanvasElement = (heatmap as any)._renderer.canvas
      const ctx = canvas.getContext('2d') as any

      R.pipe(
        R.map(findKeyCap),
        compact,
        R.flatten,
        R.forEach((keyCap) => {
          ctx.font = keyCap.font
          ctx.fillText(keyCap.label, keyCap.x, keyCap.y)
        }),
      )(R.keys(keyLayout))

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
