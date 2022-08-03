const API = "http://localhost:8088"

//establish application state
const applicationState = {
    reservations: [],
    clowns: [],
    completions: []
}

//function to pull application state into other modules
export const getApplicationState = () => {
    fetchReservations()
        return {...applicationState}
        }

//create api call to grab reservations
export const fetchReservations = () => {
    return fetch(`${API}/reservations`)
    .then(response => response.json())
    .then(
        (reservations) => {
            // Store the external state in application state
            applicationState.reservations = reservations
        }
    )
}


//create post api call that will add reservations
export const sendReservation = (reservation) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    }


    return fetch(`${API}/reservations`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            // mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//DELETE records
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}
