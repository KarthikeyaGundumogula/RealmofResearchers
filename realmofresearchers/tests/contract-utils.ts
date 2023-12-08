import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ApprovalForAll,
  CratorRigistered,
  PaperMinted,
  SocialTokenBought,
  SocialTokenLaunched,
  SocialTokenMinted,
  TransferBatch,
  TransferSingle,
  URI,
  rewardClaimed,
  subscribed
} from "../generated/Contract/Contract"

export function createApprovalForAllEvent(
  account: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createCratorRigisteredEvent(
  id: BigInt,
  creator: Address,
  URI: string
): CratorRigistered {
  let cratorRigisteredEvent = changetype<CratorRigistered>(newMockEvent())

  cratorRigisteredEvent.parameters = new Array()

  cratorRigisteredEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  cratorRigisteredEvent.parameters.push(
    new ethereum.EventParam("creator", ethereum.Value.fromAddress(creator))
  )
  cratorRigisteredEvent.parameters.push(
    new ethereum.EventParam("URI", ethereum.Value.fromString(URI))
  )

  return cratorRigisteredEvent
}

export function createPaperMintedEvent(
  id: BigInt,
  owner: Address,
  URI: string,
  tokenId: BigInt,
  subscriptionFee: BigInt,
  avgSuccessOnPublishing: BigInt
): PaperMinted {
  let paperMintedEvent = changetype<PaperMinted>(newMockEvent())

  paperMintedEvent.parameters = new Array()

  paperMintedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  paperMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  paperMintedEvent.parameters.push(
    new ethereum.EventParam("URI", ethereum.Value.fromString(URI))
  )
  paperMintedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  paperMintedEvent.parameters.push(
    new ethereum.EventParam(
      "subscriptionFee",
      ethereum.Value.fromUnsignedBigInt(subscriptionFee)
    )
  )
  paperMintedEvent.parameters.push(
    new ethereum.EventParam(
      "avgSuccessOnPublishing",
      ethereum.Value.fromUnsignedBigInt(avgSuccessOnPublishing)
    )
  )

  return paperMintedEvent
}

export function createSocialTokenBoughtEvent(
  id: BigInt,
  researcher: Address,
  supporter: Address,
  amount: BigInt
): SocialTokenBought {
  let socialTokenBoughtEvent = changetype<SocialTokenBought>(newMockEvent())

  socialTokenBoughtEvent.parameters = new Array()

  socialTokenBoughtEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  socialTokenBoughtEvent.parameters.push(
    new ethereum.EventParam(
      "researcher",
      ethereum.Value.fromAddress(researcher)
    )
  )
  socialTokenBoughtEvent.parameters.push(
    new ethereum.EventParam("supporter", ethereum.Value.fromAddress(supporter))
  )
  socialTokenBoughtEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return socialTokenBoughtEvent
}

export function createSocialTokenLaunchedEvent(
  id: BigInt,
  owner: Address,
  price: BigInt,
  threshold: BigInt,
  ownershipOnEntireTokenBatch: BigInt
): SocialTokenLaunched {
  let socialTokenLaunchedEvent = changetype<SocialTokenLaunched>(newMockEvent())

  socialTokenLaunchedEvent.parameters = new Array()

  socialTokenLaunchedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  socialTokenLaunchedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  socialTokenLaunchedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  socialTokenLaunchedEvent.parameters.push(
    new ethereum.EventParam(
      "threshold",
      ethereum.Value.fromUnsignedBigInt(threshold)
    )
  )
  socialTokenLaunchedEvent.parameters.push(
    new ethereum.EventParam(
      "ownershipOnEntireTokenBatch",
      ethereum.Value.fromUnsignedBigInt(ownershipOnEntireTokenBatch)
    )
  )

  return socialTokenLaunchedEvent
}

export function createSocialTokenMintedEvent(
  id: BigInt,
  owner: Address,
  amount: BigInt,
  URI: string
): SocialTokenMinted {
  let socialTokenMintedEvent = changetype<SocialTokenMinted>(newMockEvent())

  socialTokenMintedEvent.parameters = new Array()

  socialTokenMintedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  socialTokenMintedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  socialTokenMintedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  socialTokenMintedEvent.parameters.push(
    new ethereum.EventParam("URI", ethereum.Value.fromString(URI))
  )

  return socialTokenMintedEvent
}

export function createTransferBatchEvent(
  operator: Address,
  from: Address,
  to: Address,
  ids: Array<BigInt>,
  values: Array<BigInt>
): TransferBatch {
  let transferBatchEvent = changetype<TransferBatch>(newMockEvent())

  transferBatchEvent.parameters = new Array()

  transferBatchEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam("ids", ethereum.Value.fromUnsignedBigIntArray(ids))
  )
  transferBatchEvent.parameters.push(
    new ethereum.EventParam(
      "values",
      ethereum.Value.fromUnsignedBigIntArray(values)
    )
  )

  return transferBatchEvent
}

export function createTransferSingleEvent(
  operator: Address,
  from: Address,
  to: Address,
  id: BigInt,
  value: BigInt
): TransferSingle {
  let transferSingleEvent = changetype<TransferSingle>(newMockEvent())

  transferSingleEvent.parameters = new Array()

  transferSingleEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  transferSingleEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromUnsignedBigInt(value))
  )

  return transferSingleEvent
}

export function createURIEvent(value: string, id: BigInt): URI {
  let uriEvent = changetype<URI>(newMockEvent())

  uriEvent.parameters = new Array()

  uriEvent.parameters.push(
    new ethereum.EventParam("value", ethereum.Value.fromString(value))
  )
  uriEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )

  return uriEvent
}

export function createrewardClaimedEvent(
  supporter: Address,
  paperId: BigInt,
  amount: BigInt
): rewardClaimed {
  let rewardClaimedEvent = changetype<rewardClaimed>(newMockEvent())

  rewardClaimedEvent.parameters = new Array()

  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("supporter", ethereum.Value.fromAddress(supporter))
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam(
      "paperId",
      ethereum.Value.fromUnsignedBigInt(paperId)
    )
  )
  rewardClaimedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardClaimedEvent
}

export function createsubscribedEvent(
  subscriber: Address,
  paperId: BigInt
): subscribed {
  let subscribedEvent = changetype<subscribed>(newMockEvent())

  subscribedEvent.parameters = new Array()

  subscribedEvent.parameters.push(
    new ethereum.EventParam(
      "subscriber",
      ethereum.Value.fromAddress(subscriber)
    )
  )
  subscribedEvent.parameters.push(
    new ethereum.EventParam(
      "paperId",
      ethereum.Value.fromUnsignedBigInt(paperId)
    )
  )

  return subscribedEvent
}
