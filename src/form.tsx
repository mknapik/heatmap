import * as R from 'ramda'
import React from 'react'
import Analyzer from './analyzer'
import './app.css'
import extractKeyCounts, {ExtractKeysOptions} from './extract-keys'

namespace Form {
  export type Props = {
    texts: string[]
  }
  export type State = ExtractKeysOptions & {
    disabled: boolean
  }
}

const checkbox = (fieldName: keyof ExtractKeysOptions) => ({
  name: fieldName.replace('skip', ''),
  fieldName,
})

namespace Checkbox {
  export type Props = {
    label: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    checked: boolean
    disabled?: boolean
  }
}

const Checkbox: React.FC<Checkbox.Props> = ({
  label,
  checked,
  onChange,
  disabled,
}) => (
  <label>
    {label}:
    <input
      disabled={disabled}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />{' '}
  </label>
)

class Form extends React.Component<Form.Props, Form.State> {
  constructor(props: Form.Props) {
    super(props)
    this.state = {
      disabled: false,
      skipEscape: false,
      skipArrows: false,
      skipBackspace: false,
      skipDualKeys: false,
      skipEnter: false,
      skipLetters: false,
      skipNumbers: false,
      skipModifiers: false,
      skipSpace: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.disableForm = this.disableForm.bind(this)
  }

  handleChange(
    name: keyof ExtractKeysOptions,
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    this.setState({
      [name]: !event.target.checked,
    } as any)
  }

  disableForm(disabled: boolean = true) {
    this.setState({disabled} as any)
  }

  render() {
    const {texts} = this.props
    const {disabled, ...skips} = this.state

    const data = R.map(
      extractKeyCounts({
        ...skips,
      }),
      texts,
    )

    const checkboxes = R.map(checkbox, R.keys(skips))

    return (
      <div>
        <form>
          <input
            type="reset"
            onClick={(e) =>
              R.map(
                ({fieldName}) =>
                  this.handleChange(fieldName, {
                    target: {checked: true},
                  } as any),
                checkboxes,
              )
            }
            value="check all"
          />
          <input
            type="reset"
            onClick={(e) =>
              R.map(
                ({fieldName}) =>
                  this.handleChange(fieldName, {
                    target: {checked: false},
                  } as any),
                checkboxes,
              )
            }
            value="uncheck all"
          />

          {R.map(
            ({name, fieldName}) => (
              <Checkbox
                key={fieldName}
                label={name}
                disabled={disabled}
                checked={!this.state[fieldName]}
                onChange={(e) => this.handleChange(fieldName, e)}
              />
            ),
            checkboxes,
          )}
        </form>
        <Analyzer disableForm={this.disableForm} data={data} {...skips} />
      </div>
    )
  }
}

export default Form
