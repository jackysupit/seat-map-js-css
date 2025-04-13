class MyMapConfig {
  static _is_listening = false;

  constructor({
    myMap,
    configButton = 'config-button',
    configPopup = 'config-popup',
    configSubmit = 'submit-config',
  }) {
    this.myMap = myMap
    this.configButton = configButton
    this.configPopup = configPopup
    this.configSubmit = configSubmit

    this.elConfigButton = document.getElementById(configButton);
    this.elConfigPopup = document.getElementById(configPopup);
    this.elConfigSubmit = document.getElementById(configSubmit);

    if(!MyMapConfig._is_listening) {
      this.listen()
    }
  }

  listen() {
    document.body.addEventListener("contextmenu", (e)=>this.eventContextMenu(e));
    document.body.addEventListener('click', (e) => {
        const clickedInsidePopup = this.elConfigPopup.contains(e.target);
        const clickedConfigButton = this.elConfigButton.contains(e.target);
      
        if (clickedConfigButton) {
          e.stopPropagation();
          this.elConfigPopup.classList.toggle('show');
          return;
        }
      
        // Only hide the popup if the click is outside both popup and button
        if (!clickedInsidePopup) {
          this.elConfigPopup.classList.remove('show');
        }
      
        const isConfigSubmit = e.target.classList.contains(this.configSubmit);
        if (isConfigSubmit) {
          e.preventDefault();
      
          const name = this.elConfigPopup.querySelector('#config-name').value;
          const labelTemplate = this.elConfigPopup.querySelector('#config-label-template').value;
          const rowCount = parseInt(this.elConfigPopup.querySelector('#config-row-count').value) || 20;
          const colCount = parseInt(this.elConfigPopup.querySelector('#config-col-count').value) || 30;
      
          console.log({ name, labelTemplate, rowCount, colCount });
      
          this.myMap.reDraw({
            rowCount: rowCount,
            colCount: colCount,
            labelTemplate: labelTemplate || '{col}{row}',
          });
      
          this.elConfigPopup.classList.remove('show');
        }
      });
      

  };
}

