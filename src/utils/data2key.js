// const result = [
//   {
//     "movieId":"123",
//     "movieName":"泰坦尼克号",
//     "pic":"",
//     "description":""
//   }]

export default function data2Key(data) {
  const newArr = [];
  data.forEach(item => {
    const label = item.movieName;
    const value = item.movieId;
    const obj = {};
    obj['label'] = label;
    obj['value'] = value;
    newArr.push(obj);
  });
  return newArr;
}