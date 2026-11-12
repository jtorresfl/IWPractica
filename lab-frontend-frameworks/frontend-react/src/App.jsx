import { NavLink, Routes, Route } from "react-router";

import Cursos from "./pages/Cursos";
import FormCurso from "./pages/FormCurso";

export default function App() {
    return (
        <>
            <nav className="navbar">
                <span className="brand">Gestión de Cursos (React)</span>
                <NavLink to="/" end>Cursos</NavLink>
                <NavLink to="/nuevo">Nuevo curso</NavLink>
            </nav>

            <main className="container">
                <Routes>
                    <Route path="/" element={<Cursos />} />
                    <Route path="/nuevo" element={<FormCurso />} />
                    <Route path="/editar/:id" element={<FormCurso />} />
                </Routes>
            </main>
        </>
    );
}
