const selectMenu = document.querySelector("#titles")
const options = document.querySelector("option")
const displayInfo = document.querySelector("#display-info")
const reviewBtn = document.querySelector("#review-submit")
const revList = document.querySelector("#review-list")
const form = document.querySelector("form")
const revInput = document.getElementById("review")
const resetBtn = document.querySelector("#reset-reviews")
const people = document.getElementById("people")
const peopleBtn = document.getElementById("show-people")


// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
fetch("https://resource-ghibli-api.onrender.com/films/")
.then((response) => response.json())
.then((data) => {
const movies = data
    selectedMovie(data)


selectMenu.addEventListener("change", (event) =>{
    let findMov = movies.find(movie => movie.id === selectMenu.value)
        displayInfo.innerHTML= ` <h3>${findMov.title}</h3>
        <p>${findMov.release_date}</p>
        <p>${findMov.description}</p>`
})

reviewBtn.addEventListener ("click", (event) => {
    event.preventDefault()
    let review = revInput.value
        for (const movie of movies) {
            if(movie.id === selectMenu.value){
                let newReview = document.createElement("li")
                newReview.innerHTML = `<strong>${movie.title}: </strong>${review}`
                revList.append(newReview)
            }
        }
        if(selectMenu.value === ""){
            window.alert("Please select a movie first")
        }
    form.reset()
}) 

resetBtn.addEventListener("click", event => {
    event.preventDefault()
    revList.innerHTML = ""
})

})
.catch(error => console.log(error))

let selectedMovie = movies => {
    movies.forEach(movie => {
        let whateverOption = document.createElement("option")
        whateverOption.value = movie.id
        whateverOption.textContent = movie.title
        selectMenu.append(whateverOption)
    })
}
}

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);