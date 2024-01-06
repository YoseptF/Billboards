"use client";

import "jsoneditor/dist/jsoneditor.min.css";
import "mapbox-gl/dist/mapbox-gl.css";

import { Box, Flex } from "@chakra-ui/react";
import { Dispatch, FC, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import JSONEditor, { JSONEditorOptions, JSONPath } from "jsoneditor";
import mapboxgl, { GeoJSONSourceOptions } from "mapbox-gl";
import { useRouter, useSearchParams } from "next/navigation";

import cloneDeep from "lodash/cloneDeep";
import debounce from "lodash/debounce";
import flatMapDeep from "lodash/flatMapDeep";
import isObject from "lodash/isObject";
import Script from "next/script";
import supabase from "@/graphql/supabase";
import uniq from "lodash/uniq";

type NestedOptions = { [key: string]: object | string[] }

const autoFillOptions: NestedOptions = {
  layerOptions: {
    type: ["circle", "fill", "line"],
    paint: {
      "circle-color": ["#FF0000", "#00FF00", "#0000FF"],
      "circle-opacity": [0.1, 0.5, 1],
      "circle-radius": [1, 5, 10],
      "circle-stroke-color": ["#FF0000", "#00FF00", "#0000FF"],
      "circle-stroke-opacity": [0.1, 0.5, 1],
      "circle-stroke-width": [1, 5, 10],
      "fill-color": ["#FF0000", "#00FF00", "#0000FF"],
      "fill-opacity": [0.1, 0.5, 1],
      "fill-outline-color": ["#FF0000", "#00FF00", "#0000FF"],
      "line-color": ["#FF0000", "#00FF00", "#0000FF"],
      "line-opacity": [0.1, 0.5, 1],
      "line-width": [1, 5, 10],
      "line-offset": [1, 5, 10],
      "line-blur": [1, 5, 10],
      "line-dasharray": [[1, 2], [3, 4], [5, 6]],
      "line-pattern": ["pattern1", "pattern2", "pattern3"],
      "line-gradient": ["#FF0000", "#00FF00", "#0000FF"],
    },
  },
  clusterOptions: {
    cluster: [true, false],
    clusterMaxZoom: [14, 15, 16],
    clusterMinPoints: [1, 2, 3],
    clusterRadius: [50, 60, 80],
    clusterProperties: {
      "cluster_count": [1],
      "cluster_id": [1],
      "point_count": [1],
      "point_count_abbreviated": [1]
    },
  },
};


const getAutofillOptions = (path: JSONPath) => {
  let allOptions = cloneDeep(autoFillOptions);

  let options: string[] = [];

  path.forEach((p) => {
    if (allOptions[p] instanceof Array) options = allOptions[p] as string[];

    allOptions = allOptions[p] as NestedOptions;
  });

  return options;
};

type clusterOption = Pick<GeoJSONSourceOptions, "cluster" | "clusterMaxZoom" | "clusterMinPoints" | "clusterRadius" | "clusterProperties">;

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;

type EnhancedGeoJSON = GeoJSON.FeatureCollection & { clusterOptions: clusterOption } & { layerOptions: mapboxgl.AnyLayer & { source: string } }

const Maps: FC = () => {
  const params = useSearchParams();
  const mapIdFromParams = params.get("id");

  useEffect(() => {
    const setJsonFromId = async () => {
      if (!mapIdFromParams) return;

      const { data } = await supabase.from("Map").select("geoJson, name").eq("id", mapIdFromParams).single();

      if (!data?.name) throw new Error("Map not found");

      const geoJson = data.geoJson as unknown as EnhancedGeoJSON;

      window.postMessage(
        {
          type: "setMap",
          map: geoJson,
        },
        "*"
      );

    };

    setJsonFromId();
  }, [mapIdFromParams]);


  return (
    <Box h="100vh" w="100%">
      <div className="geojsonio flex flex-col h-full"></div>
      <Script src="/scripts/geojson.js" />
    </Box>
  );
};

export default Maps;