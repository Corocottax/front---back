const drawLibros = (libros) => {
  console.log(libros);
  console.log("hola");

  const libreria$$ = document.querySelector("#libreria");

  for (const libro of libros) {
    const libro$$ = document.createElement("div");
    const titulo$$ = document.createElement("h3");
    const divCaratula$$ = document.createElement("div");
    const caratula$$ = document.createElement("img");
    const precio$$ = document.createElement("p");

    libro$$.classList.add("libro");
    libro$$.classList.add(libro.categoria);
    divCaratula$$.classList.add("caratula");

    titulo$$.textContent = libro.titulo;
    caratula$$.src = libro.caratula;
    precio$$.textContent = libro.precio;

    libro$$.appendChild(titulo$$);
    libro$$.appendChild(divCaratula$$);
    divCaratula$$.appendChild(caratula$$);
    libro$$.appendChild(precio$$);
    libreria$$.appendChild(libro$$);
  }
};

const getAllLibros = async () => {

    const options = {
        headers: {
            'Authorization': localStorage.getItem("token")
        },
    }

    const data = await fetch("https://back-pt-live.vercel.app/libros", options);
    const libros = await data.json();

    if (typeof libros !== "string") {
        drawLibros(libros);
    }
   
};


const formRegister = document.querySelector("#formRegister");

const registrarUsuario = async (e) => {

    e.preventDefault();

    const email$$ = document.querySelector("#emailRegister");
    const password$$ = document.querySelector("#passwordRegister");

    const objectToSend = {
        email: email$$.value,
        password: password$$.value
    }

    const options = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objectToSend)

    }

    /* await fetch("https://back-pt-live.vercel.app/users", options); */

    login(options);

}

const login = async (options) => {

    const res = await fetch("https://back-pt-live.vercel.app/users/login", options);
    const respuesta = await res.json();
    localStorage.setItem("token", respuesta.token);
    console.log(respuesta.rol);
    if (respuesta.rol === "admin") {
        createForm();
    }
    getAllLibros();

}

formRegister.addEventListener("submit", registrarUsuario);

if(localStorage.getItem("token")) {

    getAllLibros();

}

const logoutButton = document.querySelector("#logout");

const logout = () => {

    localStorage.removeItem("token");
    location.reload();

}

logoutButton.addEventListener("click", logout);