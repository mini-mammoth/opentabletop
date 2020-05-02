import Dice from 'node-dice-js'
import { BadRequestError } from './errors'

/**
 * @typedef MacroDescription
 *
 * @property {string} macro - name of the macro
 * @property {string} command - params used to execute the macro
 */

/**
 * @typedef Macro
 *
 * @property {function(string): MacroDescription} tryParse
 * @property {function(ChatMessageDocument):*} execute
 */

/**
 * @type {Object<string, Macro>}
 */
const macros = {
  role_dice: {
    tryParse(text) {
      try {
        if (/^\d*d\d+/.exec(text)) {
          return { command: text, macro: 'role_dice' }
        }
      } catch (err) {}
    },
    execute(message) {
      const result = new Dice().execute(message.command)
      message.message = message.message || result.text
      return result.outcomes
    },
  },
}

/**
 * Executes a macro against this message
 *
 * @param {ChatMessageDocument} message
 * @param {string} macroName - name of the macro to execute
 * @returns {ChatMessageDocument}
 */
export function executeMacro(message, macroName) {
  const macro = macros[macroName]
  if (!macro) {
    throw new BadRequestError(`invalid macro: ${macroName}`)
  }

  // Results are stored as the name of the macro
  message[macroName] = macro.execute(message)

  return message
}

/**
 * Removes all "injected" macro results of a message.
 *
 * @param {ChatMessageDocument} message
 * @returns {ChatMessageDocument}
 */
export function removeMacroResults(message) {
  for (const key in macros) {
    if (!macros.hasOwnProperty(key)) {
      continue
    }

    delete message[key]
  }

  return message
}

/**
 * Checks if text can be uses as a macro.
 *
 * Returns undefined if no macro is found.
 *
 * @param {string} text
 * @returns {{macro: string, command: *}|undefined}
 */
export function detectMacro(text) {
  for (const macro of Object.values(macros)) {
    const m = macro.tryParse(text)

    if (m) {
      return m
    }
  }

  return undefined
}
