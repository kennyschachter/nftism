import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectMetamask = async () => {
    console.log("connectMetamask");

    if (typeof window.ethereum == "undefined") {
        console.log("Please install MetaMask ")
        return;
    }
    try {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        let contractAddress;
        let Nftism

        if (contractAddress && Nftism && Nftism.abi) {
            let contract = new ethers.Contract(contractAddress, Nftism.abi, provider);
        }

    } catch (error) {
        console.log("error occured ", error)

    }
}