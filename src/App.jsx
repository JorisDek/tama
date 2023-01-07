import { useEffect } from 'react'
// import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import * as s from "./styles/globalStyles"
import TamaRenderer from './components/tamaRenderer'
import _color from './assets/images/bg/_color.png'

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector((state) => state.blockchain)
  const data = useSelector((state) => state.data)

  console.table(blockchain)
  console.log(data)

  const mintNFT = (_account, _name) => {
    blockchain.tamaToken.methods.createRandomTama(_name)
    .send({ from: _account, value: blockchain.web3.utils.toWei('0.015', 'ether') })
    .once("error", (error) => {
      console.log(error)
    }).then((receipt) => {
      console.log(receipt)
      dispatch(fetchData(blockchain.account))
    })
  }

  const levelUpTama = (_account, _id) => {
    blockchain.tamaToken.methods
    .levelUp(_id)
    .send({ from: _account })
    .once("error", (error) => {
      console.log(error)
    }).then((receipt) => {
      console.log(receipt)
      dispatch(fetchData(blockchain.account))
    })
  }

  useEffect(() => {
    if(blockchain.account != "" && blockchain.tamaToken != null) {
      dispatch(fetchData(blockchain.account))
    }
  }, [blockchain.tamaToken])

  return (
    <s.Screen image={_color}>
      {blockchain.account === "" || blockchain.tamaToken === null ? (
        <s.Container flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Dragsters Game</s.TextTitle>
          <s.SpacerSmall />
          {/* <p>Account: {blockchain.account}</p> */}
          <button onClick={(e) => {
            e.preventDefault()
            dispatch(connect())
          }}>connect</button>
        </s.Container>
      ) : (
        <s.Container  flex={1} ai={"center"} jc={"center"}>
          <s.TextTitle>Welcome</s.TextTitle>
          <s.SpacerSmall />
          <button onClick={(e) => {
            e.preventDefault()
            mintNFT(blockchain.account, "Joris")
          }}>Create NEW Tama NFT</button>
          <s.SpacerSmall />

          <s.Container fd={"row"} jc={"space-evenly"} style={{flexWrap: "wrap"}}>
            {data.allOwnerTamas.map((tama) => {
              return (
                <s.Container key={tama.id} style={{padding: "15px"}}>
                  <TamaRenderer tama={tama}  />
                  <s.SpacerXSmall />
                  <s.Container>
                    <s.TextDescription>ID: {tama.id}</s.TextDescription>
                    <s.TextDescription>NAME: {tama.name}</s.TextDescription>
                    <s.TextDescription>DNA: {tama.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {tama.level}</s.TextDescription>
                    <s.TextDescription>RARITY: {tama.rarity}</s.TextDescription>
                    <s.SpacerXSmall />
                    
                    <button onClick={(e) => {
                      e.preventDefault();
                      levelUpTama(blockchain.account, tama.id);
                    }}>Level up</button>
                  </s.Container>
                  <s.SpacerSmall />
                </s.Container>
              )
            })}
          </s.Container>
          
        </s.Container>
      
      )}
    </s.Screen>
  )
}

export default App
