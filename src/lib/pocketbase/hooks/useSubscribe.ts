import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { BaseSystemFields } from "../pocketbase-types";
import { pbClient } from "../client";
import { RecordModel } from "pocketbase";

type Action = "update" | "create" | "delete";

function isAction(action: string): asserts action is Action {
  if (!["update", "create", "delete"].includes(action)) {
    throw new Error(`Invalid actions:${action}`);
  }
}

const handleAction = <T extends BaseSystemFields<unknown>>(
  action: Action,
  data: T,
  setter: Dispatch<SetStateAction<T[]>>
) => {
  switch (action) {
  case "update":
    setter((c) => c.map((item) => item.id === data.id ? data : item));
    break;
  case "create":
    setter((c) => [
      data,
      ...c
    ]);
    break;
  case "delete":
    setter((c) => c.filter((item) => item.id !== data.id));
    break;
  default:
    throw new Error(`Invalid actions:${action}`);
  }
};

interface SubscribeArgs<T extends BaseSystemFields<unknown>> {
  id: T["collectionName"],
}

export const useSubscribe = <T extends BaseSystemFields<unknown>>({ id }: SubscribeArgs<T>) => {
  const [value, setValue] = useState<T[]>([]);

  useEffect(() => {
    const getAndSubscribe = async () => {
      try {
        const initialValue = await pbClient.collection(id).getFullList<T>();

        setValue(initialValue);

        pbClient.collection(id).subscribe<T>("*", (data) => {
          isAction(data.action);
          handleAction(
            data.action,
            data.record,
            setValue
          );
        });
      } catch (error) {
        // handle error
      }
    };

    getAndSubscribe();

    return () => {
      pbClient.collection(id).unsubscribe("*");
    };
  }, [id]);

  return value;
};
