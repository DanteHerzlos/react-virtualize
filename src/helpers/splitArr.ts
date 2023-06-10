export const splitArr = (arr: any[], chunkSize: number) => {
  const chunks = []
  const chunksCount = Math.ceil(arr.length / chunkSize)
  for(let i = 0; i < chunksCount; i++){
    chunks.push(arr.slice(i*chunkSize, chunkSize*(i+1)))
  }
  return chunks
}
