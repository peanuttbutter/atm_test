export class Cassette {
  get data() {
    return this._data;
  }
  set data(data) {
    this._data[data[0]] = data[1];
  }

  constructor(id) {
    this.id = id;
    this.selectValue = 100;
    this.remainder = 0;
    this.status = true;
    this._data = {};
  }

  generateCassette() {
    this.generateNumber(this.id);
    this.generateSelectFirst(this.id);
    this.generateInput(this.id);
    this.generateSelectSecond(this.id);
  }

  generateNumber(id) {
    const number = document.createElement("p");

    number.classList.add(
      "settings_cassette_number",
      `settings_cassette_number${id}`
    );
    number.textContent = id;
    this.data = ["idBlock", number];
  }

  generateSelectFirst(id) {
    const selectFirst = document.createElement("select");
    const container = document.createElement("div");

    container.classList.add(
      "cassette_choice",
      "settings_value_select",
      `settings_value_select${id}`
    );
    selectFirst.id = `cassetteValue${id}`;
    container.append(selectFirst);

    const options = [100, 200, 500, 1000, 2000, 5000];
    options.forEach((item) => {
      let option = document.createElement("option");
      option.text = item;
      option.setAttribute = ("value", item);
      selectFirst.add(option);
    });

    selectFirst.addEventListener("change", ({ target: { value } }) => {
      this.selectValue = +value;
    });

    this.data = ["valueBlock", container];
  }

  generateInput(id) {
    const input = document.createElement("input");

    input.id = `cassetteTotal${id}`;
    input.classList.add("settings_remainder_input");
    input.setAttribute("type", "number");
    input.setAttribute("min", "0");
    input.setAttribute("step", "1");

    input.addEventListener("input", ({ target: { value } }) => {
      this.remainder = +value;
    });

    this.data = ["remainderBlock", input];
  }

  generateSelectSecond(id) {
    const selectSecond = document.createElement("select");
    const container = document.createElement("div");

    container.classList.add(
      "cassette_choice",
      "settings_status_input",
      `settings_status_input${id}`
    );

    selectSecond.id = `cassetteStatus${id}`;
    selectSecond.classList.add("settings_remainder_input");
    container.append(selectSecond);

    const options = ["Исправна", "Неисправна"];
    options.forEach((item) => {
      let option = document.createElement("option");
      option.text = item;
      option.setAttribute = ("value", item);
      selectSecond.add(option);
    });

    selectSecond.addEventListener("change", ({ target: { value } }) => {
      value === "Исправна" ? (this.status = true) : (this.status = false);
    });

    this.data = ["statusBlock", container];
  }
}
