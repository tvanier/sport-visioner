/* global FileReader, Blob, Image */
import { describe, it, expect, vi } from 'vitest'
// import { createCanvas } from 'canvas'
import { createImageSource, resizeImage } from './utils'

describe('utils', () => {
  describe('createImageSource', () => {
    it('should read image', async () => {
      const mockRead = vi.spyOn(FileReader.prototype, 'readAsDataURL')
      const imageFile = new Blob([])

      await createImageSource(imageFile)

      expect(mockRead).toHaveBeenCalledTimes(1)
      expect(mockRead).toHaveBeenCalledWith(imageFile)
    })
  })

  describe('resizeImage', () => {
    it.skip('should resize image', async () => {
      // create fake image
      const canvas = document.createElement('canvas') // createCanvas(1000, 1000)
      const imageSource = canvas.toDataURL()

      const result = await resizeImage(imageSource)

      expect(result).toHaveProperty('dataURL')
      expect(result).toHaveProperty('blob')

      await new Promise((resolve, reject) => {
        const resizedImage = new Image()

        resizedImage.onload = () => {
          expect(resizedImage.height).toEqual(299)
          expect(resizedImage.width).toEqual(299 * canvas.width / canvas.height)
          resolve()
        }

        resizedImage.onerror = reject

        resizedImage.src = result.dataURL
      })
    })
  })
})
