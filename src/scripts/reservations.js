import { getApplicationState, deleteRequest, saveCompletion } from "./dataAccess.js"
import { clownCreator } from "./clowns.js"
import { writeCompletion } from "./completions.js"

//generates html for requests
export const reservationsHtml = () => {
   let applicationState = getApplicationState()
   let newReservations = applicationState.reservations.sort((a,b) => {
        return a.completed - b.completed
    })
   
    applicationState.reservations = newReservations

    let html =  `
        <ul>
            ${
                applicationState.reservations.map(reservation => {
                    if(reservation.completed===true){
                        return writeCompletion(reservation,applicationState)
                    } else {
                        return `<li class="reservation">${reservation.childName} (${reservation.parentName}'s child), a ${reservation.partyLength} hour party for ${reservation.attendees} kids on ${reservation.partyDate}
                        ${clownCreator(reservation, applicationState)}
                        <button id="reservationDel--${reservation.id}">Delete</button></li>`
                    }
                    
                }).join("")
            }

        </ul>
    `
    return html
}


const mainContainer = document.querySelector("#container")

//click event for deleting requests
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("reservationDel--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

//click event for completing a reservation
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "clowns"){
            const [reservationId, clownId] = event.target.value.split("--")
            const applicationState = getApplicationState()

            let completionObject = {
                id: applicationState.completions.length + 1,
                reservationId: parseInt(reservationId),
                clownId: parseInt(clownId),
                date_created: Date.now
            }
            saveCompletion(completionObject)
        }
    }
)