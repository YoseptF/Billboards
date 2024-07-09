"use client";

import { Collections, MapsResponse } from "@/lib/pocketbase/pocketbase-types";
import { mapsNames, MapType, saveMap } from "@/utils/indexedDB";

import { getRecord } from "@/lib/pocketbase/actions";
import { useEffect } from "react";

function isMap(data: any): asserts data is MapType {
  if (!("type" in data) || data.type !== "FeatureCollection") {
    throw new Error("Invalid Map data");
  }
}

export const useLoadMapSource = () => async (mapName: mapsNames, mapboxMap: mapboxgl.Map, options?: { cluster?: boolean }) => {
  try {
    const map = await getRecord<MapsResponse>(Collections.Maps, `name=${mapName}`);
    isMap(map.geojson);
    saveMap(mapName, map.geojson as MapType);
    mapboxMap.addSource(mapName, {
      type: "geojson",
      data: map.geojson,
      promoteId: "id",
      ...(options?.cluster && {
        cluster: true,
        clusterRadius: 50
      })
    });
  } catch {
    // handle error
  }

};