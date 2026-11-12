<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const cursos = ref([]);
const error = ref("");
const cargando = ref(true);

async function listarCursos() {
    try {
        error.value = "";
        const response = await api.get("/cursos");
        cursos.value = response.data;
    } catch {
        error.value = "No se pudo conectar con la API. ¿Está el backend en http://localhost:3000?";
    } finally {
        cargando.value = false;
    }
}

async function eliminarCurso(curso) {
    if (!confirm(`¿Eliminar el curso "${curso.nombre}"?`)) return;
    try {
        await api.delete(`/cursos/${curso.id}`);
        await listarCursos();
    } catch {
        error.value = "No se pudo eliminar el curso.";
    }
}

onMounted(listarCursos);
</script>

<template>
    <div class="toolbar">
        <h1>Cursos</h1>
        <RouterLink to="/nuevo" class="btn">+ Nuevo curso</RouterLink>
    </div>

    <div v-if="error" class="alert alert-error">{{ error }}</div>

    <div class="card">
        <p v-if="cargando" class="muted">Cargando...</p>
        <p v-else-if="!cursos.length && !error" class="muted">No hay cursos registrados.</p>

        <div v-else-if="cursos.length" class="table-wrap">
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
                    <tr v-for="curso in cursos" :key="curso.id">
                        <td>{{ curso.id }}</td>
                        <td>{{ curso.nombre }}</td>
                        <td>{{ curso.creditos }}</td>
                        <td class="acciones">
                            <RouterLink :to="`/editar/${curso.id}`" class="btn btn-warning">Editar</RouterLink>
                            <button class="btn btn-danger" @click="eliminarCurso(curso)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
