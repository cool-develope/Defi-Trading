import { useEffect, useState } from "react";
import styled from 'styled-components';
import { useEtherBalance } from "@usedapp/core";
import { formatEther } from "@ethersproject/units";
import { getBalance } from "../connectors/tokens";


const Text = styled.div({
  boxSizing: 'border-box',
  minWidth: 0,
  color: 'white'
})

const Box = styled.div({
  boxSizing: 'border-box',
  minWidth: 0,
  color: 'white',
  float: "left",
  margin: "10px",
})

type Props = {
  account : {
    name : string,
    address : string,
    tokens : any[]
  }
};

export default function AccountBox({ account }: Props) {
  const provider = "https://kovan.infura.io/v3/0db1e82f224a4fa5b282f92a37e96988";
  const etherBalance = useEtherBalance(account.address);
  console.log("etherBalance = ", etherBalance);

  const TokenBalance = (prop : any) => {
    const [balance, setBalance] = useState<any>();

    useEffect(() => {
      getBalance(provider, prop.token.address, account.address).then(val => setBalance(parseFloat(val).toFixed(3)));
    }, []);

    return (
      <div>
        <p>{prop.token.name} {balance}</p>
      </div>
    );
  }
  return (
    <Box>
      <p>{account.name}</p>
      <p>address = {account.address}</p>
      {account.tokens.map((token) =>  (
        <TokenBalance token={token} />
      ))}
      <p> {etherBalance && parseFloat(formatEther(etherBalance)).toFixed(3)} ETH </p>
    </Box>
  );
}