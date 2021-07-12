import { http } from './config'

export default {

    listar:() => {
        return http.get('Aluno/listaalunos');
    },

    salvar:(aluno) => {
        return http.post('Aluno/addaluno?nome=' + aluno.nome + '&identificacao=' + aluno.cpf + '&RegistroAcademico=' + aluno.registroacademico);
    },

    atualizar:(aluno) => {
        return http.put('Aluno/atualizaaluno?id=' + aluno.id + '&nome=' + aluno.nome + '&identificacao=' + aluno.cpf + '&RegistroAcademico=' + aluno.registroacademico)
    },

    apagar:(aluno) => {
        return http.delete('Aluno/deletaaluno?id=' + aluno.id)
    }
}