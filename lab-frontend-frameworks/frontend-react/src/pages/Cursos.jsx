import { useEffect, useState } from "react";
import { Link } from "react-router";

import api from "../services/api";

export default function Cursos() {
    const [cursos, setCursos] = useState([]);
    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(true);

    async function listar() {
        try {
            setError("");
            const response = await api.get("/cursos");
            setCursos(response.data);
        } catch {
            setError("No se pudo conectar con la API. ¿Está el backend en http://localhost:3000?");
        } finally {
            setCargando(false);
        }
    }

    async function eliminar(curso) {
        if (!confirm(`¿Eliminar el curso "${curso.nombre}"?`)) return;
        try {
            await api.delete(`/cursos/${curso.id}`);
            listar();
        } catch {
            setError("No se pudo eliminar el curso.");
        }
    }

    useEffect(() => {
        listar();
    }, []);

    return (
        <>
            <div className="toolbar">
                <h1>Cursos</h1>
                <Link to="/nuevo" className="btn">+ Nuevo curso</Link>
            </div>

            {error && <div className="alert alert-error">{error}</div>}

            <div className="card">
                {cargando && <p className="muted">Cargando...</p>}
                {!cargando && cursos.length === 0 && !error && (
                    <p className="muted">No hay cursos registrados.</p>
                )}

                {cursos.length > 0 && (
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Créditos</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cursos.map(curso => (
                                    <tr key={curso.id}>
                                        <td>{curso.id}</td>
                                        <td>{curso.nombre}</td>
                                        <td>{curso.creditos}</td>
                                        <td className="acciones">
                                            <Link to={`/editar/${curso.id}`} className="btn btn-warning">
                                                Editar
                                            </Link>
                                            <button className="btn btn-danger" onClick={() => eliminar(curso)}>
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
}
