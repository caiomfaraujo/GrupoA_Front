<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">Grupoo A - Desafio</a>
      </div>
    </nav>
    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          <b>Todo o formulário de ser preenchido.</b>
        </li>
      </ul>
      <form @submit.prevent="salvar">
          <label>Nome</label>
          <input type="text" placeholder="nome completo" v-model="aluno.nome">
          <label>Registro Acadêmico</label>
          <input type="number" placeholder="número identificador do registro" v-model="aluno.registroacademico">
          <label>CPF</label>
          <input type="text" placeholder="cadastro de pessoa física" v-model="aluno.cpf">
          <button class="waves-effect waves-light btn-small">Salvar<i class="material-icons left">save</i></button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Registro Acadêmico</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno of alunos" :key="aluno.id">
            <td>{{ aluno.registroAcademico }}</td>
            <td>{{ aluno.nome }}</td>
            <td>{{ aluno.identificacao }}</td>
            <td>
              <button @click="editar(aluno)" class="waves-effect btn-small blue darken-1"><i class="material-icons">create</i></button>
              <button @click="remover(aluno)" class="waves-effect btn-small red darken-1"><i class="material-icons">delete_sweep</i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Aluno from './services/alunos'
export default {
data(){
  return {
    aluno: {
      id: '',
      nome: '',
      registroacademico: '',
      cpf: ''
    },
    alunos: [],
    errors: []
  }
},
mounted(){
    this.listar();
  },
methods:{
  listar(){
    Aluno.listar().then(response => {
      this.alunos = response.data
    })
  },
  salvar(){
    if(!this.aluno.id){
      Aluno.salvar(this.aluno).then(response => {
        this.aluno = {}
        alert('Aluno salvo com sucesso.')
        this.listar()
        this.errors = []
        console.log(response)
      }).catch(e => {
        this.errors = e.response.data.errors
      })
    }else{
      Aluno.atualizar(this.aluno).then(response => {
        this.aluno = {}
        alert('Aluno atualizado com sucesso.')
        this.listar()
        this.errors = []
        console.log(response)
        }).catch(e => {
        this.errors = e.response.data.errors
      })
    }
  },
  editar(aluno){
    this.aluno = aluno
  },
  remover(aluno){
    if(confirm('Deseja excluir o aluno?')){
      Aluno.apagar(aluno).then(response => {
        this.listar();
        this.errors = []
        console.log(response)
      }).catch(e => {
        this.errors = e.response.data.errors
      })
    }
  }
}
}
</script>

