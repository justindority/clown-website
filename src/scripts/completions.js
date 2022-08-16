
export const writeCompletion = (reservation, applicationState) => {
    let foundCompletion = applicationState.completions.find(completion => {return completion.reservationId === reservation.id})
    let foundClown = applicationState.clowns.find(clown => {return foundCompletion.clownId === clown.id})
    return `<li class="completion">${reservation.childName} (${reservation.parentName}'s child), a ${reservation.partyLength} hour party for ${reservation.attendees} kids on ${reservation.partyDate} completed by ${foundClown.name}</li>`
}


