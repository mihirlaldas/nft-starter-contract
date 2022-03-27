const fs = require('fs');

const main = async () => {
  const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT')
  const nftContract = await nftContractFactory.deploy()
  await nftContract.deployed()
  console.log('Contract deployed to:', nftContract.address)

  /* this code writes the contract addresses to a local */
  /* file named config.js that we can use in the app */
  fs.writeFileSync('./config.js', `
  export const contractAddress = "${nftContract.address}"
  export const ownerAddress = "${nftContract.signer.address}"
  `)


  // Call the function.
  let txn = await nftContract.makeAnEpicNFT()
  // Wait for it to be mined.
  await txn.wait()
  console.log('Minted NFT #1')
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()
