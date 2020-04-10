import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import Header from './layout/Header'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
    },
  }),
  { name: 'Layout' },
)

function Layout({ children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Header/>
      <Container>
        {children}
      </Container>
    </div>
  )
}

export default Layout
