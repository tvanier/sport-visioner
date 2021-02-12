/* global jest, describe, it, expect, beforeAll, afterAll, beforeEach */

// current jest does not support import.meta
// https://github.com/facebook/jest/issues/4842
// import { getSports } from './api'
// mocking getSports here to illustrate tests below
const getSports = async () => {
  const response = await fetch('https://sports.api.decathlon.com/sports')

  if (response.ok) {
    return await response.json()
  }
}

describe('api', () => {
  let fetchMocked = false

  beforeAll(() => {
    if (!('fetch' in window)) {
      // jsdom does not support fetch yet
      // https://github.com/jsdom/jsdom/issues/1724
      window.fetch = () => {}
      fetchMocked = true
    }
  })

  afterAll(() => {
    if (fetchMocked) {
      delete window.fetch
    }
  })

  let fetchSpy
  let response

  beforeEach(() => {
    fetchSpy = jest.spyOn(window, 'fetch')

    response = {
      json: jest.fn()
    }
    fetchSpy.mockResolvedValue(response)
  })

  describe('getSports', () => {
    it('should fetch the correct url', () => {
      getSports()

      expect(fetchSpy).toHaveBeenCalledTimes(1)
      expect(fetchSpy).toHaveBeenCalledWith('https://sports.api.decathlon.com/sports')
    })

    it('should read json if response ok', async () => {
      const body = {}
      response.ok = true
      response.json.mockResolvedValue(body)

      const result = await getSports()

      expect(response.json).toHaveBeenCalledTimes(1)
      expect(result).toEqual(body)
    })

    it('should not read json if response not ok', async () => {
      response.ok = false

      await getSports()

      expect(response.json).not.toHaveBeenCalled()
    })
  })
})
