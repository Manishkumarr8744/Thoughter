import React, { useState, useEffect } from 'react'

const TextType = ({ text, typingSpeed = 100, pauseDuration = 1000, showCursor = true, cursorCharacter = '|' }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentText = text[textIndex]
    let timeout

    if (!isDeleting && displayedText.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length + 1))
      }, typingSpeed)
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(currentText.slice(0, displayedText.length - 1))
      }, typingSpeed / 2)
    } else if (!isDeleting && displayedText.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), pauseDuration)
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false)
      setTextIndex((textIndex + 1) % text.length)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, textIndex])

  return (
    <span>
      {displayedText}
      {showCursor && <span>{cursorCharacter}</span>}
    </span>
  )
}

export default TextType
