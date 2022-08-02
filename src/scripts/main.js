import { clownWebsite } from "./clownWebsite.js"
import { fetchReservations } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
    mainContainer.innerHTML = clownWebsite()
}

render()