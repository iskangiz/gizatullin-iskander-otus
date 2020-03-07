class MyTree extends HTMLElement {
    constructor(json) {
        super();
        try {
            this.jsonObject = JSON.parse(json);
        } catch (e) {
        }
    }

    connectedCallback() {
        if (this.jsonObject !== undefined) {
            const shadow = this.attachShadow({mode: 'open'});
            shadow.appendChild(new MyLeaf(this.jsonObject));
        }
    }
}

class MyLeaf extends HTMLElement {
    constructor(jsonObject) {
        super();
        this.jsonObject = jsonObject;
    }

    connectedCallback() {
        if (this.jsonObject !== undefined) {
            const shadow = this.attachShadow({mode: 'open'});

            shadow.innerHTML =
                `<style>
                      span {
                          cursor:pointer;
                  }
                  </style>`;

            let span = document.createElement('span');
            span.innerHTML = this.jsonObject.id;

            span.addEventListener('click', (e) => {
                let ul = this.shadowRoot.querySelector('ul');

                if (ul !== null) {
                    ul.hidden = (!ul.hidden);
                }
            });
            shadow.appendChild(span);

            if (this.jsonObject.items !== undefined) {
                let ul = document.createElement('ul');

                for (let i = 0; i < this.jsonObject.items.length; i++) {
                    let li = document.createElement('li');
                    li.appendChild(new MyLeaf(this.jsonObject.items[i]));
                    ul.appendChild(li);
                }

                shadow.appendChild(ul);
            }
        }
    }
}

customElements.define("my-tree", MyTree);
customElements.define("my-leaf", MyLeaf);