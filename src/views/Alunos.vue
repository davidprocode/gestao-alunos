<template>
  <div>
    <h1>Gestão de Alunos</h1>
    <AlunoForm
      @salvar="salvarAluno"
      @cancelar="editando = null"
      :aluno-editado="editando"
    />
    <h2>Lista de Alunos</h2>
    <label
      ><input type="checkbox" v-model="mostrarApenasHoje" /> Mostrar apenas
      alunos com aula hoje</label
    >
    <div v-for="aluno in alunosFiltrados" :key="aluno.id">
      <h3>{{ aluno.nome }}</h3>
      <p>Dias: {{ aluno.dias.join(", ") }}</p>
      <p>Horário: {{ aluno.horario }}</p>
      <button @click="editarAluno(aluno)">Editar Aluno</button>
      <h4>Aulas</h4>
      <ul>
        <li v-for="aula in aulasDoAluno(aluno.id)" :key="aula.id">
          {{ aula.data.toLocaleString() }}
          <button @click="editarAula(aula)">Editar Aula</button>
          <input
            type="checkbox"
            :checked="aula.presente"
            @change="registrarPresenca(aula.id, $event.target.checked)"
          />
        </li>
      </ul>
      <AulaEditForm
        v-if="aulaEditando && aulaEditando.alunoId === aluno.id"
        :aula="aulaEditando"
        @salvar="salvarAula"
        @cancelar="aulaEditando = null"
      />
    </div>
  </div>
</template>

<script>
import { store } from "../store";
import AlunoForm from "../components/AlunoForm.vue";
import AulaEditForm from "../components/AulaEditForm.vue";

export default {
  components: { AlunoForm, AulaEditForm },
  data() {
    return {
      editando: null,
      mostrarApenasHoje: false,
      aulaEditando: null,
    };
  },
  computed: {
    alunosFiltrados() {
      if (!this.mostrarApenasHoje) return store.alunos;
      return store.alunos.filter((aluno) => this.temAulaHoje(aluno.id));
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
    aulasDoAluno(alunoId) {
      return store.aulas
        .filter((a) => a.alunoId === alunoId)
        .sort((a, b) => a.data - b.data);
    },
    temAulaHoje(alunoId) {
      const hoje = new Date();
      return store.aulas.some(
        (a) =>
          a.alunoId === alunoId && a.data.toDateString() === hoje.toDateString()
      );
    },
    editarAula(aula) {
      this.aulaEditando = { ...aula };
    },
    salvarAula(aulaId, novaData, aplicarProximas) {
      store.editarAula(aulaId, novaData, aplicarProximas);
      this.aulaEditando = null;
    },
    registrarPresenca(aulaId, presente) {
      store.registrarPresenca(aulaId, presente);
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
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
</style>
