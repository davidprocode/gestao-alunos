<template>
  <div id="app">
    <aside class="menu">
      <h2>Menu</h2>
      <ul>
        <li><router-link to="/alunos">Gestão de Alunos</router-link></li>
        <li><router-link to="/aulas">Gestão de Aulas</router-link></li>
        <li><router-link to="/relatorios">Relatórios</router-link></li>
      </ul>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  display: flex;
  font-family: Arial, sans-serif;
}
.menu {
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
  height: 100vh;
}
.content {
  flex: 1;
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin-bottom: 10px;
}
a {
  text-decoration: none;
  color: #42b983;
}
a:hover {
  color: #359c6d;
}
</style>