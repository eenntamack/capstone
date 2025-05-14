
function arrayMult(arr, multiplier) {

  //return arr.concat(...arr)
  let newArr = []
  if (Array.isArray(arr)) {
    for(let i = 0; i < multiplier;i++){
      newArr = newArr.concat(arr)
    }
  }
  return newArr;
}

export {arrayMult}