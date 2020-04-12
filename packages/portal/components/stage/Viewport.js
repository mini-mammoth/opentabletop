import { applyDefaultProps, PixiComponent, useApp } from '@inlet/react-pixi'
import { Viewport as PixiViewport } from 'pixi-viewport'
import React from 'react'

const ViewportComponent = PixiComponent('Viewport', {
  create: props => {
    const { app, world } = props

    console.log({ world, renderer: app.renderer.height })

    const viewport = new PixiViewport({
      screenWidth: app.renderer.width,
      screenHeight: app.renderer.height,
      worldWidth: world.width,
      worldHeight: world.height,
      disableOnContextMenu: true,

      // the interaction module is important for wheel to work properly
      // when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    })
    viewport.name = 'Viewport'
    viewport.position.set(0, 0)
    viewport.corner.set(-50, -50)
    return viewport
  },
  didMount: (instance, parent) => {
    instance
      .drag()
      .pinch()
      .wheel()
      .decelerate()
      .clampZoom({
        minWidth: 500,
        minHeight: 500,
        maxWidth: 1000,
        maxHeight: 1000,
      })
      .clamp({
        direction: 'all',
      })
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    const { app, width, height } = newProps

    console.log(app.renderer.width)

    // instance.screenWidth = app.renderer.width
    instance.worldWidth = width
    instance.worldHeight = height

    applyDefaultProps(instance, oldProps, newProps)
  },
})

function Viewport(props) {
  const app = useApp()

  return <ViewportComponent app={app} {...props}/>
}

export default Viewport
