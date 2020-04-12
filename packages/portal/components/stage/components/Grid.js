import { applyDefaultProps, PixiComponent } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import React from 'react'

// https://pixiplayground.com/#/edit/H7xf1sMhhQpzD2anLy51a

const defaults = {
  size: 30,
  width: 1000,
  height: 1000,
  color: '#777',
}

const Grid = PixiComponent('Grid', {
  create: props => {
    const {
      size = defaults.size,
      width = defaults.width,
      height = defaults.height,
    } = props

    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size

    const context = canvas.getContext('2d')
    context.beginPath()
    context.moveTo(size, 0)
    context.lineTo(0, 0)
    context.lineTo(0, size)
    context.lineWidth = 1
    context.strokeStyle = defaults.color
    context.stroke()

    const tileTexture = PIXI.Texture.from(canvas)

    return new PIXI.TilingSprite(tileTexture, width, height)
  },
  didMount: (instance, parent) => {
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    applyDefaultProps(instance, oldProps, newProps)
  },
})

export default Grid
