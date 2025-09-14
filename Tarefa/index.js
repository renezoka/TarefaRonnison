const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended : true}))
let motoristas= [
    {"primeiro_nome":"Jakie","ultimo_nome":"Adran","cidade":"Colcabamba","pais":"Peru","marca":"Pontiac","modelo":"Montana","ano":2005},
    {"primeiro_nome":"Regan","ultimo_nome":"Malkin","cidade":"Žitenice","pais":"Czech Republic","marca":"Volkswagen","modelo":"GTI","ano":2009},
    {"primeiro_nome":"Fidelio","ultimo_nome":"Arblaster","cidade":"Rožaje","pais":"Montenegro","marca":"Dodge","modelo":"Ram 2500","ano":1994},
    {"primeiro_nome":"Neddy","ultimo_nome":"Dinneges","cidade":"Corona","pais":"United States","marca":"Mitsubishi","modelo":"Excel","ano":1989},
    {"primeiro_nome":"Heindrick","ultimo_nome":"Balleine","cidade":"Campaka","pais":"Indonesia","marca":"Kia","modelo":"Amanti","ano":2004},
    {"primeiro_nome":"Quillan","ultimo_nome":"Tegeller","cidade":"Chivhu","pais":"Zimbabwe","marca":"Honda","modelo":"Pilot","ano":2002},
    {"primeiro_nome":"Curcio","ultimo_nome":"Hacaud","cidade":"Longgang","pais":"China","marca":"Dodge","modelo":"Intrepid","ano":2001},
    {"primeiro_nome":"Gustaf","ultimo_nome":"Ghost","cidade":"Resplendor","pais":"Brazil","marca":"BMW","modelo":"3 Series","ano":2006},
    {"primeiro_nome":"Syman","ultimo_nome":"Finding","cidade":"Trawniki","pais":"Poland","marca":"GMC","modelo":"Savana 3500","ano":2007},
    {"primeiro_nome":"Cori","ultimo_nome":"Ridd","cidade":"Castlebridge","pais":"Ireland","marca":"Mercedes-Benz","modelo":"500E","ano":1992}
]
const hello = (req,res)=>{
    let prim = 'ronnison'//req.params.id;
    res.send('<h1>Hello World! ' + nome + '</h1>');
};

// 1 Questão
const getCarros = (req,res)=>{
    let carro = []
    carro = motoristas.map(({marca, modelo, ano}) => ({marca, modelo, ano}));
    res.json(carro);
}

// 2 Questão
const getDonos = (req,res)=>{
    let dono = []
    dono = motoristas.map(({primeiro_nome}) => ({primeiro_nome}));
    res.json(dono);
}


const getMotorista = (req,res)=>{
    let primeiro_nome = req.params.primeiro_nome;
    let dono = motoristas.find(cust => cust.primeiro_nome === primeiro_nome);
    let sts = dono ? 200 : 404;
    if(dono) {
        let motorista = {
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

const delCliente = (req,res)=>{
    let customerId = parseInt(req.params.id)
    let index = motoristas.findIndex(c => c.id === customerId)
    if(index !== -1) {
        motoristas.splice(index, 1)
        res.status(204).send()
    } else {
        res.status(404).send("Cliente não encontrado")
    }
}

const postCliente = (req,res)=>{
    const newCustomer = req.body

    if(!newCustomer.name || !newCustomer.email) {
        return res.status(400).send("Nome e email são obrigatórios")
    }
    const newId = customers.length > 0 ? Math.max(...customers.map(c=>c.id)) + 1 : 1
    newCustomer.id = newId
    customers.push(newCustomer)
    res.status(201).json(newCustomer)
}

const putCliente = (req, res) =>{
    let customerId = parseInt(req.params.id)
    let updateCustomer = req.body;

    let index = customers.findIndex(c => c.id === customerId)

    if(index !== -1) {
        updateCustomer.id = customerId
        customers[index] = updateCustomer
        res.status(200).json(updateCustomer)
    }else{
        res.status(404).send('O cliente nao foi encontrado :(')
    }
}

const patchCliente = (req,res) => {
    const customerId = parseInt(req.params.id) 
    const parcialCustomer = req.body

    const index = customer.findIndex(c => c.id === customerId)

    if(index !== -1){
        customer[index] = {
            ...customers[index],
            ...parcialCustomer,
            id : customerId
        }
        res.status(200).json(customer[index])
    }else{
        res.status(404).send("O cliente nao foi encontrado ;-;")
    }
}

//ROTAS DA API
app.get('/', hello);
app.get('/motorista/:primeiro_nome', getMotorista)
app.get('/donos', getDonos);
app.get('/carros', getCarros)
//app.get('/clientes/:nome', getClienteByName)
app.delete('/clientes/:id', delCliente)
app.post('/cliente',postCliente)
app.put('/cliente',putCliente)
app.patch('/cliente',patchCliente)

app.listen(3000, ()=>{
    console.log('O servidor está funcionando na porta 3000')
})
