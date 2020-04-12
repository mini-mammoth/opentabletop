export function getRatio(imageSrc) {
  return new Promise((resolve) => {
    const img = new Image()
    img.addEventListener('load', () => {
      resolve(img.width / img.height)
    })
    img.src = imageSrc
  })
}
