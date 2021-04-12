export function setDefaultInputValues(sizeInput: HTMLInputElement, minesInput: HTMLInputElement) {
  const queryParams = window.location.search;
  const params = new URLSearchParams(queryParams);

  const size = params.get('size');
  const mines = params.get('mines');

  if (size && Number.isInteger(+size)) sizeInput.value = size;
  if (mines && Number.isInteger(+mines)) minesInput.value = mines;
}
