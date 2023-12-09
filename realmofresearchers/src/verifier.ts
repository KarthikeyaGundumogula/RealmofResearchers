import {
  OwnershipTransferred as OwnershipTransferredEvent,
  rewardClaimed as rewardClaimedEvent,
} from "../generated/Verifier/Verifier";
import { RewardClaim } from "../generated/schema";

export function handlerewardClaimed(event: rewardClaimedEvent): void {
  let claim = RewardClaim.load(
    event.params.paperId.toString() + event.params.supporter.toHexString()
  );
  if (claim == null) {
    claim = new RewardClaim(
      event.params.paperId.toString() + event.params.supporter.toHexString()
    );
    claim.paperID = event.params.paperId;
    claim.address = event.params.supporter;
    claim.amount = event.params.amount;
    claim.save();
  }
  let amount = claim.amount.plus(event.params.amount);
  claim.amount = amount;
  claim.save();
}
