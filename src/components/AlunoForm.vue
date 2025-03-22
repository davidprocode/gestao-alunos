<template>
  <form @submit.prevent="salvar">
    <input v-model="aluno.nome" placeholder="Nome do Aluno" required />
    <div>
      <label>Dias da Semana:</label>
      <div v-for="dia in diasSemana" :key="dia">
        <input type="checkbox" :value="dia" v-model="aluno.dias" />
        {{ dia }}
      </div>
    </div>
    <div>
      <label>Horário:</label>
      <input type="time" v-model="aluno.horario" required />
    </div>
    <button type="submit">{{ aluno.id ? 'Editar' : 'Adicionar' }}</button>
    <button type="button" @click="$emit('cancelar')">Cancelar</button>
  </form>
</template>

<script>
export default {
  props: ['alunoEditado'],
  data() {
    return {
      aluno: this.alunoEditado ? { ...this.alunoEditado } : { nome: '', dias: [], horario: '' },
      diasSemana: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    };
  },
  methods: {
    salvar() {
      this.$emit('salvar', this.aluno);
      this.aluno = { nome: '', dias: [], horario: '' };
    },
  },
};
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
input {
  padding: 8px;
  margin-right: 10px;
}
button {
  padding: 8px 12px;
  margin-right: 10px;
}
</style>