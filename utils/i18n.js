
export function getLangPageUrl (pageUrl) {
  const localePath = useLocalePath()

  return localePath(pageUrl)
}
