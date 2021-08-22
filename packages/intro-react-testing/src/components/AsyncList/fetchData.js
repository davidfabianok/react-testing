const arrFruits = ['🍎', '🍐', '🍉'];

export default function fetchData() {
  return new Promise(function (resolve) {
    return setTimeout(() => resolve(arrFruits), 2000);
  });
}
