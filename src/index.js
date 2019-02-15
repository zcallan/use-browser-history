import { useEffect } from 'react'

function useBrowserHistory(name, isOpen, onBack, onForward) {
  function handleBack() {
    if (window.history.state && window.history.state[name]) {
      window.history.go(-1)
    }

    if (onBack) {
      onBack()
    }
  }

  function handleForward(args) {
    if (onForward) {
      onForward()
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', handlePopState)

    if (isOpen && (!window.history.state || !window.history.state[name])) {
      window.history.pushState({ [name]: true }, '')
    }

    function handlePopState(event) {
      if (!event.state || !event.state[name]) {
        handleBack()
      } else {
        handleForward()
      }
    }

    return () => {
      window.removeEventListener('popstate', handlePopState)

      if (isOpen) {
        handleBack()
      }
    }
  }, [isOpen])

  return [handleBack, handleForward]
}

export default useBrowserHistory
