import { Container } from '@inlet/react-pixi'
import React from 'react'
import Grid from './components/Grid'

function GameBoard(props) {
  const { width, height, ...otherProps } = props

  return (
    <Container {...otherProps} name={'GameBoard'}>
      <Grid size={30} width={width} height={height}/>
    </Container>
  )
}

export default GameBoard
