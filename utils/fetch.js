const fetchFn = async ({ apiPath, method = 'GET', auth = false, query = {}, body, client = true, customApiUrl = false }) => {
  const config = useRuntimeConfig()
  let APP_API = ''

  if (!customApiUrl) {
    if (client) {
      APP_API = config.public.APP_API
    } else {
      APP_API = config.APP_API
    }
  }

  const apiUrl = `${APP_API}${apiPath}`

  const fetchConfig = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: auth ? `Bearer ${token}` : null
    },
    body: body && method !== 'GET' ? JSON.stringify(body) : null,
    query: {
      ...query
    }
  }
  const route = useRoute()

  if (route.query?.preview_id) {
    fetchConfig.query = { ...fetchConfig.query, preview_id: route.query?.preview_id }
  }

  try {
    const { data, error } = await useFetch(apiUrl, fetchConfig)

    console.log('回傳資料:', data)

    if (error.value) {
      throw new Error(error)
    }

    return {
      success: true,
      data: data.value.data
    }
  } catch (error) {
    console.log('錯誤:', error)

    return {
      success: false,
      data: error
    }
  }
}

const fetchPublic = (targetUrl) => {
  const config = useRuntimeConfig()

  if (process.client) {
    return `${config.public.APP_CDN_URL}${targetUrl}`
  }

  return `${config.APP_CDN_URL}${targetUrl}`
}

export { fetchFn, fetchPublic }
