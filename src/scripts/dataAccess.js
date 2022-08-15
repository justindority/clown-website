const API = "http://localhost:8088"

//establish application state
const applicationState = {
    reservations: [],
    clowns: [],
    completions: []
}

const mainContainer = document.querySelector("#container")

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


//create api call to grab clowns
export const fetchClowns = () => {
    return fetch(`${API}/clowns`)
    .then(response => response.json())
    .then(
        (clouns) => {
            // Store the external state in application state
            applicationState.clowns = clouns
        }
    )
}

//create api call to grab completions
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
    .then(response => response.json())
    .then(
        (comp) => {
            // Store the external state in application state
            applicationState.completions = comp
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
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//DELETE records
export const deleteRequest = (id) => {
    return fetch(`${API}/reservations/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//used to save completions to the json database
export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }


    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}
