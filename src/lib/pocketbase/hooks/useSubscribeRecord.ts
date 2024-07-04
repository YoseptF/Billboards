import { useEffect, useState } from "react";

import { BaseSystemFields } from "../pocketbase-types";
import { pbClient } from "../client";

interface SubscribeRecordArgs<T extends BaseSystemFields<unknown>> {
  collectionName: T["collectionName"],
  id: string
}

export const useSubscribeRecord = <T extends BaseSystemFields<unknown>>({ id, collectionName }: SubscribeRecordArgs<T>) => {
  const [value, setValue] = useState<T>();

  useEffect(() => {
    const getAndSubscribe = async () => {
      try {
        const initialValue = await pbClient.collection(collectionName).getOne<T>(id);

        setValue(initialValue);

        pbClient.collection(collectionName).subscribe<T>(id, (data) => {
          setValue(data.record);
        });
      } catch (error) {
        // handle error
      }
    };

    getAndSubscribe();

    return () => {
      pbClient.collection(collectionName).unsubscribe("*");
    };
  }, [id, collectionName]);

  return value;
};
