//-------------------seccion alimentos-------------------//
//btn eliminar alimento

const btnEliminarA = document.querySelector("#btnEliminarA");

btnEliminarA.addEventListener("click", async() => {

    console.log("me diste click")
    const id = btnEliminarA.dataset.id
    console.log("id", id)
    try {
        const data = await fetch(`/alimentos/${id}`, {
            method: "delete"
        })
        const res = await data.json()
        if (res.estado) {
            window.location.href = "/alimentos"
        } else {
            console.log(res)
        }

    } catch (error) {
        console.log(error)
    }

});


// btn editar alimento
const editarAlimento = document.querySelector('#editarAlimento');

editarAlimento.addEventListener('submit', async(e) => {
    e.preventDefault()
        // Alternativa #1 (capturar input)
    const nombre = editarAlimento.elements['nombre'].value
        // Alternativa #2 (capturar input)
    const marca = document.querySelector('#marcaInput').value
    const edad = document.querySelector('#edadInput').value
    const id = editarAlimento.dataset.id

    const data = await fetch(`/alimentos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ nombre, marca, edad })
    })

    const res = await data.json()

    if (res.estado) {
        window.location.href = '/alimentos'
    } else {
        console.log(res)
    }

})