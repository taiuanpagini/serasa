import { Alert } from "react-native"
import fetch from "react-native-fetch-polyfill"
import store from "../redux/store"
import getDadosUsuario from "../redux/actions/usuarioAction"

export const msgAlert = (title, msg) => {
  Alert.alert(
    title,
    msg
  )
}

export const GetDadosUsuario = (cpf, senha, alertErro, setPageHome) => {
  fetch(`http://5e5962fd77770500144634c9.mockapi.io/GetPontuacao`,
    {
      timeout: 5000,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then((res) => {
      res.text()
        .then((res) => {
          const result = JSON.parse(res)

          const index = result.findIndex(x => x.cpf == cpf)

          if (result[index])
            if (cpf == result[index].cpf && senha == result[index].senha)
              setPageHome(result[index])
            else
              alertErro('Dados incorretos', 'Usuário ou senha incorretos')
          else
            alertErro('Dados incorretos', 'Usuário não encontrado')
        })
    })
    .catch((error) => {
      alertErro('Conexão', 'Problema de conexão, verifique sua internet!')
    })
}

export const GetPropostasCredito = (returnRequest) => {
  fetch(`http://5e5962fd77770500144634c9.mockapi.io/GetPropostaCredito`,
    {
      timeout: 5000,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then((res) => {
      res.text()
        .then((res) => {
          const result = JSON.parse(res)

          if (result)
            returnRequest(result)
        })
    })
}

export const GetPropostasAcordo = (returnRequest) => {
  fetch(`http://5e5962fd77770500144634c9.mockapi.io/GetPropostaAcordo`,
    {
      timeout: 5000,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
    .then((res) => {
      res.text()
        .then((res) => {
          const result = JSON.parse(res)

          if (result)
            returnRequest(result)
        })
    })
}

export const AceitaProposta = (oferta, usuario, returnRequest) => {
  const dadosUsuario = store.getState().usuario
  dadosUsuario.pontuacao = dadosUsuario.pontuacao + 10
  store.dispatch(getDadosUsuario(usuario))
  fetch(`http://5e5962fd77770500144634c9.mockapi.io/GetPontuacao/${usuario.id}`,
    {
      body: JSON.stringify(usuario),
      timeout: 5000,
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  )
}