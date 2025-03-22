import { reactive } from 'vue';

export const store = reactive({
  alunos: [],
  aulas: [],
  adicionarAluno(aluno) {
    this.alunos.push({ ...aluno, id: Date.now() });
  },
  editarAluno(id, alunoAtualizado) {
    const index = this.alunos.findIndex(a => a.id === id);
    if (index !== -1) this.alunos[index] = { ...alunoAtualizado, id };
  },
  marcarAula(alunoId, data) {
    this.aulas.push({ alunoId, data: new Date(data), presente: false });
  },
  registrarPresenca(alunoId, data, presente) {
    const aula = this.aulas.find(
      a => a.alunoId === alunoId && a.data.toDateString() === new Date(data).toDateString()
    );
    if (aula) aula.presente = presente;
  },
});