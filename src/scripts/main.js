import { clownWebsite } from "./clownWebsite.js"
import { fetchClowns, fetchCompletions, fetchReservations } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchCompletions()
    .then(() => fetchClowns())
    .then(() => fetchReservations())
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