// Toggle popup
const configButton = document.getElementById('configButton');
const configPopup = document.getElementById('configPopup');

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
document.getElementById('submitConfig').addEventListener('click', (e) => {
  e.preventDefault();

  const name = document.getElementById('nameInput').value;
  const template = document.getElementById('templateInput').value;
  const rowCount = parseInt(document.getElementById('rowCount').value);
  const colCount = parseInt(document.getElementById('colCount').value);

  console.log({ name, template, rowCount, colCount });

  // TODO: call regenerateSeatMap(rowCount, colCount)

  // Close popup
  configPopup.classList.remove('show');
});
