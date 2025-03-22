<template>
  <div id="app">
    <nav>
      <router-link to="/">Gestão de Alunos</router-link> |
      <router-link to="/relatorios">Relatórios</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
nav {
  margin-bottom: 20px;
}
</style>