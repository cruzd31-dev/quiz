let preguntas = [];
let indice = 0;
let puntaje = 0;

function generarPreguntas() {
    let usadas = new Set();

    while (preguntas.length < 20) {
        let tipo = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];

        let a, b, resultado, texto;

        if (tipo === "+") {
            a = rand(1, 50);
            b = rand(1, 50);
            resultado = a + b;
        }

        if (tipo === "-") {
            a = rand(20, 100);
            b = rand(1, a);
            resultado = a - b;
        }

        if (tipo === "*") {
            a = rand(1, 12);
            b = rand(1, 12);
            resultado = a * b;
        }

        if (tipo === "/") {
            b = rand(1, 10);
            resultado = rand(1, 10);
            a = b * resultado;
        }

        texto = `${a} ${tipo} ${b}`;

        if (usadas.has(texto)) continue;
        usadas.add(texto);

        let opciones = [
            resultado,
            resultado + rand(1, 5),
            resultado - rand(1, 5)
        ].sort(() => Math.random() - 0.5);

        preguntas.push({
            texto,
            opciones,
            correcta: resultado
        });
    }
}

function iniciar() {
    preguntas = [];
    indice = 0;
    puntaje = 0;

    generarPreguntas();

    document.getElementById("inicio").style.display = "none";
    document.getElementById("quiz").style.display = "block";

    mostrarPregunta();
}

function mostrarPregunta() {
    let p = preguntas[indice];

    document.getElementById("pregunta").innerText = p.texto;

    let contenedor = document.getElementById("opciones");
    contenedor.innerHTML = "";

    p.opciones.forEach(op => {
        let btn = document.createElement("button");
        btn.innerText = op;
        btn.onclick = () => verificar(op);
        contenedor.appendChild(btn);
    });
}

function verificar(opcion) {
    if (opcion == preguntas[indice].correcta) {
        puntaje++;
    } else {
        alert("❌ Incorrecto");
    }

    indice++;

    if (indice < preguntas.length) {
        mostrarPregunta();
    } else {
        finalizar();
    }
}

function finalizar() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultado").style.display = "block";

    let porcentaje = (puntaje / preguntas.length) * 100;
    let estado = porcentaje >= 90 ? "✅ APROBADO" : "❌ REPROBADO";

    document.getElementById("final").innerText =
        `Puntaje: ${porcentaje.toFixed(1)}% - ${estado}`;
}

function reiniciar() {
    location.reload();
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}