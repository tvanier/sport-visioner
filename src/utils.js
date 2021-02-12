/* global FileReader, Image */

export const createImageSource = (imageFile) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.addEventListener('load', (event) => {
      resolve(event.target.result)
    })

    reader.onerror = reject

    reader.readAsDataURL(imageFile)
  })
}

export const resizeImage = async (imageSource) => {
  return new Promise((resolve, reject) => {
    const image = new Image()

    image.onload = () => {
      // 299px height as suggested here
      // https://medium.com/decathlondevelopers/identifying-the-sport-in-an-image-using-the-sport-vision-api-2ff4d8582ee2
      const height = 299
      // keep aspect ratio for now
      const width = 299 * image.width / image.height

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      canvas.getContext('2d').drawImage(image, 0, 0, width, height)

      const dataURL = canvas.toDataURL()
      canvas.toBlob((blob) => resolve({ dataURL, blob }))
    }

    image.onerror = reject

    image.src = imageSource
  })
}
