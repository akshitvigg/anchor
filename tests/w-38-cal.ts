import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { W38Cal } from "../target/types/w_38_cal";
import { assert } from "chai";

describe("w-38-cal", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
  const newAccount = anchor.web3.Keypair.generate();

  const program = anchor.workspace.w38Cal as Program<W38Cal>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods
      .init(1)
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .signers([newAccount])
      .rpc();

    await program.methods
      .add(5)
      .accounts({
        signer: anchor.getProvider().wallet.publicKey,
        account: newAccount.publicKey,
      })
      .rpc();

    const account = await program.account.dataShape.fetch(newAccount.publicKey);
    assert(account.num == 6);
    console.log("Your transaction signature", tx);
  });
});
