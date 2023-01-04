import { useEffect } from 'react'
// import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { connect } from './redux/blockchain/blockchainActions'
import { fetchData } from './redux/data/dataActions'
import * as s from "./styles/globalStyles"

function App() {
  const dispatch = useDispatch()
  const blockchain = useSelector((state) => state.blockchain)
  const data = useSelector((state) => state.data)

  console.table(blockchain)
  console.log(data)

  const mintNFT = (_account, _name) => {
    blockchain.tamaToken.methods.createRandomTama(_name).send({ from: _account, value: 1000000000000000000 })
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
    <s.Screen>
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
                <>
                  <s.Container key={tama.id}>
                    <s.TextDescription>ID: {tama.id}</s.TextDescription>
                    <s.TextDescription>NAME: {tama.name}</s.TextDescription>
                    <s.TextDescription>DNA: {tama.dna}</s.TextDescription>
                    <s.TextDescription>LEVEL: {tama.level}</s.TextDescription>
                    <s.TextDescription>RARITY: {tama.rarity}</s.TextDescription>
                  </s.Container>
                  
                </>
              )
            })}
          </s.Container>
          
        </s.Container>
      
      )}
    </s.Screen>
  )
}

export default App
