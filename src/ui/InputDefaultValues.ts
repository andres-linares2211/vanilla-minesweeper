export function setDefaultInputValues(sizeInput: HTMLInputElement, minesInput: HTMLInputElement) {
  const queryParams = window.location.search;
  const params = new URLSearchParams(queryParams);

  const size = params.get('size');
  const mines = params.get('mines');

  if (size && Number.isInteger(+size)) {
    const isInRange = +size <= +sizeInput.max && +size >= +sizeInput.min;
    if (isInRange) sizeInput.value = size;
  }

  if (mines && Number.isInteger(+mines)) {
    const isInRange = +mines <= +minesInput.max && +mines >= +minesInput.min;
    if (isInRange) minesInput.value = mines;
  }
}
