const HDWalletProvider = require('truffle-hdwallet-provider')
const Web3 = require('web3')
const { interface, bytecode } = require('./compile')

const provider = new HDWalletProvider(
  'hello salon wire another gesture pledge push purpose devote erode finger number',
  'https://rinkeby.infura.io/QvtaQyfQgEChzSNt2f27'
)

const web3 = new Web3(provider)

const deploy = async () => {
  const accounts = await web3.eth.getAccounts()

  const deployedContract = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: ['Hello!']
    })
    .send({
      from: accounts[0],gas: 1000000
    })

  console.log('Address of account:::', deployedContract.options.address)
  // 0x385d90625BD19BC18D0e2bFA69f875ea62e45705
}

deploy()
