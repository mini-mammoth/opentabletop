import Container from '@material-ui/core/Container'
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

/**
 * Layout component used for all
 *
 * @param {object} props
 * @param {string} props.title
 * @param {React.ReactNode} props.children
 */
function Layout({ title, children }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Head>
        <title>{title} - Open Table Top</title>
      </Head>
      <Header title={title} />
      <Container className={classes.container}>{children}</Container>
    </div>
  )
}

export default Layout
