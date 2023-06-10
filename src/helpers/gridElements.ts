const count = 1000 
const gridElements: string[][] = new Array(count);
for (let i = 0; i < count; i++){
  gridElements[i] = new Array(count)
}
const createElements = () => {
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      gridElements[i][j] = `el ${i}, ${j}`;
    }
  }
};

createElements();
export default gridElements;
