import { getApplicationState, deleteRequest, saveCompletion } from "./dataAccess.js"
import { clownCreator } from "./clowns.js"

//generates html for requests
export const reservationsHtml = () => {
   let applicationState = getApplicationState()

    let html =  `
        <ul>
            ${
                applicationState.reservations.map(reservation => {
                    return `<li class="reservation">${reservation.childName} (${reservation.parentName}'s child), a ${reservation.partyLength} hour party for ${reservation.attendees} kids on ${reservation.partyDate}
                    ${clownCreator(reservation, applicationState)}
                    <button id="reservationDel--${reservation.id}">Delete</button></li>`
                }).join("")
            }

        </ul>
    `

    return html
}

// export const requestsHtml = () => {
//     let applicationState = getApplicationState()

//     let html =  `
//         <ul>
//             ${
//                 applicationState.reservations.map(reservation => {
//                     return `<li class="${shouldIHide(request)}">${request.description}
//                     <select class="plumbers" id="plumbers">
//                     <option value="">Choose</option>
//                     ${plumbersMap(request)}
//                     </select>
//                     <button id="request--${request.id}">Delete</button></li>`
//                 }).join("")
//             }
//             ${
//                 completions.map(completion => {

//                     return `<li class="completion">${findDescription(completion)} (Completed by ${findPlumber(completion)})</li>`
//                 }).join("")
//             }
//         </ul>
//     `

//     return html
// }


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
                reservationId: reservationId,
                clownId: clownId,
                date_created: Date.now
            }
            saveCompletion(completionObject)
        }
    }
)