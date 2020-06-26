import { ShopActionTypes } from "./shop.types";

export const updateCollections = (collectionToUpdate) => ({
  type: ShopActionTypes.UPDATE_COLLECTIONS,
  payload: collectionToUpdate,
});
