export const changeMeta = (options = {}) => {
  const keys = Object.keys(options);
  if (!keys.length) return
  keys.forEach(key => {
    const isTitle = key === 'title'
    let el = document.querySelector(isTitle ? 'title' : `meta[name="${key}"]`)

    if (el) {
      if (isTitle) {
        document.title = options[key]
      } else {
        el.setAttribute('content', options[key])
      }
    } else if (isTitle) {
      const title = document.createElement('title')
      title.textContent = options[key]
      document.head.appendChild(title)
    } else {
      const meta = document.createElement('meta')
      meta.setAttribute('name', key)
      meta.setAttribute('content', options[key])
      document.head.appendChild(meta)
    }
  })
}