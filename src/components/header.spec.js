/* global describe, it, expect */

import { render } from '@testing-library/svelte'

import Header from './header'

describe('header', () => {
  it('should contain the correct title', () => {
    const { getByText } = render(Header)

    expect(getByText('Sport Visioner')).toBeInTheDocument()
  })
})
