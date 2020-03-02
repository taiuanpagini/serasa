import React, { PureComponent } from 'react'
import { Variaveis } from './variaveis'
import SQLite from 'react-native-sqlite-storage'

//QUERYES
let CREATE_TABLE_LOGIN = 'CREATE TABLE IF NOT EXISTS usuarios (id INTEGER UNIQUE, name TEXT, email TEXT, cpf TEXT, senha TEXT, score INTEGER);'
let CREATE_TABLE_OFERTA_DIVIDA = 'CREATE TABLE IF NOT EXISTS ofertaDivida (id INTEGER UNIQUE, valorTotal INTEGER, valorDesconto INTEGER, title TEXT,empresa TEXT, descricao TEXT, tipo TEXT)'
let SELECT_ALL_USUARIOS = 'SELECT * FROM usuarios'
let SELECT_USUARIO = 'SELECT * FROM usuarios WHERE cpf = ? AND senha = ?'
let SELECT_DIVIDAS = 'SELECT * FROM ofertaDivida WHERE tipo = "divida" ORDER BY id DESC'
let SELECT_OFERTAS = 'SELECT * FROM ofertaDivida WHERE tipo = "oferta" ORDER BY id DESC'
let SELECT_OFERTAS_RG = 'SELECT * FROM ofertaDivida WHERE tipo = "proposta-rg"'
let INSERT_USUARIOS = 'INSERT INTO usuarios (id,name,email,cpf,senha,score) '
  + ' VALUES (1,"João da Silva", "joao.silva@gmail.com", "02346376891", "123456", 23), '
  + '(2,"Roberta dos Santos", "roberta.santos@gmail.com", "08976123487", "123456", 56), '
  + '(3,"Junior Alves", "junior.alves@gmail.com", "23412897687", "123456", 91);'
let INSERT_PROPOSTAS_DIVIDAS = 'INSERT INTO ofertaDivida (id,valorTotal,valorDesconto,title,empresa,descricao,tipo) '
  + 'VALUES (1, 225, 20, "Dívida com a xBox Live", "divida.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tortor eget augue sollicitudin ornare nec eget leo. In lorem est, placerat nec felis sed, tincidunt vulputate felis. Fusce malesuada odio a nibh porttitor, vel blandit metus molestie. \n\nInteger id nibh vitae mauris euismod consectetur pellentesque eu tellus. In ac placerat ex, ac rutrum tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel fringilla odio. Vivamus at luctus ligula, et imperdiet elit. Mauris ut tempus nulla. \n\nDonec at est mi. Vivamus et bibendum risus. Donec massa elit, egestas vel lectus ut, vulputate facilisis est. Aliquam id metus luctus, tincidunt metus quis, luctus velit.", "divida"), '
  + '(2, 1732, 45, "Dívida com empréstimo da caixa","caixa.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tortor eget augue sollicitudin ornare nec eget leo. In lorem est, placerat nec felis sed, tincidunt vulputate felis. Fusce malesuada odio a nibh porttitor, vel blandit metus molestie. \n\nInteger id nibh vitae mauris euismod consectetur pellentesque eu tellus. In ac placerat ex, ac rutrum tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel fringilla odio. Vivamus at luctus ligula, et imperdiet elit. Mauris ut tempus nulla. \n\nDonec at est mi. Vivamus et bibendum risus. Donec massa elit, egestas vel lectus ut, vulputate facilisis est. Aliquam id metus luctus, tincidunt metus quis, luctus velit.", "divida"), '
  + '(3, 3500, 0, "Proposta de cartão de crédito","cartao.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tortor eget augue sollicitudin ornare nec eget leo. In lorem est, placerat nec felis sed, tincidunt vulputate felis. Fusce malesuada odio a nibh porttitor, vel blandit metus molestie. \n\nInteger id nibh vitae mauris euismod consectetur pellentesque eu tellus. In ac placerat ex, ac rutrum tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel fringilla odio. Vivamus at luctus ligula, et imperdiet elit. Mauris ut tempus nulla. \n\nDonec at est mi. Vivamus et bibendum risus. Donec massa elit, egestas vel lectus ut, vulputate facilisis est. Aliquam id metus luctus, tincidunt metus quis, luctus velit.", "oferta"), '
  + '(4, 8600, 0, "Proposta empréstimo pessoal","caixa.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tortor eget augue sollicitudin ornare nec eget leo. In lorem est, placerat nec felis sed, tincidunt vulputate felis. Fusce malesuada odio a nibh porttitor, vel blandit metus molestie. \n\nInteger id nibh vitae mauris euismod consectetur pellentesque eu tellus. In ac placerat ex, ac rutrum tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel fringilla odio. Vivamus at luctus ligula, et imperdiet elit. Mauris ut tempus nulla. \n\nDonec at est mi. Vivamus et bibendum risus. Donec massa elit, egestas vel lectus ut, vulputate facilisis est. Aliquam id metus luctus, tincidunt metus quis, luctus velit.", "oferta"), '
  + '(5, 110, 15, "Proposta de proteção RG","cartao.png", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam at tortor eget augue sollicitudin ornare nec eget leo. In lorem est, placerat nec felis sed, tincidunt vulputate felis. Fusce malesuada odio a nibh porttitor, vel blandit metus molestie. \n\nInteger id nibh vitae mauris euismod consectetur pellentesque eu tellus. In ac placerat ex, ac rutrum tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus vel fringilla odio. Vivamus at luctus ligula, et imperdiet elit. Mauris ut tempus nulla. \n\nDonec at est mi. Vivamus et bibendum risus. Donec massa elit, egestas vel lectus ut, vulputate facilisis est. Aliquam id metus luctus, tincidunt metus quis, luctus velit.", "proposta-rg")'
let UPDATE_ALBUM = 'UPDATE photoAlbum SET coverFileId = ?, coverFileUrl = ?, nome = ?, descricao = ?, scheduledToHour = ?, scheduledToDate = ?, scheduled = ?, sent = ? '
  + 'WHERE codigo = ?'
let DELETE_ALL_USERS = 'DELETE FROM usuarios'
let DELETE_ALL_PROPOSTAS_DIVIDAS = 'DELETE FROM ofertaDivida'
let DROP_TABLE_USERS = 'DROP TABLE IF EXISTS usuarios'
let DROP_TABLE_OFERTAS_DIVIDAS = 'DROP TABLE IF EXISTS ofertaDivida'

export const createTableLogin = () => {
  var sql = []
  sql.query = CREATE_TABLE_LOGIN
  sql.args = []
  return sql
}

export const createTableOfertaDivida = () => {
  var sql = []
  sql.query = CREATE_TABLE_OFERTA_DIVIDA
  sql.args = []
  return sql
}

export const selectAllUsuarios = () => {
  var sql = []
  sql.query = SELECT_ALL_USUARIOS
  sql.args = []
  return sql
}

export const selectUsuario = (cpf, senha) => {
  var sql = []
  sql.query = SELECT_USUARIO
  sql.args = [cpf, senha]
  return sql
}

export const selectDividas = () => {
  var sql = []
  sql.query = SELECT_DIVIDAS
  sql.args = []
  return sql
}

export const selectOfertas = () => {
  var sql = []
  sql.query = SELECT_OFERTAS
  sql.args = []
  return sql
}

export const selectPropostaRG = () => {
  var sql = []
  sql.query = SELECT_OFERTAS_RG
  sql.args = []
  return sql
}

export const insertUsuarios = () => {
  var sql = []
  sql.query = INSERT_USUARIOS
  sql.args = []
  return sql
}

export const insertOfertasDividas = () => {
  var sql = []
  sql.query = INSERT_PROPOSTAS_DIVIDAS
  sql.args = []
  return sql
}

export const updateCodigoAlbum = (codigo, hashId) => {
  var sql = []
  sql.query = UPDATE_CODIGO_ALBUM
  sql.args = [codigo, hashId]
  return sql
}

export const deleteUsuarios = () => {
  var sql = []
  sql.query = DELETE_ALL_USERS
  sql.args = []
  return sql
}

export const deleteOfertasPropostas = () => {
  var sql = []
  sql.query = DELETE_ALL_PROPOSTAS_DIVIDAS
  sql.args = []
  return sql
}

export const dropTableUsuarios = () => {
  var sql = []
  sql.query = DROP_TABLE_USERS
  sql.args = []
  return sql
}

export const dropTableOfertaDivida = () => {
  var sql = []
  sql.query = DROP_TABLE_OFERTAS_DIVIDAS
  sql.args = []
  return sql
}