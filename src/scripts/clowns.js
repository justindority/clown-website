

export const clownCreator = (reservation, applicationState) => {
    let html = `<select class="clowns" id="clowns">
    <option value="">Choose</option>
    ${
        applicationState.clowns.map(
            clown => {
                return `<option value="${reservation.id}--${clown.id}">${clown.name}</option>`
            }
        ).join("")
    }
</select>`
return html
}



