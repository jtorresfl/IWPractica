<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "../services/api";

const route = useRoute();
const router = useRouter();

const id = route.params.id;
const esEdicion = computed(() => !!id);

const nombre = ref("");
const creditos = ref(4);
const errores = ref([]);
const errorApi = ref("");

onMounted(async () => {
    if (!esEdicion.value) return;
    try {
        const { data } = await api.get(`/cursos/${id}`);
        nombre.value = data.nombre;
        creditos.value = data.creditos;
    } catch {
        errorApi.value = "No se pudo cargar el curso.";
    }
});

function validar() {
    const lista = [];
    if (!nombre.value.trim()) lista.push("El nombre es obligatorio.");
    else if (nombre.value.trim().length < 3) lista.push("El nombre debe tener al menos 3 caracteres.");
    if (!(Number(creditos.value) > 0)) lista.push("Los créditos deben ser mayores que cero.");
    errores.value = lista;
    return lista.length === 0;
}

async function guardar() {
    errorApi.value = "";
    if (!validar()) return;

    const curso = { nombre: nombre.value.trim(), creditos: Number(creditos.value) };
    try {
        if (esEdicion.value) await api.put(`/cursos/${id}`, curso);
        else await api.post("/cursos", curso);
        router.push("/");
    } catch (e) {
        errorApi.value = e.response?.data?.mensaje || "No se pudo conectar con la API.";
    }
}
</script>

<template>
    <h1>{{ esEdicion ? "Editar curso" : "Nuevo curso" }}</h1>

    <div v-if="errorApi" class="alert alert-error">{{ errorApi }}</div>
    <div v-if="errores.length" class="alert alert-error">
        <div v-for="e in errores" :key="e">{{ e }}</div>
    </div>

    <form class="card" @submit.prevent="guardar" novalidate>
        <div class="form-group">
            <label for="nombre">Nombre</label>
            <input id="nombre" v-model="nombre" />
        </div>

        <div class="form-group">
            <label for="creditos">Créditos</label>
            <input id="creditos" type="number" v-model="creditos" min="1" />
        </div>

        <div class="acciones">
            <button type="submit" class="btn">{{ esEdicion ? "Actualizar" : "Registrar" }}</button>
            <RouterLink to="/" class="btn btn-secondary">Cancelar</RouterLink>
        </div>
    </form>
</template>
