import { Collections } from "../pocketbase-types";
import { pbClient } from "../client";

export const updateRecord = async <T extends Record<string, any>>(collection: Collections, id: string, data: Partial<T>) => pbClient
  .collection(collection)
  .update<T>(id, data);