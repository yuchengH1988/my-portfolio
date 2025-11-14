/**
 * 先到 `https://docs.google.com/forms/d/e/${id}/viewform`
 * 在 Console 輸入
 * `(() => {return {id: document.querySelector('form').action.match(/(?<=\/e\/)[^\/]+/g)[0],apiKeys: JSON.stringify(FB_PUBLIC_LOAD_DATA_[1][1])}})()`
 * 並貼到 useGoogleForms() 裡面
 */
export default function useGoogleForms ({ id, apiKeys }) {
  async function submit (payload) {
    const formUrl = `https://docs.google.com/forms/d/e/${id}/formResponse`
    const params = new URLSearchParams()
    const keys = getApiNameKeyMapByJson(apiKeys)

    Object.keys(payload).forEach((dataKey) => {
      if (keys.get(dataKey)) {
        params.append(`entry.${keys.get(dataKey)}`, payload[dataKey])
      } else {
        console.log(`找不到 ${dataKey} 這筆資料對應的 API key`)
      }
    })

    await useFetch(formUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString()
    }).then(() => {
      console.log('成功將資料傳送至', id, 'Google Form')
    })
  }

  function getApiNameKeyMapByJson (str) {
    const keyArr = JSON.parse(str)
    const keyPair = new Map()

    keyArr.forEach((field) => {
      keyPair.set(field[1], field[4][0][0])
    })

    return keyPair
  }

  return { submit }
}
