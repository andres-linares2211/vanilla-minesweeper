export function setDefaultInputValues(sizeInput: HTMLInputElement, minesInput: HTMLInputElement) {
  const queryParams = window.location.search;
  const params = new URLSearchParams(queryParams);

  const size = params.get('size');
  const mines = params.get('mines');

  if (size) sizeInput.value = size;
  if (mines) minesInput.value = mines;
}
