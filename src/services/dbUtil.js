import React, { PureComponent } from 'react'
import { Variaveis } from './variaveis'
import SQLite from "react-native-sqlite-storage";

export const executeQuery = (sql) => {
    let db = SQLite.openDatabase({ name: DATABASE.FILE_NAME, location: "default" })
    db.transaction((tx) => {
        tx.executeSql(sql.query, sql.args)
    })
}

export const executeQueryInterno = (sql) => {
    let db = SQLite.openDatabase({ name: DATABASE.FILE_NAME, location: "default" })
    return new Promise(
        function (resolve, reject) {
            db.transaction((tx) => {
                tx.executeSql(sql.query, sql.args, (tx, results) => {
                    let arraySQL = []
                    // AsyncStorage.removeItem('sql')
                    var len = results.rows.length
                    for (let i = 0; i < len; i++) {
                        let row = results.rows.item(i)
                        arraySQL.push(row)
                    }
                    // AsyncStorage.setItem('sql', JSON.stringify(arraySQL))
                    resolve(arraySQL)
                })
            })
        });
}