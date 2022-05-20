//btn eliminar mascota 
const btnEliminarMascota = document.querySelector("#btnEliminarMascota");

btnEliminarMascota.addEventListener("click", async() => {

    console.log("me diste click")
    const id = btnEliminarMascota.dataset.id
    console.log("id", id)
    try {
        const data = await fetch(`/mascotas/${id}`, {
            method: "delete"
        })
        const res = await data.json()
        if (res.estado) {
            window.location.href = "/Mascotas"
        } else {
            console.log(res)
        }

    } catch (error) {
        console.log(error)
    }

});

// btn editar mascota
const formEditar = document.querySelector('#editar');

formEditar.addEventListener('submit', async(e) => {
    e.preventDefault()
        // Alternativa #1 (capturar input)
    const nombre = formEditar.elements['nombre'].value
        // Alternativa #2 (capturar input)
    const raza = document.querySelector('#razaInput').value
    const sexo = document.querySelector('#sexoInput').value
    const id = formEditar.dataset.id

    const data = await fetch(`/mascotas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ nombre, raza, sexo })
    })

    const res = await data.json()

    if (res.estado) {
        window.location.href = '/mascotas'
    } else {
        console.log(res)
    }

})