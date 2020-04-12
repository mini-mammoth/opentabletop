import { applyDefaultProps, PixiComponent, useApp } from '@inlet/react-pixi'
import { Viewport as PixiViewport } from 'pixi-viewport'
import React from 'react'

const ViewportPixiComponent = PixiComponent('Viewport', {
  create: props => {
    const { app, screen, world } = props

    console.log('Viewport create', { screen, world })

    const viewport = new PixiViewport({
      screenWidth: screen.width,
      screenHeight: screen.height,
      worldWidth: world.width,
      worldHeight: world.height,
      disableOnContextMenu: true,

      // the interaction module is important for wheel to work properly
      // when renderer.view is placed or scaled
      interaction: app.renderer.plugins.interaction,
    })
    viewport.name = 'Viewport'
    return viewport
  },
  didMount: (instance, parent) => {
    instance
      .drag()
      .pinch()
      .wheel()
      .decelerate({ friction: .8 })
    /*
    .clampZoom({
      minWidth: instance.worldWidth / 10,
      minHeight: instance.worldHeight / 10,
      maxWidth: instance.worldWidth * 1.5,
      maxHeight: instance.worldHeight * 1.5,
    })
  /*
  .clamp({
    top: 0,
    left: 0,
    right: 1000,
    bottom: 1000, // 690
  })
  */
    instance.moveCenter(instance.screenWidth / 2, instance.screenHeight / 2)
  },
  willUnmount: (instance, parent) => {
    // clean up before removal
  },
  applyProps: (instance, oldProps, newProps) => {
    console.log('\n-- UPDATE --\n')
    console.log('newProps:')
    console.table({ screen: newProps.screen, world: newProps.world })
    console.log({ oldScreenWidth: instance.screenWidth })
    instance.resize(newProps.screen.width, newProps.screen.height)

    instance
      .drag()
      .pinch()
      .wheel()
      .decelerate({ friction: .8 })

    if (instance.screenWidth) {
      instance
        .clampZoom({
          minWidth: instance.worldWidth / 6,
          minHeight: instance.worldHeight / 6,
          maxWidth: instance.worldWidth * 1.5,
          maxHeight: instance.worldHeight * 1.5,
        })
      /*
      .clamp({
          top: 0,
          left: 0,
          right: instance.worldWidth * 3,
          bottom: instance.worldHeight * 3, // 690
        })
      */
    }

    console.log(instance.screenWidth)
    console.log(instance.getVisibleBounds())

    applyDefaultProps(instance, oldProps, newProps)
  },
})

function Viewport(props) {
  const app = useApp()
  const { screen, world, children } = props

  return (
    <ViewportPixiComponent app={app}
                           screen={screen}
                           world={world}>
      {children}
    </ViewportPixiComponent>
  )
}

export default Viewport
