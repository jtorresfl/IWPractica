const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let cursos = [
    { id: 1, nombre: "Ingeniería Web", creditos: 4 },
    { id: 2, nombre: "Programación I", creditos: 5 },
    { id: 3, nombre: "Base de Datos", creditos: 4 }
];

let siguienteId = 4;

// Validación compartida por POST y PUT
function validar({ nombre, creditos } = {}) {
    if (!nombre || String(nombre).trim().length < 3) {
        return "El nombre es obligatorio (mínimo 3 caracteres)";
    }
    if (creditos == null || creditos === "" || isNaN(Number(creditos)) || Number(creditos) <= 0) {
        return "Los créditos deben ser mayores que cero";
    }
    return null;
}

// Listar cursos
app.get("/api/cursos", (req, res) => {
    res.json(cursos);
});

// Obtener curso
app.get("/api/cursos/:id", (req, res) => {
    const curso = cursos.find(c => c.id === Number(req.params.id));
    if (!curso) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
    res.json(curso);
});

// Registrar curso
app.post("/api/cursos", (req, res) => {
    const error = validar(req.body);
    if (error) {
        return res.status(400).json({ mensaje: error });
    }

    const curso = {
        id: siguienteId++,
        nombre: req.body.nombre.trim(),
        creditos: Number(req.body.creditos)
    };
    cursos.push(curso);
    res.status(201).json(curso);
});

// Actualizar curso
app.put("/api/cursos/:id", (req, res) => {
    const id = Number(req.params.id);
    const curso = cursos.find(c => c.id === id);

    if (!curso) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    const error = validar(req.body);
    if (error) {
        return res.status(400).json({ mensaje: error });
    }

    curso.nombre = req.body.nombre.trim();
    curso.creditos = Number(req.body.creditos);
    res.json(curso);
});

// Eliminar curso
app.delete("/api/cursos/:id", (req, res) => {
    const id = Number(req.params.id);

    if (!cursos.some(c => c.id === id)) {
        return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    cursos = cursos.filter(c => c.id !== id);
    res.json({ mensaje: "Curso eliminado" });
});

app.listen(3000, () => {
    console.log("API disponible en http://localhost:3000");
});
