import Dice from 'node-dice-js'
import { BadRequestError } from './errors'

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
 * @param message {Message}
 * @param macroName {string} - name of the macro to execute
 * @return {Message}
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
 * @param message
 * @return {*}
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
 * @param text {string}
 * @return {{macro: string, command: *}|undefined}
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
