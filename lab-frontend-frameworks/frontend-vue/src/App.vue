<template>
    <nav class="navbar">
        <span class="brand"> Gestión de Cursos (Vue)</span>
        <RouterLink to="/">Cursos</RouterLink>
        <RouterLink to="/nuevo">Nuevo curso</RouterLink>
    </nav>
    <main class="container">
        <RouterView />
    </main>
</template>
