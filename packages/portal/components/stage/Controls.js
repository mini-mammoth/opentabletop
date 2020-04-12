import { Container, Text } from '@inlet/react-pixi'
import Router from 'next/router'
import React, { useEffect, useState } from 'react'

function Controls(props) {
  const initialText = 'Controls'
  const [text, setState] = useState(initialText)
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    setState(`${initialText} ${counter}`)
  }, [counter])

  return (
    <Container {...props} name={'Controls'}>
      <Text
        text={text}
        interactive={true}
        buttonMode={true}
        pointerdown={() => setCounter(counter + 1)}
        name={'Text Counter'}
      />

      <Text
        y={50}
        text={'Show chat'}
        interactive={true}
        buttonMode={true}
        pointerdown={() => Router.push(`${Router.router.asPath}/chat`)}
        name={'Link to Chat'}
      />
    </Container>
  )
}

export default Controls
