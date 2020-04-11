import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import React from 'react'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      flexGrow: 1,
    },
    container: {
      display: 'inline-flex',
    },
    title: {
      flexGrow: 1,
    },
  }),
  { name: 'Header' },
)

function Header({ title }) {
  const classes = useStyles()

  return (
    <AppBar position="static">
      <Toolbar>
        <Container className={classes.container}>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

Header.defaultProps = {
  title: 'Open Table Top',
}

export default Header
