import AccountBox from "./AccountBox";

type Props = {
	accInfo : any[]
};

export default function AccountPage({ accInfo }: Props) {
  console.log("AccountPage");
  return (
    <div>
      {accInfo.map((acc, i) => (
        <AccountBox account={acc} />
      ))}
    </div>
  );
}
