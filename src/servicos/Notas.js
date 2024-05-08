import { db } from "./SQLite";

//Após criar a conexão com o bando de dados
//precisamos criar a tabela
export function criaTabela() {
    db.transaction((transaction) => {
        transaction.executeSql("CREATE TABLE IF NOT EXISTS " + 
        //O segundo parâmetro (abaixo) é o nome da tabela
                "Notas " +
                //Aqui passamos o vai ficar dentro da tabela (abaixo)
                "(id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, categoria TEXT, texto TEXT);")
    })
}

export async function adicionaNota(nota) {
    return new Promise((resolve) => {
          db.transaction((transaction) => {
        transaction.executeSql("INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);", [nota.titulo, nota.categoria, 
            nota.texto],() => {
                resolve("Nota adicionada com sucesso")
    })
    })
    })
  
}

export async function buscaNotas() {
    return new Promise((resolve) => {
          db.transaction((transaction) => {
        transaction.executeSql("SELECT * FROM Notas;", [],(transaction, resultados) => {
                resolve(resultados.rows._array)
    })
    })
    })
  
}

export async function atualizaNota(nota) {
    return new Promise((resolve) => {
          db.transaction((transaction) => {
        transaction.executeSql("UPDATE Notas SET titulo = ?, categoria = ?, texto = ? WHERE id = ?;", [nota.titulo, nota.categoria, 
            nota.texto, nota.id],() => {
                resolve("Nota atualizada com sucesso")
    })
    })
    })
  
}

export async function removeNota(nota) {
    return new Promise((resolve) => {
          db.transaction((transaction) => {
        transaction.executeSql("DELETE FROM Notas WHERE id = ?;", [nota.id],() => {
                resolve("Nota removida com sucesso")
    })
    })
    })
  
}