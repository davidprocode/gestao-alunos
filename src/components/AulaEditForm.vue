<template>
    <div>
      <h3>Editar Aula</h3>
      <form @submit.prevent="salvar">
        <label>Data:</label>
        <input type="date" v-model="data" />
        <label>Horário:</label>
        <input type="time" v-model="horario" />
        <label>
          <input type="checkbox" v-model="aplicarProximas" />
          Aplicar às próximas aulas
        </label>
        <button type="submit">Salvar</button>
        <button type="button" @click="$emit('cancelar')">Cancelar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: ['aula'],
    data() {
      const dataAula = new Date(this.aula.data);
      return {
        data: dataAula.toISOString().split('T')[0],
        horario: dataAula.toTimeString().slice(0, 5),
        aplicarProximas: false,
      };
    },
    methods: {
      salvar() {
        const novaData = new Date(this.data);
        const [hora, minuto] = this.horario.split(':');
        novaData.setHours(hora, minuto, 0, 0);
        this.$emit('salvar', this.aula.id, novaData, this.aplicarProximas);
      },
    },
  };
  </script>
  
  <style scoped>
  form { margin-bottom: 20px; }
  input { padding: 8px; margin-right: 10px; }
  button { padding: 8px 12px; margin-right: 10px; }
  </style>