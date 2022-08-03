import { reservationForm } from "./reservationForm.js"
import { reservationsHtml } from "./reservations.js"


export const clownWebsite = () => {
    return `
    <h1>Reserve yourself a clown :)</h1>
    <section class="reservationForm">${reservationForm()}
    </section>

    <section class="reservations">
        <h2>Current Reservations</h2>
        ${reservationsHtml()}
    </section>
    `
}