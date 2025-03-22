<template>
    <div>
      <h1>Gestão de Alunos</h1>
      
      <!-- Formulário de Aluno -->
      <AlunoForm @salvar="salvarAluno" @cancelar="editando = null" :aluno-editado="editando" />
      
      <!-- Lista de Alunos -->
      <h2>Lista de Alunos</h2>
      <label><input type="checkbox" v-model="mostrarApenasHoje" /> Mostrar apenas alunos com aula hoje</label>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
            <th>Marcar Aula</th>
            <th>Presença Hoje</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in alunosFiltrados" :key="aluno.id">
            <td>{{ aluno.nome }}</td>
            <td>
              <button @click="editarAluno(aluno)">Editar</button>
            </td>
            <td>
              <input type="date" v-model="datasAula[aluno.id]" @change="marcarAula(aluno.id)" />
            </td>
            <td>
              <input
                type="checkbox"
                :checked="presencaHoje(aluno.id)"
                @change="registrarPresenca(aluno.id, $event.target.checked)"
                :disabled="!temAulaHoje(aluno.id)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { store } from '../store';
  import AlunoForm from '../components/AlunoForm.vue';
  
  export default {
    components: { AlunoForm },
    data() {
      return {
        editando: null,
        mostrarApenasHoje: false,
        datasAula: {},
      };
    },
    computed: {
      alunosFiltrados() {
        if (!this.mostrarApenasHoje) return store.alunos;
        return store.alunos.filter(aluno => this.temAulaHoje(aluno.id));
      },
    },
    methods: {
      salvarAluno(aluno) {
        if (aluno.id) {
          store.editarAluno(aluno.id, aluno);
          this.editando = null;
        } else {
          store.adicionarAluno(aluno);
        }
      },
      editarAluno(aluno) {
        this.editando = { ...aluno };
      },
      marcarAula(alunoId) {
        const data = this.datasAula[alunoId];
        if (data) store.marcarAula(alunoId, data);
      },
      temAulaHoje(alunoId) {
        const hoje = new Date().toDateString();
        return store.aulas.some(
          aula => aula.alunoId === alunoId && aula.data.toDateString() === hoje
        );
      },
      presencaHoje(alunoId) {
        const hoje = new Date().toDateString();
        const aula = store.aulas.find(
          a => a.alunoId === alunoId && a.data.toDateString() === hoje
        );
        return aula ? aula.presente : false;
      },
      registrarPresenca(alunoId, presente) {
        store.registrarPresenca(alunoId, new Date(), presente);
      },
    },
  };
  </script>
  
  <style scoped>
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  </style>