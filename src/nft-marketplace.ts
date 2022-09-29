import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  // changing names for better understanding
  ItemBought as ItemBoughtEvent,
  ItemCanceled as ItemCanceledEvent,
  ItemListed as ItemListedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ItemListed,
  ItemBought,
  ItemCanceled,
  ActiveItem,
} from "../generated/schema";

// REVIEW \\ ItemListedEvent : Just the raw event
// REVIEW \\ ItemListedtObject : What we save
// NOTE \\ We have to create a ItemListedtObject from ItemListedEvent.
// NOTE \\ And In typescript this both are of different types and we're gonna have to import ItemListedtObject from schema.ts (generated file)

// SECTION Whenever ItemListed event emits, run this function
export function handleItemListed(event: ItemListedEvent): void {
  // TODO \\ Things, we're gonna have to do when this Event fires
  // 1. Save that event this in our graph
  // 2. update the ActiveItem
  // 3. get or create an itemListed object
  // NOTE \\ Remember that each item needs a unique ID.

  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemListed.seller = event.params.seller;
  activeItem.seller = event.params.seller;

  itemListed.nftAddress = event.params.nftAddress;
  activeItem.nftAddress = event.params.nftAddress;

  itemListed.tokenId = event.params.tokenId;
  activeItem.tokenId = event.params.tokenId;

  itemListed.price = event.params.price;
  activeItem.price = event.params.price;

  // REVIEW \\ An Empty Address means item is available
  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();

  // ANSWER \\ So, this is how we'll update ItemListedtObject and ActiveItem
}

// SECTION Whenever ItemCanceled event emits, run this function
export function handleItemCanceled(event: ItemCanceledEvent): void {
  // TODO \\ Things, we're gonna have to do when this Event fires

  let itemCanceled = ItemCanceled.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemCanceled) {
    itemCanceled = new ItemCanceled(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemCanceled.seller = event.params.seller;
  itemCanceled.nftAddress = event.params.nftAddress;
  itemCanceled.tokenId = event.params.tokenId;

  // NOTE \\ this is how we're gonna decide if an Item is still on the marketplace of not / bought or not.
  // REVIEW \\ An Dead Address means item is not available
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD" // this is known as DEAD address
  );

  itemCanceled.save();
  activeItem!.save();
}

// SECTION Whenever ItemBought event emits, run this function
export function handleItemBought(event: ItemBoughtEvent): void {
  // TODO \\ Things, we're gonna have to do when this Event fires

  // Load ItemBought with it's unique ID
  let itemBought = ItemBought.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  // NOTE \\ it doesn't matter if Eventhough 'itemBought' and 'activeItem' have the same ID, Since their types are different.
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  if (!itemBought) {
    // if there's no ItemBought then create one and give the ID
    itemBought = new ItemBought(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }
  itemBought.buyer = event.params.buyer;
  itemBought.nftAddress = event.params.nftAddress;
  itemBought.tokenId = event.params.tokenId;

  // SINCE activeItem already have nftAddress and tokenId becoz of ItemListed, we just have to update the buyer in activeitem
  // (activeItem! = means we must have a activeItem)
  activeItem!.buyer = event.params.buyer;

  // Now Save it!
  itemBought.save();
  activeItem!.save();
}

// SECTION Function to get a unique ID
// In Typescript, We're gonna have to define the types of Params
// :string => its what we want in return
function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
