/* global FormData */

const baseUrl = 'https://sport-vision-api.decathlon.com/v2'

const apiKey = `${import.meta.env.VITE_DECATHLON_API_KEY}`

export const getSports = async (options = {}) => {
  const searchParams = new URLSearchParams({
    parents_only: true,
    ...options.searchParams
  })
  const response = await fetch(`https://sports.api.decathlon.com/sports?${searchParams.toString()}`)

  if (response.ok) {
    return await response.json()
  }
}

export const classifySport = async (imageFile) => {
  const formData = new FormData()
  formData.append('file', imageFile)

  const params = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: apiKey
    },
    body: formData
  }

  try {
    const url = `${baseUrl}/sportclassifier/predict/`
    const response = await fetch(url, params)

    if (!response.ok) {
      throw Error(`predict failure ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}
