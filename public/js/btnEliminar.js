const btnEliminar = document.querySelector(".btn-danger");

btnEliminar.addEventListener("click", async() => {

    console.log("me diste click")
    const id = btnEliminar.dataset.id
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