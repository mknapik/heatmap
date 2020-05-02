import React from 'react'

namespace Loading {
  export type Props = {
    ready: boolean
    error?: string | object | boolean
  }
}

const Loading: React.FC<Loading.Props> = ({
  ready = false,
  error = false,
  children,
}) => {
  return (
    <span>
      {ready ? (
        error ? (
          error
        ) : (
          children
        )
      ) : (
        <div>
          <div>loading...</div>
        </div>
      )}
    </span>
  )
}

export default Loading
