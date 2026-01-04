class State {
    constructor() {
        this.vdom = null;
    }

    generateDom() {
        const body = [...document.getElementsByTagName("body")];
        let stack = [];
        let store = {};

        stack.push(body[0]);

        while(stack.length > 0) {
            const node = stack.pop();

            if (node.nodeType === Node.ELEMENT_NODE) {
                if (node.childNodes.length) {
                    [...node.childNodes].forEach((child) => stack.push(child));
                }
                store[node.id] = {
                    id: node.id,
                    type: node.tagName,
                    parent: node.parentNode.id,
                };
            } 
        }

        this.vdom = store;
    }
}

const state = new State();

let list = [];


const handleDelete = (itemID) => {
    list = list.filter(({ id }) => itemID !== id);
    generateList();
};

const generateList = () => {
    const container = document.getElementById("list-container");
    let data = "";

    list.forEach((item) => {
        const child = `\n
            <div class="card" id="quote-${item.id}">
                <section class="text">
                    <h2>${item.quote}</h2>
                    <p>${item.author}</p>
                </section>
                <section class="btns">
                    <button class="delete-button" id="delete-${item.id}">Delete</button>
                </section>
            </div>
        `;

        data += child;

    });

    container.innerHTML = data;

    generateEventListeners();
    state.generateDom();

    console.log(state.vdom)

    return;
};

const generateEventListeners = () => {
    list.forEach(({ id }) => {
        document.getElementById("delete-" + id).addEventListener("click", () => handleDelete(id));
    });
};

const getData = () => {
    fetch("https://dummyjson.com/quotes").then((res) => res.json())
    .then((data) => {
        list = data.quotes;
        generateList();
    })
    .catch((err) => {
        console.log(err.message);
    });
};

getData();