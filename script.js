let list = [];

const generateList = () => {
    const container = document.getElementById("list-container");

    list.forEach((item) => {
        const child = `
            <div class="card" id="quote-${item.id}">
                <h2>${item.quote}</h2>
                <p>${item.author}</p>
            </div>
        `;

        container.innerHTML += child;        
    });

    return;
};

const getData = () => {
    fetch("https://dummyjson.com/quotes").then((res) => res.json())
    .then((data) => {
        list = data.quotes;
        console.log(data)
        generateList();
    })
    .catch((err) => {
        console.log(err.message);
    });
};

getData();