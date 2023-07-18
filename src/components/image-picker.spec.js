/* global File */
import { describe, it, expect, vi } from 'vitest'
import { render, fireEvent } from '@testing-library/svelte'

import ImagePicker from './image-picker.svelte'

describe.only('image-picker', () => {
  it('should contain the correct label', () => {
    const { getByText, unmount } = render(ImagePicker)

    expect(getByText('Select an image')).toBeDefined()

    unmount()
  })

  it('should dispatch image-file on input change', async () => {
    const { component, getByTestId, unmount } = render(ImagePicker)
    const file = new File([''], 'image.png', { type: 'image/png' })

    const eventHandler = vi.fn()
    component.$on('image-file', eventHandler)

    const input = getByTestId('input')
    await fireEvent.change(input, {
      target: {
        files: [file]
      }
    })

    expect(eventHandler).toHaveBeenCalledTimes(1)
    const event = eventHandler.mock.calls[0][0]
    expect(event.detail).toEqual({ image: file })

    unmount()
  })

  it('should not dispatch image-file on input change if not image', async () => {
    const { component, getByTestId, unmount } = render(ImagePicker)
    const file = new File([''], 'file.html', { type: 'text/html' })

    const eventHandler = vi.fn()
    component.$on('image-file', eventHandler)

    const input = getByTestId('input')
    await fireEvent.change(input, {
      target: {
        files: [file]
      }
    })

    expect(eventHandler).not.toHaveBeenCalled()
    unmount()
  })
})
