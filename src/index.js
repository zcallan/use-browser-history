import { useEffect } from 'react'

function useBrowserHistory(name, isActive, onBack, onForward) {
  /**
   * Ensures the browser history state stays up to date for when the browser back button
   * is pressed, and when the hook being called from inside a function component is fired.
   */
  function handleBack() {
    /* Force the browser to go back to remove the entry from the browser history state. */
    if (window.history.state && window.history.state[name]) {
      window.history.go(-1)
    }

    /* Fire the optional callback for `onBack`. */
    if (onBack) {
      onBack()
    }
  }

  /**
   * Handles the browser forward button being pressed. There's nothing to do internally here!
   */
  function handleForward() {
    /* Fire the optional callback for `onForward`. */
    if (onForward) {
      onForward()
    }
  }

  /**
   * Handles the window event for `popstate` being fired.
   * If our entry exists in the browser history state, we can assume the back button has been
   * pressed. Otherwise, we can assume the forward button has been pressed.
   *
   * @param {{ state: {} }} event
   */
  function handlePopState(event) {
    /* If the entry doesn't exist, assume it has just been popped from the state (i.e. back
      * button pressed). Otherwise, assume the opposite - i.e. forward button pressed. */
    if (!event.state || !event.state[name]) {
      handleBack()
    } else {
      handleForward()
    }
  }

  useEffect(() => {
    /* Add up the event listener. */
    window.addEventListener('popstate', handlePopState)

    /* If `isActive` is set and we haven't made an entry to the browser history state yet,
     * push our new entry onto the stack. From hereon, when the browser back button is pressed,
     * the page won't change, and we can handle that event above to fire our internal functions. */
    if (isActive && (!window.history.state || !window.history.state[name])) {
      /* Push the new entry to the state, as well as any existing state in the browser history. */
      window.history.pushState({
        ...window.history.state,
        [name]: true
      }, '')
    }

    /* Perform clean up in here. */
    return () => {
      /* Clean up the event listener. */
      window.removeEventListener('popstate', handlePopState)

      /* If `isActive` is set (and therefore means it is being changed to `false` on the next
       * render), fire the `handleBack` function to clean up the browser history state. */
      if (isActive) {
        handleBack()
      }
    }
  }, [isActive]) // Only update when `isActive` changes

  /* Provide these functions so the function component can integrate with the browser history.
   * I couldn't think of a use-case for `handleForward` being called within the component, but
   * it's provided just in case. */
  return [handleBack, handleForward]
}

export default useBrowserHistory
