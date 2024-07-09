import { Collections } from "../pocketbase-types";
import { pbClient } from "../client";

export const getRecord = async <T extends Record<string, any>>(collection: Collections, selector: string) => pbClient
  .collection(collection)
  .getFirstListItem<T>(selector, { requestKey: null });