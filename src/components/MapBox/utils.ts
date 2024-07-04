"use client";

import { Collections, MapsResponse } from "@/lib/pocketbase/pocketbase-types";
import { mapsNames, MapType, saveMap } from "@/utils/indexedDB";

import { useEffect } from "react";
import { useSubscribeRecord } from "@/lib/pocketbase/hooks";

function isMap(data: any): asserts data is MapType {
  if (!("type" in data) || data.type !== "FeatureCollection") {
    throw new Error("Invalid Map data");
  }
}

export const useLoadMapSource = async (mapName: mapsNames, mapboxMap: mapboxgl.Map, options?: { cluster?: boolean }) => {
  const map = useSubscribeRecord<MapsResponse>({ collectionName: Collections.Maps, id: mapName });

  useEffect(() => {
    if (!map) {
      // const { data, error } = await supabase.from("Map").select("*").eq("name", mapName);

      // if (error || !data) throw new Error(error.message);

      // const [statesFromDB] = data;

      // map = statesFromDB.geoJson as unknown as MapType;

      // saveMap(mapName, statesFromDB.geoJson as unknown as MapType);
      return;
    }

    isMap(map.geojson);

    mapboxMap.addSource(mapName, {
      type: "geojson",
      data: map.geojson,
      promoteId: "id",
      ...(options?.cluster && {
        cluster: true,
        clusterRadius: 50
      })
    });
  }, [map, mapName, mapboxMap, options]);
};