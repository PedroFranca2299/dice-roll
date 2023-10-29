class Select {
    constructor(selectElement) {
      this.element = selectElement;
      this.changed = false;
      this.addChangeEvent();
    }
  
    addChangeEvent() {
      this.element.addEventListener('change', () => {
        if (!this.changed) {
          changedSelects++;
        }
        this.changed = true;
        console.log(`Select "${this.element.querySelector('option[selected]').textContent}" changed.`);
        checkRollButton();
      });
    }
  }
  
  // Initialize the replicated select count
  let replicatedSelectCount = 1;
  let changedSelects = 0;
  let rollButtonAdded = false;
  let lastClickedIndex = -1;
  
  // Create instances of Select for each .form-select
  const selectContainer = document.querySelector('.btn-group.p-2');
  const selectElements = [...selectContainer.querySelectorAll('.form-select')];
  const selects = selectElements.map((selectElement) => new Select(selectElement));
  
  // Function to replicate the .form-select
  function replicateFormSelect(numberOfDices) {
    const container = document.querySelector('.btn-group.p-2');
    const setTitle = container.previousElementSibling.querySelector('.set-title');
    const formSelect = container.querySelector('select');
  
    const selectsToAdd = numberOfDices - replicatedSelectCount;
  
    if (selectsToAdd > 0) {
      for (let i = 0; i < selectsToAdd; i++) {
        const clone = formSelect.cloneNode(true);
        clone.querySelector('option[selected]').textContent = `Dice #${replicatedSelectCount + i + 1}`;
        container.appendChild(clone);
        const newSelect = new Select(clone);
        selects.push(newSelect);
      }
    } else if (selectsToAdd < 0) {
      for (let i = 0; i < -selectsToAdd; i++) {
        container.removeChild(container.lastElementChild);
      }
    }
  
    replicatedSelectCount = numberOfDices;
  }
  
  // Function to add the "Roll!" button
  // Function to add the "Roll!" button
// Function to add the "Roll!" button
// Function to add the "Roll!" button
function checkRollButton() {
    const container = document.querySelector('.btn-group.p-2');
    const formSelects = selects.map((select) => select.element);
  
    if (changedSelects === formSelects.length && !rollButtonAdded) {
      const rollButton = document.createElement('button');
      rollButton.textContent = 'Roll!';
      rollButton.className = 'btn btn-primary';
  
      if (formSelects.length > 1) {
        container.parentElement.appendChild(rollButton);
      }
  
      rollButtonAdded = true;
    } else if (rollButtonAdded && changedSelects !== formSelects.length) {
      const parentContainer = container.parentElement;
      const rollButton = parentContainer.querySelector('button.btn-primary');
      if (rollButton) {
        parentContainer.removeChild(rollButton);
        rollButtonAdded = false;
      }
    }
  }
  
  
  
  
  // Your existing code to highlight buttons
  function highlightButtons() {
    const buttons = document.querySelectorAll('.btn');
  
    buttons.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        lastClickedIndex = index;
        for (let i = 0; i <= index; i++) {
          buttons[i].style.transition = 'background-color 0.3s ease-in-out';
          buttons[i].style.backgroundColor = 'rgb(0, 255, 0)';
        }
        for (let i = index + 1; i < buttons.length; i++) {
          buttons[i].style.backgroundColor = '';
        }
        replicateFormSelect(index + 1);
      });
    });
  }
  
  // Call the function to execute the code
  highlightButtons();
  