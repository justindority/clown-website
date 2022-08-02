import { getApplicationState, sendReservation } from "./dataAccess.js"

export const reservationForm = () => {
    return `
        <div class="field">
            <label class="label" for="parentName">Parent Name</label>
            <input type="text" name="parentName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="childName">Child Name</label>
            <input type="text" name="childName" class="input" />
        </div>
        <div class="field">
            <label class="label" for="attendees">Number of Attendees</label>
            <input type="number" name="attendees" class="input" />
        </div>
        <div class="field">
            <label class="label" for="address">Address</label>
            <input type="text" name="address" class="input" />
        </div>
        <div class="field">
            <label class="label" for="date">Date</label>
            <input type="date" name="date" class="input" />
        </div>
        <div class="field">
            <label class="label" for="length">Length of Party (Hours)</label>
            <input type="number" name="length" class="input" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
`
}

//click event listener to submit a reservation
const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const parentName = document.querySelector("input[name='parentName']").value
        const childName = document.querySelector("input[name='childName']").value
        const attendees = document.querySelector("input[name='attendees']").value
        const address = document.querySelector("input[name='address']").value
        const partyDate = document.querySelector("input[name='date']").value
        const partyLength = document.querySelector("input[name='length']").value

        let applicationState = getApplicationState() 
        // Make an object out of the user input
        const dataToSendToAPI = {
            id: applicationState.reservations.length + 1,
            parentName: parentName,
            childName: childName,
            attendees: attendees,
            address: address,
            partyDate: partyDate,
            partyLength: partyLength
        }

        // Send the data to the API for permanent storage
        sendReservation(dataToSendToAPI)
    }
})