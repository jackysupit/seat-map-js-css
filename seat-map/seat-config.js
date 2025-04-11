// Toggle popup
const configButton = document.getElementById('config-button');
const configPopup = document.getElementById('config-popup');

configButton.addEventListener('click', (e) => {
  e.stopPropagation(); // prevent click from bubbling
  configPopup.classList.toggle('show');
});

// Hide popup when clicking outside
document.addEventListener('click', (e) => {
  if (!configPopup.contains(e.target) && e.target !== configButton) {
    configPopup.classList.remove('show');
  }
});

// Submit button
document.getElementById('submit-config').addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('config-name').value;
  const template = document.getElementById('config-template-label').value;
  const rowCount = parseInt(document.getElementById('config-row-count').value) || 20;

  const colCount = parseInt(document.getElementById('config-col-count').value) || 30;

  console.log({ name, template, rowCount, colCount });

  // TODO: call regenerateSeatMap(rowCount, colCount)

  // Close popup
  configPopup.classList.remove('show');
});
