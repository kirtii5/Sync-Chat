import { UserButton } from "@clerk/clerk-react";
export default function Landing() {
  return (
    <>
      <h1>SYNC-CHAT</h1>
      <div>
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
}
