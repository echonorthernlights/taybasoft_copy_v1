export function generatePassword(length) {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz"
  const symbolChars = "!@#$%&*-|/"
  const numbers = "1234567890"

  const allChars = uppercaseChars + lowercaseChars + symbolChars

  let password = ""
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    password += allChars[randomIndex]
  }

  return password
}
