export const resultDiv = document.querySelector(".result");

export function renderResult(result, totalTime) {
  let resultMas = [];
  result[0].forEach((item) => {
    resultMas.push(`${item[0]} из кассеты №${item[1]}`);
  });
  resultDiv.textContent = `Выдано: ${resultMas.join(", ")} за ${totalTime}ms`;
}
