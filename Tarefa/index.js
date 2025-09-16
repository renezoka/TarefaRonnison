const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
let motoristas= [
    {"id":1,"primeiro_nome":"Jakie","ultimo_nome":"Adran","cidade":"Colcabamba","pais":"Peru","marca":"Pontiac","modelo":"Montana","ano":2005},
    {"id":2,"primeiro_nome":"Regan","ultimo_nome":"Malkin","cidade":"Žitenice","pais":"Czech Republic","marca":"Volkswagen","modelo":"GTI","ano":2009},
    {"id":3,"primeiro_nome":"Fidelio","ultimo_nome":"Arblaster","cidade":"Rožaje","pais":"Montenegro","marca":"Dodge","modelo":"Ram 2500","ano":1994},
    {"id":4,"primeiro_nome":"Neddy","ultimo_nome":"Dinneges","cidade":"Corona","pais":"United States","marca":"Mitsubishi","modelo":"Excel","ano":1989},
    {"id":5,"primeiro_nome":"Heindrick","ultimo_nome":"Balleine","cidade":"Campaka","pais":"Indonesia","marca":"Kia","modelo":"Amanti","ano":2004},
    {"id":6,"primeiro_nome":"Quillan","ultimo_nome":"Tegeller","cidade":"Chivhu","pais":"Zimbabwe","marca":"Honda","modelo":"Pilot","ano":2002},
    {"id":7,"primeiro_nome":"Curcio","ultimo_nome":"Hacaud","cidade":"Longgang","pais":"China","marca":"Dodge","modelo":"Intrepid","ano":2001},
    {"id":8,"primeiro_nome":"Gustaf","ultimo_nome":"Ghost","cidade":"Resplendor","pais":"Brazil","marca":"BMW","modelo":"3 Series","ano":2006},
    {"id":9,"primeiro_nome":"Syman","ultimo_nome":"Finding","cidade":"Trawniki","pais":"Poland","marca":"GMC","modelo":"Savana 3500","ano":2007},
    {"id":10,"primeiro_nome":"Cori","ultimo_nome":"Ridd","cidade":"Castlebridge","pais":"Ireland","marca":"Mercedes-Benz","modelo":"500E","ano":1992}
]
const hello = (req,res)=>{
    let prim = 'ronnison'//req.params.id;
    res.send('<h1>Hello World! ' + nome + '</h1>');
};

// 1 Questão
const getCarros = (req,res)=>{
    let carro = []
    carro = motoristas.map(({id,marca, modelo, ano}) => ({id,marca, modelo, ano}));
    res.json(carro);
}

// 2 Questão
const getDonos = (req,res)=>{
    let dono = []
    dono = motoristas.map(({primeiro_nome}) => ({primeiro_nome}));
    res.json(dono);
}

//3 Questão
const getMotorista = (req,res)=>{
    let primeiro_nome = req.params.primeiro_nome;
    let dono = motoristas.find(cust => cust.primeiro_nome === primeiro_nome);
    let sts = dono ? 200 : 404;
    if(dono) {
        let motorista = {
            id: dono.id,
            primeiro_nome: dono.primeiro_nome,
            ultimo_nome: dono.ultimo_nome,
            cidade: dono.cidade,
            pais: dono.pais,
            marca: dono.modelo,
            modelo: dono.modelo,
            ano: dono.ano
        }
        res.status(sts).json(motorista);
    } else {
        res.status(sts).send('motorista not found!');
    }
}

//4 Questão
const getModelo = (req,res)=>{
    let modelo = req.params.modelo;
    let carro = motoristas.find(cust => cust.modelo === modelo);
    let sts = carro ? 200 : 404;
    if(carro) {
        let motorista = {
            primeiro_nome: carro.primeiro_nome,
            ultimo_nome: carro.ultimo_nome,
            modelo: carro.modelo,
            }
        res.status(sts).json(motorista);
    } else {
        res.status(sts).send('modelo not found!');
    }
}

//5 Questão
const delMotorista = (req, res) => {
  const id = Number(req.params.id);
  const idx = motoristas.findIndex((x) => x.id === id);
  if (idx === -1)
    return res.status(404).json({ erro: "Motorista não encontrado" });
  const apagado = motoristas.splice(idx, 1)[0];
  res.json({ apagado });
};

const patchCarro = (req, res) => {
  const id = Number(req.params.id);
  const m = motoristas.find(x => x.id === id);
  if (!m) return res.status(404).json({ erro: 'Motorista não encontrado' });

  const { marca, modelo, ano } = req.body || {};
  if (marca !== undefined) m.marca = marca;
  if (modelo !== undefined) m.modelo = modelo;
  if (ano !== undefined) m.ano = ano;

  res.json(m);
};

const patchMotorista = (req, res) => {
  const id = Number(req.params.id);
  const m = motoristas.find(x => x.id === id);
  if (!m) return res.status(404).json({ erro: 'Motorista não encontrado' });

  const permitidos = ['primeiro_nome', 'ultimo_nome', 'cidade', 'estado', 'pais'];
  for (const campo of permitidos) {
    if (req.body.hasOwnProperty(campo)) m[campo] = req.body[campo];
  }
  res.json(m);
};

const putMotorista = (req, res) => {
  const id = Number(req.params.id);
  const idx = motoristas.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ erro: 'Motorista não encontrado' });

  const novo = req.body || {};
  // validação mínima para substituição completa
  const obrigatorios = ['primeiro_nome', 'ultimo_nome', 'marca', 'modelo', 'ano'];
  for (const campo of obrigatorios) {
    if (!novo[campo]) return res.status(400).json({ erro: "Campo obrigatório ausente: ${campo}" });
  }
  motoristas[idx] = { id, ...novo };
  res.json(motoristas[idx]);
};

//ROTAS DA API
app.get('/', hello);
app.get('/motorista/:primeiro_nome', getMotorista)
app.get('/modelo/:modelo', getModelo)
app.get('/donos', getDonos);
app.get('/carros', getCarros)
app.delete('/delMotorista/:id', delMotorista)
app.patch('/motorista/:id/:carro', patchCarro)
app.patch('/motorista/:id', patchMotorista)
app.put('/motorista/:id',putMotorista)
//app.get('/clientes/:nome', getClienteByName)
app.listen(3000, ()=>{
    console.log('O servidor está funcionando na porta 3000')
})
