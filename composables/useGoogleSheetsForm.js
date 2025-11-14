export default function useGoogleForms (id) {
  const { GOOGLE_SCRIPT_ID } = useRuntimeConfig().public

  async function submit (payload) {
    const formUrl = `https://script.google.com/macros/s/${id || GOOGLE_SCRIPT_ID}/exec`

    await useFetch(formUrl, {
      query: payload,
      mode: 'no-cors'
    }).then(() => {
      console.log('成功將資料傳送')
    })
  }

  return { submit }
}
