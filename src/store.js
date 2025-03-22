import { reactive } from 'vue';

export const store = reactive({
  alunos: [],
  aulas: [],

  adicionarAula(aula) {
    const novaAula = { ...aula, id: Date.now() + Math.random() };
    this.aulas.push(novaAula);
  },

  editarAula(aulaId, novaData, aplicarProximas) {
    const aula = this.aulas.find(a => a.id === aulaId);
    if (!aula) return;

    const aluno = this.alunos.find(a => a.id === aula.alunoId);
    const antigaData = new Date(aula.data);
    aula.data = new Date(novaData);

    if (aplicarProximas) {
      const novoDiaSemana = novaData.getDay();
      const novoHorario = novaData.toTimeString().slice(0, 5);

      this.aulas
        .filter(a => a.alunoId === aula.alunoId && a.data > antigaData)
        .forEach(a => {
          const dataAtual = new Date(a.data);
          const diaSemanaAtual = dataAtual.getDay();
          if (diaSemanaAtual === antigaData.getDay()) {
            const [hora, minuto] = novoHorario.split(':');
            dataAtual.setDate(dataAtual.getDate() + (novoDiaSemana - diaSemanaAtual));
            dataAtual.setHours(hora, minuto, 0, 0);
            a.data = new Date(dataAtual);
          }
        });

      aluno.horario = novoHorario;
      const diasMap = { 0: 'Domingo', 1: 'Segunda', 2: 'Terça', 3: 'Quarta', 4: 'Quinta', 5: 'Sexta', 6: 'Sábado' };
      aluno.dias = aluno.dias.map(d => d === diasMap[antigaData.getDay()] ? diasMap[novoDiaSemana] : d);
    }
  },

  removerAula(aulaId) {
    this.aulas = this.aulas.filter(a => a.id !== aulaId);
  },

  // Métodos adicionais para alunos podem ser adicionados conforme necessário
});