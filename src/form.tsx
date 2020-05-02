import * as R from 'ramda'
import React, {useState} from 'react'
import Analyzer from './analyzer'
import './app.css'
import extractKeyCounts, {ExtractKeysOptions} from './extract-keys'
import Checkbox from './checkbox'

import colemak from './layouts/pc/colemak'
import dvorak from './layouts/pc/dvorak'
import norman from './layouts/pc/norman'
import qwerty from './layouts/pc/qwerty'
import workman from './layouts/pc/workman'
import {Layout} from './layouts/layout'

const layouts = {qwerty, colemak, workman, dvorak, norman}
type VisibleLayouts = {[key in keyof typeof layouts]: boolean}
const visibleLayouts: VisibleLayouts = {
  qwerty: true,
  colemak: true,
  workman: true,
  dvorak: true,
  norman: true,
}

type Props = {
  text: string
  name: string
}

const identity = <T extends {}>() => (i: T) => i

const checkbox = (fieldName: keyof ExtractKeysOptions) => ({
  name: fieldName.replace('skip', ''),
  fieldName,
})

const Form: React.FC<Props> = ({text, name}) => {
  const [disabled, setDisabled] = useState(false)

  const [skips, setSkips] = useState<ExtractKeysOptions>({
    skipLetters: false,
    skipNumbers: false,
    skipArrows: true,
    skipDualKeys: true,
    skipModifiers: true,
    skipEnter: true,
    skipEscape: true,
    skipBackspace: true,
    skipSpace: true,
  })
  const [l, setLayouts] = useState<VisibleLayouts>(visibleLayouts)

  const handleChange = (name: keyof ExtractKeysOptions) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    setSkips({
      ...skips,
      [name]: !event.target.checked,
    })

  const handleChangeKeyboard = (name: keyof VisibleLayouts) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) =>
    setLayouts({
      ...l,
      [name]: event.target.checked,
    })

  const checkboxes = R.map(checkbox, R.keys(skips))

  const counts = extractKeyCounts(skips)(text)

  return (
    <div>
      <form>
        {R.map(
          ({name, fieldName}) => (
            <Checkbox
              key={fieldName}
              label={name}
              checked={!skips[fieldName]}
              onChange={handleChange(fieldName)}
            />
          ),
          checkboxes,
        )}
      </form>
      <form>
        {R.map(
          (layout) => (
            <Checkbox
              key={layout}
              label={layout}
              checked={l[layout]}
              onChange={handleChangeKeyboard(layout)}
            />
          ),
          R.keys(l),
        )}
      </form>
      <Analyzer
        counts={counts}
        name={name}
        layouts={R.map(
          (key: keyof VisibleLayouts) => layouts[key],
          R.filter((key) => l[key], R.keys(layouts)),
        )}
        {...skips}
      />
    </div>
  )
}

export default Form
