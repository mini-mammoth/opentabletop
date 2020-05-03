import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import React, { useEffect, useState, useRef } from 'react'

import useTemplates from '../client/useTemplates'

const ReactJson = dynamic(() => import('react-json-view'), {
  ssr: false,
})

const useStyles = makeStyles(
  (theme) => ({
    root: {
      display: 'grid',
      flex: 1,
      gridTemplateColumns: '350px 1fr',
      gridTemplateRows: '1fr auto',
    },
    list: { margin: theme.spacing(4, 1, 1, 1) },
    listItemSelected: {
      outline: `2px solid ${theme.palette.primary.main}`,
    },
    editor: { margin: theme.spacing(4, 1, 1, 1) },
    buttonGroup: {
      display: 'flex',
      gridColumn: '1 / span 2',
    },
    button: { margin: theme.spacing(1, 1, 1, 1), flex: 1, maxWidth: '120px' },
  }),
  { name: 'TemplateEditor' },
)

function TemplateEditor() {
  const classes = useStyles()
  const [templates, upsertTemplate, deleteTemplate] = useTemplates()
  const myInput = useRef(null)
  const [selected, select] = useState(
    /** @type{CharacterTemplateDocument} */ ({}),
  )

  const onTemplateJsonSelected = (e) => {
    console.log(e.target.files)
  }

  useEffect(() => {
    if (!selected._id && templates.length !== 0) {
      select(templates[0])
    }
  }, [templates, selected])

  return (
    <div className={classes.root}>
      <List className={classes.list}>
        {templates.map((t) => (
          <ListItem
            className={classNames({
              [classes.listItemSelected]: t._id === selected._id,
            })}
            key={t._id}
            onClick={() => select(t)}
            button
          >
            <ListItemText primary={t.name} />
          </ListItem>
        ))}
      </List>
      <div className={classes.editor}>
        <ReactJson
          src={selected}
          onAdd={({ updated_src }) =>
            select(/** @type{CharacterTemplateDocument} */ (updated_src))
          }
          onDelete={({ updated_src }) =>
            select(/** @type{CharacterTemplateDocument} */ (updated_src))
          }
          onEdit={({ updated_src }) =>
            select(/** @type{CharacterTemplateDocument} */ (updated_src))
          }
        />
      </div>
      <div className={classes.buttonGroup}>
        <Button
          className={classes.button}
          color="primary"
          variant="contained"
          onClick={() => upsertTemplate({})}
        >
          Add
        </Button>
        <Button
          className={classes.button}
          onClick={() => upsertTemplate(selected)}
          color="primary"
          variant="contained"
        >
          SAVE
        </Button>
        <Button
          className={classes.button}
          onClick={() => deleteTemplate(selected)}
        >
          DELETE
        </Button>
        <div style={{ marginLeft: 'auto' }}>
          <input
            ref={myInput}
            type="file"
            name="file-input"
            style={{ display: 'none' }}
            onChange={onTemplateJsonSelected}
          />
          <Button
            className={classes.button}
            onClick={() => myInput.current.click()}
          >
            IMPORT
          </Button>
        </div>
        <Button
          className={classes.button}
          onClick={() => downloadTemplatesJson({ templates })}
        >
          EXPORT
        </Button>
      </div>
    </div>
  )
}

function downloadTemplatesJson(objectData) {
  let filename = 'export.json'
  let contentType = 'application/json;charset=utf-8;'
  let blob = new Blob(
    [decodeURIComponent(encodeURI(JSON.stringify(objectData)))],
    { type: contentType },
  )
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)

  // 3. Append to html page
  document.body.appendChild(link)

  // 4. Force download
  link.click()

  // 5. Clean up and remove the link
  link.parentNode.removeChild(link)
}

function uploadTemplatesJson() {}

export default TemplateEditor
