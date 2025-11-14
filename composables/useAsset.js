export function useAsset (path) {
  const assets = import.meta.glob('~/assets/images/**/*', {
    eager: false,
    import: 'default'
  })

  const imagePath = `/assets/images/${path}`
  
  if (!assets[imagePath]) {
    console.warn(`Image not found: ${imagePath}`)
    return null
  }

  return assets[imagePath]()
}

// Usage: <img :src="useAsset('path/name.jpg')" />
// Example: <img :src="useAsset(`image-${i}.jpg`)" />
