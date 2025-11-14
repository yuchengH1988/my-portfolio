import fs from 'fs'

const config = useRuntimeConfig()

export default function defineEventHandler (event) {
  const BS_URL = config.BS_URL

  const id = decodeURIComponent(getRouterParam(event, 'id'))

  try {
    const content = fs.readFileSync(`${BS_URL}data/${id}.json`, 'utf8')

    return {
      status: 200,
      data: {
        file_name: id,
        content
      }
    }
  } catch (error) {
    return {
      status: 404,
      data: {
        message: '查無資料'
      }
    }
  }
}
