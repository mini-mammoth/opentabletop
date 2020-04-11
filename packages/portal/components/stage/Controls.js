import { Container, Text } from '@inlet/react-pixi'
import React, { useEffect, useState } from 'react'

function Controls(props) {
  const initialText = 'Controls'
  const [text, setState] = useState(initialText)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setState(`${initialText} ${counter}`)
  }, [counter])

  return (
    <Container {...props}>
      <Text
        text={text}
        interactive={true}
        pointerdown={() => setCounter(counter + 1)}
      />
    </Container>
  )
}

export default Controls
