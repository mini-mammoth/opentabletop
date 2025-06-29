import React, { useCallback, useEffect, useState } from 'react'
import { usePouchDB } from '../utils/PouchDBContext'
import { throwIfError } from './utils'

/**
 * Replaces a document in a list or appends if new
 * @param oldDocs {DbDocument[]} - old list
 * @param doc {DbDocument}
 * @return {DbDocument[]} - new list
 */
function merge(oldDocs, doc) {
  let updated = false
  const newDocs = []

  for (let existing of oldDocs) {
    if (existing._id === doc._id) {
      newDocs.push(doc)
      updated = true
    } else {
      newDocs.push(existing)
    }
  }

  if (!updated) {
    newDocs.push(doc)
  }

  return newDocs
}

/**
 * Removes document from list.
 * @param oldDocs {DbDocument[]} -
 * @param id {string} -
 * @return {DbDocument[]}
 */
function removeById(oldDocs, id) {
  const newDocs = []

  for (let existing of oldDocs) {
    if (existing._id !== id) {
      newDocs.push(existing)
    }
  }

  return newDocs
}

/**
 * Hook to use the templates
 *
 * @returns {[CharacterTemplateDocument[], function(CharacterTemplateDocument|{}):void, function(CharacterTemplateDocument):void, function(CharacterTemplateDocument[]):void]}
 */
export default function useCharacterTemplate() {
  const db = usePouchDB()
  const [templates, setTemplates] = useState([])

  useEffect(() => {
    if (!db) {
      return
    }

    // Get templates
    db.allDocs({
      startkey: 'urn:ott:templates:char:',
      endkey: 'urn:ott:templates:char:\ufff0',
      include_docs: true,
    })
      .then(throwIfError)
      .then((res) => {
        const all = res.rows.map((row) => row.doc)
        setTemplates((templates) => [...all, ...templates])
      })
      .catch(console.error)

    // Receive live updates
    const changes = db
      .changes({
        live: true,
        since: 'now',
        include_docs: true,
        filter: (doc) => /^urn:ott:templates:char:/.exec(doc._id),
      })
      .on('change', ({ doc, deleted }) => {
        if (deleted) {
          setTemplates((templates) => removeById(templates, doc._id))
        } else {
          setTemplates((templates) => merge(templates, doc))
        }
      })
      .on('error', console.error)

    return () => changes.cancel()
  }, [db])

  const upsertTemplate = useCallback(
    (template) => {
      if (!db) return

      const timestamp = Date.now()

      db.put({
        _id: `urn:ott:templates:char:${timestamp}`,
        name: `My Template ${templates.length}`,
        ...template,
        type: 'CharacterTemplate',
      })
        .then(throwIfError)
        .catch(console.error)
    },
    [db, templates.length],
  )

  const deleteTemplate = useCallback(
    (template) => {
      if (!db) return

      db.remove({ _id: template._id, _rev: template._rev })
        .then(throwIfError)
        .catch(console.error)
    },
    [db],
  )

  const importTemplates = useCallback(
    (templates) => {
      if (!db) return
      for (const template of templates) {
        upsertTemplate(template)
      }
    },
    [db],
  )

  return [templates, upsertTemplate, deleteTemplate, importTemplates]
}
