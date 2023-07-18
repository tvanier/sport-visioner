import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/svelte'

import Header from './header.svelte'

describe('header', () => {
  it('should contain the correct title', () => {
    const { getByText, unmount } = render(Header)

    expect(getByText('Sport Visioner')).toBeDefined()

    unmount()
  })
})
