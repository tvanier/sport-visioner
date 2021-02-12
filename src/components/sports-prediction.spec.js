/* global describe, it, expect */

import { render } from '@testing-library/svelte'

import SportsPrediction from './sports-prediction'

describe('sport-prediction', () => {
  it('should contain the default message', () => {
    const { getByTestId } = render(SportsPrediction)

    expect(getByTestId('message').textContent).toEqual('This image shows unknown')
    expect(getByTestId('small-text').textContent).toEqual('Found 0 sports')
  })

  it('should contain the message for prediction not matching expected', () => {
    const prediction = {
      sport: [
        { id: 789, name: 'tennis', probability: 0.12345 }
      ]
    }
    const { getByTestId } = render(SportsPrediction, {
      props: {
        prediction,
        expected: {}
      }
    })

    expect(getByTestId('message').textContent).toEqual(
      'Oops, looks like this image shows tennis at 12.35%'
    )
    expect(getByTestId('small-text').textContent).toEqual('Found 1 sports')
  })

  it('should contain the message for prediction matching expected', () => {
    const prediction = {
      sport: [
        { id: 1, name: 'tennis', probability: 0.12345 }
      ]
    }
    const { getByTestId } = render(SportsPrediction, {
      props: {
        prediction,
        expected: { id: 1 }
      }
    })

    expect(getByTestId('message').textContent).toEqual(
      'Correct! This image shows tennis'
    )
    expect(getByTestId('small-text').textContent).toEqual('Found 1 sports')
  })

  it('should contain the message for each sport found', () => {
    const prediction = {
      sport: [
        { id: 1, name: 'tennis', probability: 0.12345 },
        { id: 2, name: 'soccer', probability: 0.05678 },
        { id: 3, name: 'basketball', probability: 0.8212345 }
      ]
    }

    const { getByText } = render(SportsPrediction, {
      props: {
        prediction
      }
    })

    expect(getByText('tennis at 12.35%')).toBeInTheDocument()
    expect(getByText('soccer at 5.68%')).toBeInTheDocument()
    expect(getByText('basketball at 82.12%')).toBeInTheDocument()
  })
})
