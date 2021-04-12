export function setDefaultInputValues(sizeInput: HTMLInputElement, minesInput: HTMLInputElement) {
  const queryParams = window.location.search;
  const params = new URLSearchParams(queryParams);

  const size = params.get('size');
  const mines = params.get('mines');

  if (size && Number.isInteger(+size)) {
    if (isInRange(sizeInput, +size)) sizeInput.value = size;
  }

  if (mines && Number.isInteger(+mines)) {
    if (isInRange(minesInput, +mines)) minesInput.value = mines;
  }
}

function isInRange(input: HTMLInputElement, value: number) {
  const maxValue = +input.max;
  const minValue = +input.min;

  return value <= maxValue && value >= minValue;
}
