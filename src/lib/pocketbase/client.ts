import { checkEnv } from "@/utils";
import PocketBase from "pocketbase";
import { TypedPocketBase } from "./pocketbase-types";

const NEXT_PUBLIC_POCKETBASE_URL = process.env.NEXT_PUBLIC_POCKETBASE_URL;

checkEnv(NEXT_PUBLIC_POCKETBASE_URL);

export const pbClient = new PocketBase(NEXT_PUBLIC_POCKETBASE_URL) as TypedPocketBase;