export function setDefaultInputValues(sizeInput: HTMLInputElement, minesInput: HTMLInputElement) {
  const queryParams = window.location.search;
  const params = new URLSearchParams(queryParams);

  if (params.get('size')) {
    sizeInput.value = params.get('size') || '10';
  }
  if (params.get('mines')) {
    minesInput.value = params.get('mines') || '10';
  }
}
