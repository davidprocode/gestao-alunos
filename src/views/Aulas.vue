<template>
    <div>
      <h1>Gestão de Aulas</h1>
      <button @click="adicionarAula">Adicionar Aula</button>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Data</th>
            <th>Horário</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aula in store.aulas" :key="aula.id">
            <td>{{ getAlunoNome(aula.alunoId) }}</td>
            <td>{{ aula.data.toLocaleDateString() }}</td>
            <td>{{ aula.data.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}</td>
            <td>
              <button @click="editarAula(aula)">Editar</button>
              <button @click="removerAula(aula.id)">Remover</button>
            </td>
          </tr>
        </tbody>
      </table>
      <AulaForm v-if="aulaEditando" 
                :aula="aulaEditando" 
                @salvar="salvarAula" 
                @cancelar="aulaEditando = null" />
    </div>
  </template>
  
  <script>
  import { store } from '../store';
  import AulaForm from '../components/AulaForm.vue';
  
  export default {
    components: { AulaForm },
    data() {
      return {
        aulaEditando: null,
      };
    },
    methods: {
      adicionarAula() {
        this.aulaEditando = { id: null, alunoId: '', data: new Date() };
      },
      editarAula(aula) {
        this.aulaEditando = { ...aula };
      },
      salvarAula(aula) {
        if (aula.id) {
          store.editarAula(aula.id, aula.data, aula.aplicarProximas);
        } else {
          store.adicionarAula(aula);
        }
        this.aulaEditando = null;
      },
      removerAula(aulaId) {
        store.removerAula(aulaId);
      },
      getAlunoNome(alunoId) {
        const aluno = store.alunos.find(a => a.id === alunoId);
        return aluno ? aluno.nome : 'Desconhecido';
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
    padding: 12px;
    text-align: left;
  }
  th {
    background-color: #f2f2f2;
  }
  button {
    padding: 8px 12px;
    margin-right: 10px;
  }
  </style>