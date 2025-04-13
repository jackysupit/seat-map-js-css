class MyMapConfig {
  static _is_listening = false;

  constructor({
    myMap,
    configButton = 'config-button',
    configPopup = 'config-popup',
    configSubmit = 'submit-config',
    submitSeats = 'submit-seats',
  }) {
    this.myMap = myMap
    this.configButton = configButton
    this.configPopup = configPopup
    this.configSubmit = configSubmit
    this.submitSeats = submitSeats

    this.elConfigButton = document.getElementById(configButton);
    this.elConfigPopup = document.getElementById(configPopup);
    this.elConfigSubmit = document.getElementById(configSubmit);
    this.elSubmitSeats = document.getElementById(submitSeats);

    if(!MyMapConfig._is_listening) {
      this.listen()
    }
  }

  submit() {
    const result = {
        id: this.elConfigPopup.querySelector('#config-id').value,
        name: this.elConfigPopup.querySelector('#config-name').value,
        default_label_template: this.elConfigPopup.querySelector('#config-label-template').value,
        row_count: parseInt(this.elConfigPopup.querySelector('#config-row-count').value),
        col_count: parseInt(this.elConfigPopup.querySelector('#config-col-count').value),
        chosen: []
      };
      this.myMap.chosen().forEach(seat => {
        const rowIndex = parseInt(seat.getAttribute('data-row-index'));
        const colIndex = parseInt(seat.getAttribute('data-col-index'));
        const labelTemplate = seat.getAttribute('data-label-template');
        const colName = seat.getAttribute('data-col-name');
    
        const label = labelTemplate
        .replace('{col}', colName)
        .replace('{row}', rowIndex + 1);
    
        result.chosen.push({
            row_index: rowIndex,
            col_index: colIndex,
            label_template: labelTemplate,
            label: label
        });
    })

    fetch('http://localhost:8080/api/seat-map/save-sudo', {
        method: 'POST',
        // headers: {
        // 'Content-Type': 'application/json'
        // },
        body: JSON.stringify(result)
    })
    .then(res => res.json())
    .then(data => {
        console.log('Save success', data);
        alert('Seat map saved!');
    })
    .catch(err => {
        console.error('Save failed', err);
        alert('Failed to save seat map.');
    });
  }

  listen() {
    document.body.addEventListener('click', (e) => {
        const clickedInsidePopup = this.elConfigPopup.contains(e.target);
        const clickedConfigButton = this.elConfigButton.contains(e.target);
        const clickSubmit = this.elSubmitSeats.contains(e.target);
      
        if (clickedConfigButton) {
          e.stopPropagation();
          this.elConfigPopup.classList.toggle('show');
          return;
        }
      
        // Only hide the popup if the click is outside both popup and button
        if (!clickedInsidePopup) {
          this.elConfigPopup.classList.remove('show');
        }
      
        if (clickSubmit) {
            e.preventDefault();
            this.submit()
            return          
        }
    });
  };
}

