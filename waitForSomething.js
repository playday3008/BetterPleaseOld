/**
 * Waiting for function will return not null result
 *
 * @param {Function} func Function in format "function(){ return bruh(lol) }()"
 * @param {Node|Element} target A DOM Node (which may be an Element) within the DOM tree to watch for changes, or to be the root of a subtree of nodes to be watched.
 * @return {Promise} The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
 */
function waitFor(func, target = document) {
  return new Promise(resolve => {
    if (func)
      return resolve(func);

    const observer = new MutationObserver(mutations => {
      if (func) {
        resolve(func);
        observer.disconnect();
      }
    });

    observer.observe(document, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false
    });
  });
}