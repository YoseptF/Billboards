"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";

import { Database } from "@/graphql/database.types";
import { FeatureCollection } from "geojson";
import { flattenNumberArrays } from "@/utils/geoJson";
import { getMap } from "@/utils/indexedDB";
import mapboxgl from "mapbox-gl";
import mexicoStates from "@/jsons/mx_states.json";
import supabase from "@/graphql/supabase";
import { useSearchParams } from "next/navigation";

type Place = Database["public"]["Tables"]["Place"]["Row"]

mapboxgl.accessToken = "pk.eyJ1IjoieW9zZXB0ZiIsImEiOiJjbHF1M3k4d2MwMnA5Mmp0ZDI0czRua285In0.go9lJpi8wXYMekmlMDooIg";


const MapBox: FC = () => {
  const isMapInitialized = useRef(false);
  const [map, setMap] = useState<mapboxgl.Map>();
  const stateRef = useRef<Place>();

  const stateFromParams = useSearchParams().get("state");

  console.debug("stateFromParams", stateFromParams);


  useEffect(() => {
    const fetchState = async () => {
      if (!stateFromParams) return;
      // get state names puebla
      const { data, error } = await supabase
        .from("Place")
        .select("*")
        .eq("name", stateFromParams);

      if (error) {
        console.error(error);
      } else {
        const state = data?.[0];
        if (state) {
          stateRef.current = state;
        }
      }
    };

    fetchState();

  }, [stateFromParams]);

  const initializeMap = (node: HTMLDivElement | null) => {

    if (node && !isMapInitialized.current) {
      isMapInitialized.current = true;
      const currentMap = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [-98.219147, 19.045243], // starting position [lng, lat]
        bounds: [
          [-117.111511,32.512078], // Southwest coordinates
          [-88.371277,14.623451], // Northeast coordinates
        ],
      });

      if (stateFromParams) {
        currentMap.on("load", async () => {

          const map = await getMap("mexico_states");

          console.debug("map", map);

          currentMap.addSource("mexicanStates", { type: "geojson", data: mexicoStates as FeatureCollection });

          currentMap.removeLayer("admin-1-boundary");

          mexicoStates.features;

          currentMap.addLayer({
            id: "state-borders",
            type: "fill",
            source: "mexicanStates",
            layout: {},
            paint: {
              "fill-color": "red",
              "fill-opacity": 0.25,
            },
            // only if state_name is Puebla
            filter: ["==", "state_name", stateFromParams],
          });

          // based on the state, find bounderies and zoom to it
          const geometry = mexicoStates.features.find((feature) => feature.properties.state_name === stateFromParams)?.geometry;
          if (!geometry) return;
          const bounds = new mapboxgl.LngLatBounds();

          flattenNumberArrays(geometry.coordinates).forEach((coordinate) => {
            bounds.extend(coordinate);
          });

          currentMap.fitBounds(bounds, { padding: 20 });

        });
        setMap(currentMap);
      }
    };

  };

  return (
    <div
      id="map"
      ref={initializeMap}
      className="w-screen h-screen"
    />
  );
};

export default MapBox;