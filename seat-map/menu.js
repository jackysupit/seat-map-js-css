// use here options shared across all elements
var tinyPopupMenu = new TinyPopupMenu({
    autoclose: true,
    menuItems: [
        {
            content: 'Click to display alert 😎',
            callback: () => alert('Alert')
        },
        {
            content: 'Click to display another alert',
            callback: () => alert('Another alert')
        },
        '-',
        {
            content: 'Submenu',
            items: [
                {
                    content: 'Submenu item',
                    callback: () => alert('Submenu item')
                },
                {
                    content: 'Submenu item 2',
                    callback: () => alert('Submenu item 2')
                }
            ]
        },
        '-',
        {
            content: 'Delete',
            callback: () => alert('Delete!'),
            className: 'delete'
        },          
    ]
});

document.body.addEventListener('click', (event) => {
    if (event.target.classList.contains('seat')) {
      const row = event.target.getAttribute('data-row');
      const col = event.target.getAttribute('data-col');

      tinyPopupMenu.open({
        event: event,  // Position based on the click event
        position: 'bottom', // Position menu below the clicked element
        left: event.clientX + 'px', // Position from the left of the viewport
        top: event.clientY + 'px', // Position from the top of the viewport
      });

      console.log(`Row: ${row}, Column: ${col}`);
    }
  });
  