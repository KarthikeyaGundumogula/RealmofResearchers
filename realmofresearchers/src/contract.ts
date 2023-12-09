import { BigInt } from "@graphprotocol/graph-ts";
import {
  CratorRigistered as CratorRigisteredEvent,
  PaperMinted as PaperMintedEvent,
  SocialTokenBought as SocialTokenBoughtEvent,
  SocialTokenLaunched as SocialTokenLaunchedEvent,
  SocialTokenMinted as SocialTokenMintedEvent,
  rewardClaimed as rewardClaimedEvent,
  subscribed as subscribedEvent,
} from "../generated/Contract/Contract";
import {
  Creator,
  ResearchPaper,
  SocialToken,
  Supporter,
  Subscriber,
} from "../generated/schema";

export function handleCratorRigistered(event: CratorRigisteredEvent): void {
  let creator = new Creator(event.params.creator.toHexString());
  creator.tokenID = event.params.id;
  creator.URI = event.params.URI;
  creator.creator = event.params.creator;
  creator.noOfPaper = BigInt.fromI32(0);
  creator.avgSuccessinOnTimePublishing = BigInt.fromI32(0);
  creator.avgNoOfSubscribers = BigInt.fromI32(0);
  creator.blockNumber = event.block.number;
  creator.blockTimestamp = event.block.timestamp;
  creator.transactionHash = event.transaction.hash;
  creator.save();
}

export function handleSocialTokenMinted(event: SocialTokenMintedEvent): void {
  let socialToken = new SocialToken(event.params.id.toString());
  socialToken.tokenID = event.params.id;
  socialToken.URI = event.params.URI;
  socialToken.creator = event.params.owner;
  socialToken.price = BigInt.fromI32(0);
  socialToken.isLaunched = false;
  socialToken.totalAmountMinted = event.params.amount;
  socialToken.availbleAmount = BigInt.fromI32(0);
  socialToken.thresholdAmount = BigInt.fromI32(0);
  socialToken.ownershipOnEntireTokenBatch = BigInt.fromI32(0);
  socialToken.blockNumber = event.block.number;
  socialToken.blockTimestamp = event.block.timestamp;
  socialToken.transactionHash = event.transaction.hash;
  socialToken.save();
}

export function handleSocialTokenLaunched(
  event: SocialTokenLaunchedEvent
): void {
  let socialToken = SocialToken.load(event.params.id.toString());
  if (socialToken != null) {
    socialToken.isLaunched = true;
    socialToken.price = event.params.price;
    socialToken.thresholdAmount = event.params.threshold;
    socialToken.ownershipOnEntireTokenBatch =
      event.params.ownershipOnEntireTokenBatch;
    socialToken.save();
  }
}

export function handleSocialTokenBought(event: SocialTokenBoughtEvent): void {
  let supporter = new Supporter(event.params.id.toString());
  supporter.supporter = event.params.supporter;
  supporter.socialTokenId = event.params.id;
  supporter.amount = event.params.amount;
  supporter.paperID = BigInt.fromI32(0);
  supporter.blockNumber = event.block.number;
  supporter.blockTimestamp = event.block.timestamp;
  supporter.transactionHash = event.transaction.hash;
  supporter.save();
}

export function handlePaperMinted(event: PaperMintedEvent): void {
  let paper = new ResearchPaper(event.params.id.toString());
  paper.paperID = event.params.id;
  paper.URI = event.params.URI;
  paper.researcher = event.params.owner;
  paper.socialTokenId = event.params.tokenId;
  paper.subscriptionPrice = event.params.subscriptionFee;
  paper.totalTressury = BigInt.fromI32(0);
  paper.unClaimedTressury = BigInt.fromI32(0);
  paper.noOfSubscribers = BigInt.fromI32(0);
  paper.save();

  let socialToken = SocialToken.load(event.params.tokenId.toString());
  if (socialToken != null) {
    socialToken.paperID = event.params.id;
    let supporter = Supporter.load(
      event.params.owner.toString() + event.params.tokenId.toString()
    );
    if (supporter != null) {
      supporter.paperID = event.params.id;
    }
    socialToken.save();
  }
}

export function handlerewardClaimed(event: rewardClaimedEvent): void {}

export function handlesubscribed(event: subscribedEvent): void {
  let subscriber = Subscriber.load(event.params.subscriber.toString());
  if (subscriber == null) {
    subscriber = new Subscriber(event.params.subscriber.toString());
    subscriber.paperIDs = new Array<BigInt>();
    subscriber.subscriber = event.params.subscriber;
  }
  subscriber.paperIDs.push(event.params.paperId);
  subscriber.save();
}
