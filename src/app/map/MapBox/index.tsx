"use client";

import "mapbox-gl/dist/mapbox-gl.css";

import {
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { match, P } from "ts-pattern";

import Filters from "./Filters";
import { flattenNumberArrays } from "@/utils/geoJson";
import { getMap } from "@/utils/indexedDB";
import { loadMapSource } from "./utils";
import mapboxgl from "mapbox-gl";
import { useSearchParams } from "next/navigation";

const getMarker = (count: number) => {
  const markerWrapper = document.createElement("div");

  const svgSize = (count < 10 ? 14 : count < 100 ? 16 : 19) * 4;
  const svgWidth = `${svgSize}px`;

  const circleSize = count > 99 ? 25 : svgSize / 2.5;

  let fontSize = 16;
  let imageWidth = 32;

  if (count >= 1000) {
    fontSize = 10;
    imageWidth = 55;
  } else if (count < 1000 && count > 100) {
    fontSize = 14;
    imageWidth = 45;
  }

  markerWrapper.innerHTML = `<div>
  <svg
  width="${svgWidth}"
  height="${svgWidth}"
  viewBox='0 0 55 55' // Changed to use numerical value for svgSize
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  style="cursor: pointer;"
  >
  <circle cx="27.2" cy="27.2" r="${circleSize}" fill="#4596C4" />
  <path
    d='M27.2,0C12.2,0,0,12.2,0,27.2s12.2,27.2,27.2,27.2s27.2-12.2,27.2-27.2S42.2,0,27.2,0z M6,27.2 C6,15.5,15.5,6,27.2,6s21.2,9.5,21.2,21.2c0,11.7-9.5,21.2-21.2,21.2S6,38.9,6,27.2z'
    fill='#0D3B66'
  >
  </path>
  <text dx="27" dy="32" text-anchor="middle" style="font-size: ${fontSize}px; fill: #FFFFFF; font-family: Arial, Verdana; font-weight: bold; pointer-events: none;">${count}</text>
  </svg>
</div>`;
  return markerWrapper.firstChild as HTMLElement;
};


type markersObject = { [id: string]: mapboxgl.Marker };

const updateMarkers = (map: mapboxgl.Map, markers: markersObject, markersOnScreen: markersObject) => {
  const newMarkers: markersObject = {};
  const features = map.querySourceFeatures("billboards");

  // for every cluster on the screen, create an HTML marker for it (if we didn't yet),
  // and add it to the map if it's not there already
  for (const feature of features) {
    match(feature)
      .with({ geometry: { type: "Point" } }, (f) => {
        const coords = f.geometry.coordinates;
        const props = f.properties;

        if (!props || !props.cluster) return;

        const id = props.cluster_id as string;

        let marker = markers[id];
        if (!marker) {
          marker = markers[id] = new mapboxgl.Marker({
            element: getMarker(props.point_count),
          }).setLngLat([coords[0], coords[1]]);

        }
        newMarkers[id] = marker;

        if (!markersOnScreen[id]) marker.addTo(map);
      });
  }
  // for every marker we've added previously, remove those that are no longer visible
  for (const id in markersOnScreen) {
    if (!newMarkers[id]) markersOnScreen[id].remove();
  }
  return newMarkers;
};

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY!;



const MapBox: FC = () => {
  const isMapInitialized = useRef(false);
  const [map, setMap] = useState<mapboxgl.Map>();

  const stateFromParams = useSearchParams().get("state");

  const initializeMap = (node: HTMLDivElement | null) => {

    if (node && !isMapInitialized.current) {
      isMapInitialized.current = true;
      const currentMap = new mapboxgl.Map({
        container: "map", // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: [-98.219147, 19.045243],
        bounds: [
          [-117.111511, 32.512078], // Southwest coordinates
          [-88.371277, 14.623451], // Northeast coordinates
        ],
      });
      currentMap.addControl(new mapboxgl.NavigationControl());

      currentMap.on("load", async () => {
        currentMap.removeLayer("admin-1-boundary");
        await loadMapSource("mexican_states", currentMap);
        await loadMapSource("billboards", currentMap, { cluster: true });


        setMap(currentMap);
      });

      const markers: markersObject = {};
      let markersOnScreen: markersObject = {};

      currentMap.on("render", () => {
        if (!currentMap.getSource("billboards")) return;

        const newMarkers = updateMarkers(currentMap, markers, markersOnScreen);
        markersOnScreen = newMarkers;
      });

      currentMap.on("click", "billboards-layer-transparent", (e) => {
        const features = currentMap.queryRenderedFeatures(e.point, {
          layers: ["billboards-layer-transparent"]
        });

        const [feature] = features;

        console.debug(feature);

        if (!feature?.properties || !feature.properties.cluster_id) return;

        const center: [number, number] = match(feature.geometry)
          .with({ type: "Point", coordinates: P.select() }, (coordinates) => [coordinates[0], coordinates[1]] as [number, number])
          .otherwise(() => [0, 0]);

        const clusterId = feature.properties.cluster_id;

        match(currentMap.getSource("billboards"))
          .with({ type: "geojson" }, (source) => source.getClusterExpansionZoom(
            clusterId,
            (err, zoom) => {
              if (err) return;

              currentMap.easeTo({
                center,
                zoom: zoom + 2
              });
            }
          ));
      });

      let hoveredPolygonId: string | number | undefined;

      currentMap.on("mousemove", "billboards-layer", (e) => {
        const { features } = e;
        if (!features) return;

        if (features.length > 0 && features[0].id) {

          hoveredPolygonId = features[0].id;

          if (hoveredPolygonId) {
            currentMap.setFeatureState(
              { source: "billboards", id: hoveredPolygonId },
              { hover: true }
            );
          }
        }
      });

      currentMap.on("mouseleave", "billboards-layer", () => {
        if (hoveredPolygonId !== null && hoveredPolygonId) {
          currentMap.setFeatureState(
            { source: "billboards", id: hoveredPolygonId },
            { hover: false }
          );
        }
        hoveredPolygonId = undefined;
      });
    };

  };

  useEffect(() => {
    match([map, stateFromParams])
      .with([P.nullish, P.any], () => { console.info("waiting for map"); })
      .with([P.not(P.nullish), P.string], async ([m, sfp]) => {
        if (m.getLayer("state-borders")) m.removeLayer("state-borders");

        m.addLayer({
          id: "state-borders",
          type: "fill",
          source: "mexican_states",
          layout: {},
          paint: {
            "fill-color": "#4596C4",
            "fill-opacity": 0.25,
          },
          // only if state_name is Puebla
          filter: ["==", "state_name", sfp],
        });

        m.addLayer({
          "id": "billboards-layer",
          "type": "circle",
          "source": "billboards",
          "filter": ["!=", "cluster", true],
          "paint": {
            "circle-color": "#E73936",
            "circle-radius": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              25,
              15
            ],
            "circle-opacity": [
              "case",
              ["boolean", ["feature-state", "hover"], false],
              1,
              0.5
            ]
          }
        });

        m.addLayer({
          "id": "billboards-layer-transparent",
          "type": "circle",
          "source": "billboards",
          "paint": {
            "circle-color": "#E73936",
            "circle-radius": 30,
            "circle-opacity": 0
          }
        });

        // based on the state, find boundaries and zoom to it
        let mexicoStates = await getMap("mexican_states");

        if (!mexicoStates) return;

        const selectedState = mexicoStates.features.find((feature) => feature.properties.state_name === sfp);

        match(selectedState?.geometry)
          .with({ type: P.union("Polygon", "MultiPolygon"), coordinates: P.select() }, (coordinates) => {
            const bounds = new mapboxgl.LngLatBounds();

            flattenNumberArrays(coordinates).forEach((coordinate) => {
              bounds.extend(coordinate);
            });

            m.fitBounds(bounds, { padding: 20 });
          });

      })
      .with([P.not(P.nullish), P.nullish], ([m]) => {
        if (m.getLayer("state-borders")) m.removeLayer("state-borders");
      })
      .exhaustive();

  }, [stateFromParams, map]);

  return (
    <div className="flex">
      <Filters
        initialState={stateFromParams || ""}
        initialMunicipality=""
        initialInterest=""
      />
      <div
        id="map"
        ref={initializeMap}
        className="w-screen h-screen [&>div>div>svg>circle:hover]:fill-[#0D3B66]"
      />
    </div>
  );
};

export default MapBox;