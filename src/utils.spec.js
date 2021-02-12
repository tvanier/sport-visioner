/* global jest, describe, it, expect, FileReader, Blob */

import { createImageSource } from './utils'

describe('utils', () => {
  describe('createImageSource', () => {
    it('should read image', async () => {
      const mockRead = jest.spyOn(FileReader.prototype, 'readAsDataURL')
      const imageFile = new Blob([])

      await createImageSource(imageFile)

      expect(mockRead).toHaveBeenCalledTimes(1)
      expect(mockRead).toHaveBeenCalledWith(imageFile)
    })
  })
})
