import { DBSchema, openDB } from "idb";

export const DB_NAME = "billboards:db";

export const VERSION = 1;

export const MAPS_STORE = "billboards:maps";

export const indexedDBStores = [MAPS_STORE] as const;

export type indexedDBStoresNames = typeof indexedDBStores[number];

export const maps = ["mexico_states"] as const;

export type mapsNames = typeof maps[number];

type Point = [number, number];

type Polygon = Point[];

type MultiPolygon = Polygon[];

export interface PointPolygon {
  type: "Polygon";
  coordinates: Polygon;
}

export interface MultiPointPolygon {
  type: "MultiPolygon";
  coordinates: MultiPolygon;
}

export interface PointPoint {
  type: "Point";
  coordinates: Point;
}

export type Geometry = PointPolygon | MultiPointPolygon | PointPoint;

export type MapType = {
  type: string;
  features: {
      type: "Feature";
      properties: {
          id: string;
          [key: string]: string | number;
      };
      geometry: Geometry;
  }[];
}

interface MyDB extends DBSchema {
  [MAPS_STORE]: {
    key: string;
    value: MapType;
  };
}

const getDb = openDB<MyDB>(DB_NAME, VERSION, {
  upgrade(db, oldVersion, newVersion, transaction, event) {
    db.createObjectStore(MAPS_STORE);
  },
  // blocked(currentVersion, blockedVersion, event) {

  // },
  // blocking(currentVersion, blockedVersion, event) {

  // },
  // terminated() {

  // },
});

export const getMap = async (mapName: mapsNames) => {
  const db = await getDb;
  return await db.get(MAPS_STORE, mapName);
};

export const saveMap = async (mapName: mapsNames, map: MapType) => {
  const db = await getDb;
  await db.put(MAPS_STORE, map, mapName);
};