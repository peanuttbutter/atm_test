export const resultDiv = document.querySelector(".result");

export function renderResult(result, totalTime, inputSum) {
  let resultMas = [];
  result[0].forEach((item) => {
    resultMas.push(`${item[0]} из кассеты №${item[1]}`);
  });
  resultDiv.textContent = `Выдано ${inputSum}: ${resultMas.join(
    ", "
  )} за ${totalTime}ms`;
}
