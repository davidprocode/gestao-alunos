<template>
    <div>
      <h3>{{ aula.id ? 'Editar Aula' : 'Adicionar Aula' }}</h3>
      <form @submit.prevent="salvar">
        <label>Aluno:</label>
        <select v-model="aula.alunoId" required>
          <option v-for="aluno in store.alunos" :key="aluno.id" :value="aluno.id">
            {{ aluno.nome }}
          </option>
        </select>
        <label>Data:</label>
        <input type="date" v-model="data" required />
        <label>Horário:</label>
        <input type="time" v-model="horario" required />
        <label v-if="aula.id">
          <input type="checkbox" v-model="aplicarProximas" />
          Aplicar às próximas aulas
        </label>
        <button type="submit">Salvar</button>
        <button type="button" @click="$emit('cancelar')">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  import { store } from '../store';
  
  export default {
    props: ['aula'],
    data() {
      const dataAula = this.aula.data ? new Date(this.aula.data) : new Date();
      return {
        data: dataAula.toISOString().split('T')[0],
        horario: dataAula.toTimeString().slice(0, 5),
        aplicarProximas: false,
        store,
      };
    },
    methods: {
      salvar() {
        const novaData = new Date(this.data);
        const [hora, minuto] = this.horario.split(':');
        novaData.setHours(hora, minuto, 0, 0);
        this.$emit('salvar', { ...this.aula, data: novaData, aplicarProximas: this.aplicarProximas });
      },
    },
  };
  </script>
  
  <style scoped>
  form { margin-bottom: 20px; }
  input, select { padding: 10px; margin-right: 10px; }
  button { padding: 8px 12px; margin-right: 10px; }
  </style>