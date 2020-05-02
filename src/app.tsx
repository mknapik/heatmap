import Bluebird from 'bluebird'
import * as R from 'ramda'
import React, {useEffect, useState} from 'react'
import './app.css'
import Form from './form'
import Loading from './loading'

const path = require('./keycounter.mir.log')
const name = 'mir'

type Props = {}

const App: React.FC<Props> = () => {
  const [text, setTexts] = useState<string | undefined>(undefined)

  useEffect(() => {
    Bluebird.resolve(path)
      .then(fetch)
      .then((response) => response.text())
      .then((text) => setTexts(text))
  }, [])

  return (
    <Loading ready={!!text}>
      <Form name={name} text={text!} />
    </Loading>
  )
}

export default App
