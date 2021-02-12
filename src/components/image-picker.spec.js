/* global describe, it, expect, listen, File */

import { render, fireEvent } from '@testing-library/svelte'

import ImagePicker from './image-picker'

describe('image-picker', () => {
  it('should contain the correct label', () => {
    const { getByText } = render(ImagePicker)

    expect(getByText('Select an image')).toBeInTheDocument()
  })

  it('should dispatch image-file on input change', async () => {
    const { component, getByTestId } = render(ImagePicker)
    const file = new File([''], 'image.png', { type: 'image/png' })
    listen(component, 'image-file')

    const input = getByTestId('input')
    await fireEvent.change(input, {
      target: {
        files: [file]
      }
    })

    expect(component).toHaveFiredEventTimes('image-file', 1)
    expect(component).toHaveFiredEventWith('image-file', { image: file })
  })

  it('should not dispatch image-file on input change if not image', async () => {
    const { component, getByTestId } = render(ImagePicker)
    const file = new File([''], 'file.html', { type: 'text/html' })
    listen(component, 'image-file')

    const input = getByTestId('input')
    await fireEvent.change(input, {
      target: {
        files: [file]
      }
    })

    expect(component).toHaveFiredEventTimes('image-file', 0)
  })
})
