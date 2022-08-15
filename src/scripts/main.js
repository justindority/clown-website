import { clownWebsite } from "./clownWebsite.js"
import { fetchClowns, fetchCompletions, fetchReservations } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchReservations()
    .then(() => fetchClowns())
    .then(() => fetchCompletions())
    .then(
        () => {
            mainContainer.innerHTML = clownWebsite()
        }
    )
}

//custom event to re-render html on state change
mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

render()