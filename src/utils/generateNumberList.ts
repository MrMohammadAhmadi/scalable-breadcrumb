export default function generateNumberList(number: number) {
  var numberList = [];
  for (var i = 1; i <= number; i++) {
    numberList.push(i);
  }
  return numberList;
}
