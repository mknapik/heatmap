import React from 'react'

type Props = {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  checked: boolean
  disabled?: boolean
}

const Checkbox: React.FC<Props> = ({label, checked, onChange, disabled}) => (
  <label>
    {' '}
    <input
      disabled={disabled}
      type="checkbox"
      checked={checked}
      onChange={onChange}
    />{' '}
    {label}
  </label>
)

export default Checkbox
