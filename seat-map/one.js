const rows = 20;
const leftCount = 0;
const middleCount = 30;
const rightCount = 0;


// Generate column labels, skipping I, O, Q
function generateColumnLabels(count) {
  const skipped = ['I', 'O', 'Q'];
  const validLetters = [];
  let i = 0;

  while (validLetters.length < count) {
    let label = '';
    let n = i;

    do {
      const char = String.fromCharCode(65 + (n % 26));
      label = char + label;
      n = Math.floor(n / 26) - 1;
    } while (n >= 0);

    if (![...label].some(l => skipped.includes(l))) {
      validLetters.push(label);
    }

    i++;
  }
  return validLetters;
}

const allCols = generateColumnLabels(leftCount + middleCount + rightCount);
const leftCols = allCols.slice(0, leftCount);
const middleCols = allCols.slice(leftCount, leftCount + middleCount);
const rightCols = allCols.slice(leftCount + middleCount);

function setGridColumns(id, count, height='50px') {
  if(!height) height = '50px';

  const block = document.getElementById(id);
  if(!block) return;

  if (count > 0) {
    block.style.display = "grid";
    block.style.gridTemplateColumns = `repeat(${count}, ${height})`;
  } else {
    block.style.display = "none";
  }
}

setGridColumns("middleBlockColumnTop", middleCount);
setGridColumns("leftBlock", leftCount);
setGridColumns("middleBlock", middleCount);
setGridColumns("rightBlock", rightCount);
setGridColumns("middleBlockColumnBottom", middleCount);


function renderSeats(container, cols, blockPosition) {
  if (cols.length === 0) return;

  if (container.id == 'middleBlockColumnTop') {
    cols.forEach(letter => {
      const seat = document.createElement("div");
      seat.className = "seat placeholder column-placeholder";
      seat.setAttribute("data-col", letter);
      seat.innerHTML = `<div class="seat-label top">${letter}</div>`;
      container.appendChild(seat);
    });
  } else if (container.id == 'middleBlock') {
    for (let row = 0; row < rows; row++) {
      cols.forEach((col) => {
        const seat = document.createElement("div");
        seat.className = "seat";
        seat.setAttribute("data-row", row + 1);
        seat.setAttribute("data-col", col);
        seat.setAttribute("data-row-name", row + 1);
        seat.setAttribute("data-col-name", col);
        // seat.innerHTML = `<div class="seat-label">${col}${row + 1}</div>`;
        seat.innerHTML = `<div class="seat-label"></div>`;
        container.appendChild(seat);
      });
    }
  } else if (container.id == 'middleBlockColumnBottom') {
    cols.forEach(letter => {
      const seat = document.createElement("div");
      seat.className = "seat placeholder column-placeholder";
      seat.setAttribute("data-col", letter);
      seat.innerHTML = `<div class="seat-label bottom">${letter}</div>`;
      container.appendChild(seat);
    });
  } else {
    return
  }
}

function renderRowLabels(container, rotate = 0) {
  container.innerHTML = '';

  for (let i = 0; i < rows; i++) {
    const label = document.createElement("div");
    label.className = "row-label row-placeholder";
    label.setAttribute("data-row", i);
    label.textContent = i + 1;
    container.appendChild(label);
  }

}

renderSeats(document.getElementById("middleBlockColumnTop"), middleCols, 'middle');
renderSeats(document.getElementById("leftBlock"), leftCols, 'left');
renderSeats(document.getElementById("middleBlock"), middleCols, 'middle');
renderSeats(document.getElementById("rightBlock"), rightCols, 'right');
renderSeats(document.getElementById("middleBlockColumnBottom"), middleCols, 'middle');

renderRowLabels(document.getElementById("rowLabelsLeft"), 1);
renderRowLabels(document.getElementById("rowLabelsRight"), -1);

// Center screen title dynamically
const screen = document.querySelector(".the-screen");
const screenTitle = document.querySelector(".screen-title");

// Right-click context menu actions
function showContextMenu(e, actions) {
  e.preventDefault();
  const menu = document.createElement("div");
  menu.className = "custom-context-menu";
  menu.style.position = "absolute";
  menu.style.top = `${e.clientY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.background = "white";
  menu.style.border = "1px solid #ccc";
  menu.style.zIndex = 9999;
  actions.forEach(({ label, action }) => {
    const item = document.createElement("div");
    item.textContent = label;
    item.style.padding = "6px 12px";
    item.style.cursor = "pointer";
    item.onclick = () => {
      action();
      menu.remove();
    };
    menu.appendChild(item);
  });
  document.body.appendChild(menu);
  document.addEventListener("click", () => menu.remove(), { once: true });
}

document.body.addEventListener("contextmenu", (e) => {
  const seat = e.target.closest(".seat");
  const isColumnPlaceholder = e.target.closest(".column-placeholder");
  const isRowPlaceholder = e.target.closest(".row-placeholder");

  if (seat && !isColumnPlaceholder) {
    showContextMenu(e, [
      {
        label: "Set Name",
        action: () => {
          const name = prompt("Enter seat name:");
          if (name) {
            seat.setAttribute("data-seat-name", name);
            seat.innerHTML = `<div class='seat-label'>${name}</div>`;
          }
        }
      },
      {
        label: "Set Background Image",
        action: () => {
          const url = prompt("Enter image URL:");
          if (url) {
            seat.style.backgroundImage = `url(${url})`;
            seat.style.backgroundSize = 'cover';
          }
        }
      }
    ]);
  } else if (isColumnPlaceholder) {
    const col = isColumnPlaceholder.getAttribute("data-col");
    showContextMenu(e, [
      {
        label: "Set Name",
        action: () => {
          const colName = prompt("Enter column name:");
          if (colName) {
            document.querySelectorAll(`.seat[data-col='${col}']`).forEach(seat => {
              seat.setAttribute("data-col-name", colName);
              const rowName = seat.getAttribute("data-row-name") || '';
              seat.innerHTML = `<div class='seat-label'>${colName}${rowName}</div>`;
            });
          }
        }
      },
      {
        label: "Set Background Image",
        action: () => {
          const url = prompt("Enter image URL:");
          if (url) {
            document.querySelectorAll(`.seat[data-col='${col}']`).forEach(seat => {
              seat.style.backgroundImage = `url(${url})`;
              seat.style.backgroundSize = 'cover';
            });
          }
        }
      }
    ]);
  } else if (isRowPlaceholder) {
    const row = isRowPlaceholder.getAttribute("data-row");
    showContextMenu(e, [
      {
        label: "Set Name",
        action: () => {
          const rowName = prompt("Enter row name:");
          if (rowName) {
            document.querySelectorAll(`.seat[data-row='${row}']`).forEach(seat => {
              seat.setAttribute("data-row-name", rowName);
              const colName = seat.getAttribute("data-col-name") || '';
              seat.innerHTML = `<div class='seat-label'>${colName}${rowName}</div>`;
            });
          }
        }
      },
      {
        label: "Set Background Image",
        action: () => {
          const url = prompt("Enter image URL:");
          if (url) {
            document.querySelectorAll(`.seat[data-row='${row}']`).forEach(seat => {
              seat.style.backgroundImage = `url(${url})`;
              seat.style.backgroundSize = 'cover';
            });
          }
        }
      }
    ]);
  }
});

// Click to log seat
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat')) {
    const row = e.target.getAttribute('data-row');
    const col = e.target.getAttribute('data-col');
    console.log(`Row: ${row}, Column: ${col}`);
  }
});