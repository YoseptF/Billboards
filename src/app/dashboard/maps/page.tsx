"use client";

import "jsoneditor/dist/jsoneditor.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { Box, Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import mapboxgl, { GeoJSONSourceOptions } from "mapbox-gl";

import Script from "next/script";
import supabase from "@/graphql/supabase";
import { useSearchParams } from "next/navigation";

type clusterOption = Pick<GeoJSONSourceOptions, "cluster" | "clusterMaxZoom" | "clusterMinPoints" | "clusterRadius" | "clusterProperties">;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

type EnhancedGeoJSON = GeoJSON.FeatureCollection & { clusterOptions: clusterOption } & { layerOptions: mapboxgl.AnyLayer & { source: string } }

const Maps: FC = () => {
  const [isMapInitialized, setIsMapInitializedInternal] = useState(false);
  const isMapInitializedRef = useRef(isMapInitialized);

  const setIsMapInitialized: Dispatch<SetStateAction<boolean>> = (value) => {
    if(value instanceof Function) {
      setIsMapInitializedInternal((oldValue) => {
        isMapInitializedRef.current = oldValue;

        return value(oldValue);
      });
    } else {
      isMapInitializedRef.current = value;
      setIsMapInitializedInternal(value);
    }
  };

  const params = useSearchParams();
  const mapIdFromParams = params.get("id");

  useEffect(() => {
    const setJsonFromId = async () => {
      if (!mapIdFromParams) return;

      const { data } = await supabase.from("Map").select("geoJson, name").eq("id", mapIdFromParams).single();

      if (!data?.name) throw new Error("Map not found");

      const geoJson = data.geoJson as unknown as EnhancedGeoJSON;

      const initializeMap = (event: MessageEvent) => {
        const { type, map } = event.data;

        if (type !== "jsonUpdated" || isMapInitializedRef.current || !map) return;

        window.removeEventListener("message", initializeMap);

        setIsMapInitialized(true);

      };

      window.addEventListener("message", initializeMap);

      window.postMessage(
        {
          type: "setMap",
          map: geoJson,
        },
        "*"
      );

      do {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if(!isMapInitializedRef.current) {
          window.postMessage(
            {
              type: "setMap",
              map: geoJson,
            },
            "*"
          );
        }
      } while (!isMapInitializedRef.current);

    };

    setJsonFromId();
  }, [mapIdFromParams]);

  useEffect(() => {
    const handleJsonUpdated = async (event: MessageEvent) => {
      const { type, map } = event.data;

      if (type !== "jsonUpdated" || !map || !mapIdFromParams) return;

      await supabase.from("Map").update({ geoJson: map }).eq("id", mapIdFromParams).select("*");

    };

    if(isMapInitialized) {
      window.addEventListener("message", handleJsonUpdated);
    }


    return () => {
      window.removeEventListener("message", handleJsonUpdated, false);
    };
  }, [isMapInitialized, mapIdFromParams]);


  return (
    <Box h="100vh" w="100%">
      <div className="geojsonio flex flex-col h-full"></div>
      <Script src="/scripts/geojson.js" />
    </Box>
  );
};

export default Maps;