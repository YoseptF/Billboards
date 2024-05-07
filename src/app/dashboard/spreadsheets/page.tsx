"use client";

import "./spreadsheet.css";

import { FC, useRef } from "react";
import {
  getCell,
  getColumn,
  RangeDirective,
  RangesDirective,
  SheetDirective,
  SheetsDirective,
  SpreadsheetComponent
} from "@syncfusion/ej2-react-spreadsheet";

import { Flex } from "@chakra-ui/react";
import { registerLicense } from "@syncfusion/ej2-base";
import supabase from "@/graphql/supabase";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

registerLicense("ORg4AjUWIQA/Gnt2UFhhQlJBfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hTX5WdkJjUHxdcHBTR2Jc");

interface Feature {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [number, number]
  },
  properties: {
    id: string
  }
}

const Spreadsheets: FC = () => {

  const params = useSearchParams();
  const mapIdFromParams = params.get("id");

  const { data: mapData } = useQuery({
    queryKey: ["map", mapIdFromParams],
    queryFn: async ({ queryKey }) => {
      const [, id] = queryKey;
      const { data } = await supabase.from("Map").select("geoJson, name").eq("id", id!).single();

      if (!data?.name) throw new Error("Map not found");

      return (data.geoJson as unknown as { features: Feature[] }).features;
    },
    enabled: !!mapIdFromParams,
  });

  const spreadsheetRef = useRef<SpreadsheetComponent>(null);

  if (!mapData) return null;

  const data = mapData.map(({ geometry: { coordinates }, properties: { id } }) => ({
    A: id,
    B: coordinates[0],
    C: coordinates[1],
  }));


  const fileMenuItemSelect = (args) => {
    let spreadsheet = spreadsheetRef.current;
    if (args.item.text === "Microsoft Excel" && spreadsheet) {
      args.cancel = true;
      spreadsheet.saveAsJson().then((response) => {
        let formData = new FormData();
        formData.append("JSONData", JSON.stringify(response.jsonObject.Workbook));
        formData.append("fileName", "Sample");
        formData.append("saveType", "Xlsx");
        fetch(
          "https://services.syncfusion.com/react/production/api/spreadsheet/save",
          {
            method: "POST",
            headers: { Authorization: "YOUR TEXT" },
            body: formData,
            mode: "no-cors"
          }
        ).then((response) => {
          response.blob().then((data) => {
            let anchor = createElement("a", {
              attrs: { download: "Sample.xlsx" },
            });
            const url = URL.createObjectURL(data);
            anchor.href = url;
            document.body.appendChild(anchor);
            anchor.click();
            URL.revokeObjectURL(url);
            document.body.removeChild(anchor);
          });
        });
      });
    }
  };

  const handleUpdate = async () => {
    const spreadsheet = spreadsheetRef.current;
    if (!spreadsheet) return;

    const sheet = spreadsheet.getActiveSheet();

    console.debug("sheet", sheet);

    if (!sheet.usedRange) return;

    const lastColumn = sheet.usedRange.colIndex;
    const lastRow = sheet.usedRange.rowIndex;

    if (!lastColumn || !lastRow) return;

    const activeColums = [];
    const column = getColumn(sheet, 1);

    console.debug("column", column);

    for (let i = 0; i <= lastColumn; i++) {
      for (let j = 0; j <= lastRow; j++) {
        let cell = getCell(j, i, sheet);
        console.debug("cell", cell);
        if (cell && cell.value) {
          activeColums.push(`${JSON.stringify(cell)},${cell.value}`);
          break;
        }
      }
    }
    console.log("activeColums", activeColums);
  };


  return (
    <Flex grow={1}>
      <SpreadsheetComponent
        ref={spreadsheetRef}
        allowSave
        actionBegin={handleUpdate}
      >
        <SheetsDirective>
          <SheetDirective>
            <RangesDirective>
              <RangeDirective dataSource={data}></RangeDirective>
            </RangesDirective>
          </SheetDirective>
        </SheetsDirective>
      </SpreadsheetComponent>
    </Flex>
  );
};

export default Spreadsheets;