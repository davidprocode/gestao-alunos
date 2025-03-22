<template>
  <div>
    <h1>Relatórios</h1>
    <h2>Presença por Dia</h2>
    <BarChart :data="dadosDiarios" :options="chartOptions" />
    <h2>Presença por Semana</h2>
    <BarChart :data="dadosSemanais" :options="chartOptions" />
    <h2>Presença por Mês</h2>
    <BarChart :data="dadosMensais" :options="chartOptions" />
  </div>
</template>

<script>
import { store } from '../store';
import { BarChart } from 'vue-chartjs';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  components: { BarChart },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
  computed: {
    dadosDiarios() {
      const dados = {};
      store.aulas.forEach(aula => {
        if (aula.presente) {
          const data = aula.data.toDateString();
          dados[data] = (dados[data] || 0) + 1;
        }
      });
      return {
        labels: Object.keys(dados),
        datasets: [{ label: 'Presentes', data: Object.values(dados), backgroundColor: '#42b983' }],
      };
    },
    dadosSemanais() {
      const dados = {};
      store.aulas.forEach(aula => {
        if (aula.presente) {
          const semana = `${aula.data.getFullYear()}-W${Math.floor(aula.data.getDate() / 7) + 1}`;
          dados[semana] = (dados[semana] || 0) + 1;
        }
      });
      return {
        labels: Object.keys(dados),
        datasets: [{ label: 'Presentes', data: Object.values(dados), backgroundColor: '#42b983' }],
      };
    },
    dadosMensais() {
      const dados = {};
      store.aulas.forEach(aula => {
        if (aula.presente) {
          const mes = `${aula.data.getFullYear()}-${aula.data.getMonth() + 1}`;
          dados[mes] = (dados[mes] || 0) + 1;
        }
      });
      return {
        labels: Object.keys(dados),
        datasets: [{ label: 'Presentes', data: Object.values(dados), backgroundColor: '#42b983' }],
      };
    },
  },
};
</script>

<style scoped>
canvas {
  max-height: 400px;
  margin-bottom: 40px;
}
</style>