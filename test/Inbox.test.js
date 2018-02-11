const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const { interface, bytecode } = require('../compile')

const provider = ganache.provider()
const web3 = new Web3(provider)

let accounts
let inboxInstance

beforeEach(async () => {
  accounts = await web3.eth.getAccounts()

  inboxInstance = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: 1000000 })

  inboxInstance.setProvider(provider)
})

describe('Inbox:::', () => {
  it('deploys a contract', () => {
    assert.ok(inboxInstance.options.address)
  })

  it('initiates with default message', async () => {
    const message = await inboxInstance.methods.message().call()
    assert.equal(message, 'Hi there!')
  })

  it('can set a new message', async () => {
    await inboxInstance.methods.setMessage('Cool!').send({ from: accounts[0] })
    const newMessage = await inboxInstance.methods.message().call()
    assert.equal(newMessage, 'Cool!')
  })
})
