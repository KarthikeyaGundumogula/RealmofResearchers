import {
  ApprovalForAll as ApprovalForAllEvent,
  CratorRigistered as CratorRigisteredEvent,
  PaperMinted as PaperMintedEvent,
  SocialTokenBought as SocialTokenBoughtEvent,
  SocialTokenLaunched as SocialTokenLaunchedEvent,
  SocialTokenMinted as SocialTokenMintedEvent,
  TransferBatch as TransferBatchEvent,
  TransferSingle as TransferSingleEvent,
  URI as URIEvent,
  rewardClaimed as rewardClaimedEvent,
  subscribed as subscribedEvent
} from "../generated/Contract/Contract"
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
} from "../generated/schema"

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCratorRigistered(event: CratorRigisteredEvent): void {
  let entity = new CratorRigistered(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.creator = event.params.creator
  entity.URI = event.params.URI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaperMinted(event: PaperMintedEvent): void {
  let entity = new PaperMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.owner = event.params.owner
  entity.URI = event.params.URI
  entity.tokenId = event.params.tokenId
  entity.subscriptionFee = event.params.subscriptionFee
  entity.avgSuccessOnPublishing = event.params.avgSuccessOnPublishing

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSocialTokenBought(event: SocialTokenBoughtEvent): void {
  let entity = new SocialTokenBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.researcher = event.params.researcher
  entity.supporter = event.params.supporter
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSocialTokenLaunched(
  event: SocialTokenLaunchedEvent
): void {
  let entity = new SocialTokenLaunched(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.owner = event.params.owner
  entity.price = event.params.price
  entity.threshold = event.params.threshold
  entity.ownershipOnEntireTokenBatch = event.params.ownershipOnEntireTokenBatch

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSocialTokenMinted(event: SocialTokenMintedEvent): void {
  let entity = new SocialTokenMinted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Contract_id = event.params.id
  entity.owner = event.params.owner
  entity.amount = event.params.amount
  entity.URI = event.params.URI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferBatch(event: TransferBatchEvent): void {
  let entity = new TransferBatch(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.ids = event.params.ids
  entity.values = event.params.values

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransferSingle(event: TransferSingleEvent): void {
  let entity = new TransferSingle(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.operator = event.params.operator
  entity.from = event.params.from
  entity.to = event.params.to
  entity.Contract_id = event.params.id
  entity.value = event.params.value

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleURI(event: URIEvent): void {
  let entity = new URI(event.transaction.hash.concatI32(event.logIndex.toI32()))
  entity.value = event.params.value
  entity.Contract_id = event.params.id

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlerewardClaimed(event: rewardClaimedEvent): void {
  let entity = new rewardClaimed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.supporter = event.params.supporter
  entity.paperId = event.params.paperId
  entity.amount = event.params.amount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesubscribed(event: subscribedEvent): void {
  let entity = new subscribed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.subscriber = event.params.subscriber
  entity.paperId = event.params.paperId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
