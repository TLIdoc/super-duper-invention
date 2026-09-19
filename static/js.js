let modal = document.querySelector(".modal")
modal.style.display = "none"

document.querySelector(".open").addEventListener("click", () => modal.style.display = "block")
document.querySelector(".close").addEventListener("click", () => modal.style.display = "none")

document.querySelector(".modal form").addEventListener("submit", (e) => {
    e.preventDefault()
    let data = {
        title: event.target["title"].value,
        description: event.target["description"].value,
    }
    fetch("add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(location.reload())
})
// let wrapper = document.querySelector(".wrapper")
// fetch("/posts").then(res => res.json()).then(data => {
//     data.forEach(post => {
//         wrapper.innerHTML += `
//         <div class="post">
//             <h2>${post.title}</h2>
//             <p>${post.description}</p>
//         </div>
//         `
//     })
// })