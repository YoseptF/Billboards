"use client";

console.info("----------------------- utils.ts");

import { getMap, mapsNames, MapType, saveMap } from "@/utils/indexedDB";

import supabase from "@/graphql/supabase";

export const loadMapSource = async (mapName: mapsNames, mapboxMap: mapboxgl.Map, options?: { cluster?: boolean }) => {
  // let map = await getMap(mapName);
  let map: MapType | undefined;

  if (!map) {
    const { data, error } = await supabase.from("Map").select("*").eq("name", mapName);

    if (error || !data) throw new Error(error.message);

    const [statesFromDB] = data;

    map = statesFromDB.geoJson as unknown as MapType;

    saveMap(mapName, statesFromDB.geoJson as unknown as MapType);
  }

  mapboxMap.addSource(mapName, {
    type: "geojson",
    data: map,
    promoteId: "id",
    ...(options?.cluster && {
      cluster: true,
      clusterRadius: 50
    })
  });
};