var limit = 10
var allTodos = []
var currentIndex = 0
var maxButtonPage = 15

const users = new Promise((res, rej) => {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(json => res(json))
        .catch(err => rej(err))
})

const albums = new Promise((res, rej) => {
    return fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => res(json))
        .catch(err => rej(err))
})

const photos = new Promise((res, rej) => {
    return fetch('https://jsonplaceholder.typicode.com/photos')
        .then(response => response.json())
        .then(json => res(json))
        .catch(err => rej(err))
})

return Promise.all([users, albums, photos]).then((datas) => {
    const result = equiJoin(postData, commentData,"id", "postId", joinMap);
    console.log(result);
  })
  .catch(err => console.error(err));


const renderTable = () => {
    // const currentList = json.slice(0, 10)  // page 1   // 10 & 1 = ((10 * 1) - 10), ((1 - 1) * 10), 
    // const currentList = json.slice(10, 20) // page 2   // 10 & 2 = ((10 * 2) - 10), ((2 - 1) * 10), 
    // const currentList = json.slice(20, 30) // page 3   // 10 & 3 = ((10 * 3) - 10), ((3 - 1) * 10),
    // const currentList = json.slice(30, 40) // page 4   // 10 & 4 = ((10 * 4) - 10), ((4 - 1) * 10),

    // console.log("allTodos", allTodos);
    // console.log("currentIndex", currentIndex);
    // console.log("current", currentIndex);
    const todos = allTodos.slice(currentIndex * limit, (currentIndex + 1) * limit)
    const table = document.querySelector("tbody")

    // console.log("todos", todos);

    tr = ""
    todos.forEach((todo, idx) => {
        tr += `
            <tr>
                <td class="cell-albumId">${todo.albumId}</td>
                <td class="cell-id">${todo.id}</td>
                <td class="cell-title">${todo.title}</td>
                <td class="cell-url">${todo.url}</td>
                <td class="cell-thumbnailUrl">${todo.thumbnailUrl}</td>
            </tr>
        `
    });

    table.innerHTML = tr;
    renderPageButton()
}

const renderPageButton = () => {
    const pagination = document.querySelector(".pagination")
    let pageStart = 1
    let pageEnd = maxButtonPage
    const pageTotal = allTodos.length / limit
    const space = Math.floor(maxButtonPage / 2)

    if (currentIndex - space > 0) {
        if (currentIndex + space >= pageTotal) {
            pageStart = pageTotal - maxButtonPage + 1
            pageEnd = pageTotal
        } else {
            pageStart = (currentIndex - space) + 1
            pageEnd = (currentIndex + space) + 1
        }
    }


    let button = `<span class="prev">Prev</span>`
    for (let index = pageStart; index <= pageEnd; index++) {
        // let classSelected = ""
        // if (index == currentIndex + 1) classSelected = "active"

        button += `<span class="number ${index == currentIndex + 1 ? "active" : ""}" data-pagination=${index}>${index}</span>`
    }
    button += `<span class="next">Next</span>`

    pagination.innerHTML = button
}

const nextPage = () => {
    // console.log("next");

    if ((allTodos.length / limit) > currentIndex + 1) {
        currentIndex += 1
        renderTable()
    }
}

const prevPage = () => {
    // console.log("prev");

    if (currentIndex > 0) {
        currentIndex -= 1
        renderTable()
    }
}

const selectPage = self => {
    const selectedIndex = parseInt(self.getAttribute("data-pagination")) - 1
    // console.log("self", selectedIndex);
    currentIndex = selectedIndex
    renderTable()
}

document.addEventListener("click", function (el) {
    if (el.target.classList.contains("next")) {
        nextPage()
    } else if (el.target.classList.contains("prev")) {
        prevPage()
    } else if (el.target.classList.contains("number")) {
        selectPage(el.target)
    }
    // prev
    // first
    // last
    // number
})

const __init = async () => {
    await getData()
    renderTable()
    renderPageButton()
}
__init()

/**
 * 1 = 0 - 9
 * 2 = 10 - 19
 * dst
 */

/*
    Tugas:
        - Buatlah table list photo memiliki kolom nama album & nama user
            Kolom terdiri dari:
                - no
                - nama user
                - nama album
                - judul
                - thumbnail
*/