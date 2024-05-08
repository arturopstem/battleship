const FIELDS = ['start', 'end'];

class FormCoords extends HTMLFormElement {
  constructor() {
    super();
    this.setAttribute('is', 'form-coords');
    this.classList.add('form-coords');
    this.autocomplete = 'off';
    this.autocapitalize = 'characters';
  }

  connectedCallback() {
    const inputFields = FIELDS.map((field) => {
      const label = document.createElement('label');
      label.innerText = `${field.at().toUpperCase()}${field.slice(1)}:`;

      const input = document.createElement('input');
      input.name = field;
      input.type = 'text';
      input.pattern = '^[a-jA-J](10|[1-9])$';
      input.required = true;
      input.minLength = 2;
      input.maxLength = 3;
      input.size = 3;

      input.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase();
      });

      const div = document.createElement('div');
      div.appendChild(label);
      div.appendChild(input);

      return div;
    });

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Place Ship';

    this.append(...inputFields, button);
  }
}

export default FormCoords;
