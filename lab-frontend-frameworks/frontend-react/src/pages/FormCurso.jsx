import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router";

import api from "../services/api";

export default function FormCurso() {
    const navigate = useNavigate();
    const { id } = useParams();
    const esEdicion = Boolean(id);

    const [nombre, setNombre] = useState("");
    const [creditos, setCreditos] = useState(4);
    const [errores, setErrores] = useState([]);
    const [errorApi, setErrorApi] = useState("");

    useEffect(() => {
        if (!esEdicion) return;
        api.get(`/cursos/${id}`)
            .then(({ data }) => {
                setNombre(data.nombre);
                setCreditos(data.creditos);
            })
            .catch(() => setErrorApi("No se pudo cargar el curso."));
    }, [id, esEdicion]);

    function validar() {
        const lista = [];
        if (!nombre.trim()) lista.push("El nombre es obligatorio.");
        else if (nombre.trim().length < 3) lista.push("El nombre debe tener al menos 3 caracteres.");
        if (!(Number(creditos) > 0)) lista.push("Los créditos deben ser mayores que cero.");
        setErrores(lista);
        return lista.length === 0;
    }

    async function guardar(e) {
        e.preventDefault();
        setErrorApi("");
        if (!validar()) return;

        const curso = { nombre: nombre.trim(), creditos: Number(creditos) };
        try {
            if (esEdicion) await api.put(`/cursos/${id}`, curso);
            else await api.post("/cursos", curso);
            navigate("/");
        } catch (err) {
            setErrorApi(err.response?.data?.mensaje || "No se pudo conectar con la API.");
        }
    }

    return (
        <>
            <h1>{esEdicion ? "Editar curso" : "Nuevo curso"}</h1>

            {errorApi && <div className="alert alert-error">{errorApi}</div>}
            {errores.length > 0 && (
                <div className="alert alert-error">
                    {errores.map(msg => <div key={msg}>{msg}</div>)}
                </div>
            )}

            <form className="card" onSubmit={guardar} noValidate>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="creditos">Créditos</label>
                    <input
                        id="creditos"
                        type="number"
                        min="1"
                        value={creditos}
                        onChange={e => setCreditos(e.target.value)}
                    />
                </div>

                <div className="acciones">
                    <button type="submit" className="btn">
                        {esEdicion ? "Actualizar" : "Registrar"}
                    </button>
                    <Link to="/" className="btn btn-secondary">Cancelar</Link>
                </div>
            </form>
        </>
    );
}
