import makeStyles from '@material-ui/core/styles/makeStyles'
import Head from 'next/head'
import React from 'react'
import Header from './layout/Header'

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'grid',
      gridTemplateRows: 'auto 1fr',
      height: '100vh',
    },
    container: {
      display: 'flex',
    },
  }),
  { name: 'Layout' },
)

function Layout({ title, children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head>
        <title>{title} - Open Table Top</title>
      </Head>
      <Header title={title}/>
      <div className={classes.container}>{children}</div>
    </div>
  )
}

export default Layout
