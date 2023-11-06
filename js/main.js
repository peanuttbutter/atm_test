import { Cassette } from "./data.js";
import { resultDiv, renderResult } from "./render.js";

let cassettesList = [];

document
  .getElementById("cassetteCount")
  .addEventListener("change", ({ target: { value } }) => {
    let cassetteCount = value;
    renderCassette(cassetteCount);
    resultDiv.textContent = "";
  });

document.addEventListener("DOMContentLoaded", () => {
  renderCassette(1);
});

document
  .querySelector(".money_count_btn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    let inputSum = +document.getElementById("inputSum").value;
    isAvailableToDispense(inputSum);
    document.getElementById("inputSum").value = "";
  });

function renderCassette(value) {
  if (cassettesList.length === 0) {
    for (let i = 1; i <= value; i++) {
      generateAndRenderCassette(i);
    }
  } else if (cassettesList.length > 0) {
    let max_id = cassettesList[cassettesList.length - 1].id;
    if (max_id < value) {
      cassettesList.forEach((item) => {
        renderExistObject(item);
      });

      for (let i = max_id + 1; i <= value; i++) {
        generateAndRenderCassette(i);
      }
    } else if (max_id >= value) {
      for (let i = max_id; i > value; i--) {
        removeUnnecessaryElements(i);
      }

      cassettesList.slice(0, value).forEach((item) => {
        renderExistObject(item);
      });
    }
  }
}

function generateAndRenderCassette(index) {
  let cassette = new Cassette(index);
  cassette.generateCassette();

  cassettesList.push(cassette);
  cassettesList.forEach((item) => {
    renderExistObject(item);
  });
}

function renderExistObject(object) {
  const numberParent = document.querySelector(".settings_cassette");
  numberParent.append(object._data["idBlock"]);

  const selectFirstParent = document.querySelector(".settings_value");
  selectFirstParent.append(object._data["valueBlock"]);

  const inputParent = document.querySelector(".settings_remainder");
  inputParent.append(object._data["remainderBlock"]);

  const selectSecondParent = document.querySelector(".settings_status");
  selectSecondParent.append(object._data["statusBlock"]);
}

function removeUnnecessaryElements(index) {
  document.querySelector(`.settings_cassette_number${index}`) &&
    document.querySelector(`.settings_cassette_number${index}`).remove();
  document.querySelector(`.settings_value_select${index}`) &&
    document.querySelector(`.settings_value_select${index}`).remove();
  document.querySelector(`#cassetteTotal${index}`) &&
    document.querySelector(`#cassetteTotal${index}`).remove();
  document.querySelector(`.settings_status_input${index}`) &&
    document.querySelector(`.settings_status_input${index}`).remove();
}

function isAvailableToDispense(inputSum) {
  let startTime = new Date().getTime();

  inputSum = Math.trunc(inputSum);
  let cassetteTotalSum = 0;
  cassettesList.map((item) => {
    cassetteTotalSum += item.remainder * item.selectValue;
  });

  if (inputSum > cassetteTotalSum) {
    return (resultDiv.textContent = "Недостаточно купюр для выдачи");
  }
  if (inputSum === 0) {
    return (resultDiv.textContent = "Введите значение от 100");
  }

  let availableCassettesList = cassettesList.filter(
    (cassette) => cassette.status && cassette.remainder > 0
  );
  let banknotesArr = [];

  availableCassettesList.forEach((item) => {
    banknotesArr.push(Array(item.remainder).fill([item.selectValue, item.id]));
  });

  let subsets = getSubsetsForSum(banknotesArr.flat(1), inputSum);
  subsets = Array.from(new Set(subsets.map(JSON.stringify)), JSON.parse).map(
    (subset) => subset.sort()
  );

  subsets = Array.from(new Set(subsets.map(JSON.stringify)), JSON.parse);

  if (subsets.length === 0) {
    return (resultDiv.textContent = "Нет подходящих купюр для выдачи");
  }
  const endTime = new Date().getTime();
  const totalTime = endTime - startTime;

  renderResult(subsets, totalTime);
}

function getSubsetsForSum(banknotesArr, inputSum) {
  const result = [];
  const currentSubarray = [];

  function findSubarrays(index, currentSum) {
    if (index === banknotesArr.length) {
      if (currentSum === inputSum) {
        result.push([...currentSubarray]);
      }
      return;
    }

    currentSubarray.push(banknotesArr[index]);
    findSubarrays(index + 1, currentSum + banknotesArr[index][0]);
    currentSubarray.pop();

    findSubarrays(index + 1, currentSum);
  }

  findSubarrays(0, 0);
  return result;
}
