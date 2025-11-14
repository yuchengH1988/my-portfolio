export const transDateToZh = (date) => {
  /**
   * 傳入 2024/12/31 改成 2024年12月31日
   **/
  const dateArr = date.split('/')

  return `${dateArr[0]}年${dateArr[1]}月${dateArr[2]}日`
}

export const transDate = (date) => {
  // 2025-02-06 17:20:09 改成 2025/02/06
  const dateArr = date.split(' ')
  const dateArr2 = dateArr[0].split('-')

  return `${dateArr2[0]}/${dateArr2[1]}/${dateArr2[2]}`
}

export const transThousands = (number) => {
  /**
   * 傳入 1000 改成 1,000
   **/
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}