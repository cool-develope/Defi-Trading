import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import theme from "./theme";
import Layout from "./components/Layout";
import ConnectButton from "./components/ConnectButton";
import AccountModal from "./components/AccountModal";
import AccountPage from "./components/AccountPage";

import "@fontsource/inter";

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const accInfo = [
    {
      name : "Contract",
      address : "0x786d6b31860Da1589d60F2E5A1A4Fa72A5cCb627",
      tokens : [
        { name : "DAI", address : "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD" },
        { name : "aDAI", address : "0xdcf0af9e59c002fa3aa091a46196b37530fd48a8" }
      ]
    },
    {
      name : "User Wallet",
      address : "0xdf4DedE67d9A086ad7EDeC69886101bE8D2CEa35",
      tokens : [
        { name : "DAI", address : "0xFf795577d9AC8bD7D90Ee22b6C1703490b6512FD" },
        { name : "aDAI", address : "0xdcf0af9e59c002fa3aa091a46196b37530fd48a8" },
        //{ name : "ETH" }
      ]
    }
  ]

  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        <AccountPage accInfo={accInfo}/>
      </Layout>
    </ChakraProvider>
  );
}

export default App;
