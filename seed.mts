import { faker } from '@faker-js/faker/locale/es_MX'
import mx from "./jsons/mx_states.json"
import billboards from "./jsons/billboards_low.json"
import { SnapletClient, MapGeojsonJsonField } from '@snaplet/seed';
// import { copycat } from "@snaplet/copycat"
// import inside from 'point-in-polygon'

// type PolygonsAndMultiPolygons = number[][][] | number[][][][]
// type Polygons = Exclude<PolygonsAndMultiPolygons, number[][][][]>

// const isMultiPolygon = (initial: PolygonsAndMultiPolygons): initial is number[][][][] => {
//   return initial.length > 0 && Array.isArray(initial[0][0][0]);
// }

// const allMexicanDots = mx.features.map(({ geometry }) => {
//   const { coordinates } = geometry;
//   if (isMultiPolygon(coordinates)) {
//     return coordinates.flat().flat();
//   } else {
//     return coordinates.flat();
//   }
// });

// This is a basic example generated by Snaplet to start you off, check out the docs for where to go from here
// * For more on getting started with @snaplet/seed: https://docs.snaplet.dev/getting-started/quick-start/seed
// * For a more detailed reference: https://docs.snaplet.dev/core-concepts/seed

const snaplet = new SnapletClient({
  dryRun: process.env.DRY !== '0',
});

// Clears all existing data in the database, but keep the structure
await snaplet.$resetDatabase()

// auth users
await snaplet.users([{
  instance_id: "00000000-0000-0000-0000-000000000000",
  id: "0a830161-2854-4b36-84a3-94ccf9184257",
  aud: "authenticated",
  role: "authenticated",
  email: "yosept.flores@gmail.com",
  encrypted_password: "$2a$10$NnBBS1xoBsI20zhGSZdhYuJuq4jSp1It7E7KdVrnlG2C.85ZLxYy6",
  email_confirmed_at: "2023-12-31 00:42:35.097475+00",
  invited_at: null,
  confirmation_token: "",
  confirmation_sent_at: null,
  recovery_token: "",
  recovery_sent_at: null,
  email_change: "",
  email_change_token_new: "",
  email_change_sent_at: null,
  last_sign_in_at: null,
  raw_app_meta_data: { "provider": "email", "providers": ["email"] },
  raw_user_meta_data: {},
  is_super_admin: null,
  created_at: "2023-12-31 00:42:35.093882+00",
  updated_at: "2023-12-31 00:42:35.097616+00",
  phone: null,
  phone_confirmed_at: null,
  phone_change: "",
  phone_change_token: "",
  email_change_token_current: "",
  email_change_confirm_status: 0,
  banned_until: null,
  reauthentication_token: "",
  reauthentication_sent_at: null,
  is_sso_user: false,
  deleted_at: null,
  phone_change_sent_at: null,
}])

const emptyNode = {
  deletedAt: null,
  updatedAt: null,
}

const statesAndIds = mx.features.map((f) => ({
  id: f.properties.id,
  name: f.properties.state_name,
  ...emptyNode
})
)

const billboardsAndIds = billboards.features.map((f) => ({
  id: f.properties.id,
  ...emptyNode
}))

// const generateRandomCoordinate = () => {
//   let point = { lat: 0, lng: 0 };
//   let isInside = false;

//   while (!isInside) {
//     // Generate a random latitude and longitude
//     const lat = faker.location.latitude({ precision: 13 })
//     const lng = faker.location.longitude({ precision: 13 })

//     // Check if the point is inside any of the polygons
//     for (const polygon of allMexicanDots) {
//       if (inside([lng, lat], polygon)) {
//         isInside = true;
//         point = { lat, lng };
//         break;
//       }
//     }
//   }

//   return point;
// }

// In case we need to regenerate the billboards
// const BILLBOARD_COUNT = 1200;

// const fakedBillboards = Array(BILLBOARD_COUNT).fill(0).map((_, i) => {
//   process.stdout.write(`Generating fake billboards: 0 / ${BILLBOARD_COUNT}`);

//   // write in the console the progress, each line deletes the previous one
//   // so that the console does not get saturated
//   process.stdout.clearLine(0);
//   process.stdout.cursorTo(0);
//   process.stdout.write(`Generating fake billboards: ${i} / ${BILLBOARD_COUNT}`);

//   const { lat, lng } = generateRandomCoordinate()

//   return {
//     "type": "Feature",
//     "properties": {
//       "id": copycat.uuid(lat + lng),
//     },
//     "geometry": {
//       "coordinates": [
//         lng,
//         lat
//       ],
//       "type": "Point"
//     }
//   }
// })

await snaplet.$pipe([
  snaplet.$merge([
    snaplet.Customer([{
      email: "yosept.flores@mail.com",
      name: "Joseph Flores",
      ...emptyNode,
    }]),
    snaplet.Customer(x => x(3, () => {
      const name = faker.person.fullName()
      return {
        email: faker.internet.email({ firstName: name.split(' ')[0], lastName: name.split(' ')[1] }),
        name,
        ...emptyNode,
      }
    }
    )),
  ]),
  snaplet.Map([
    { name: "billboards", geoJson: billboards as unknown as MapGeojsonJsonField.Default, deletedAt: null, updatedAt: null },
    { name: "mexican_states", geoJson: mx as unknown as MapGeojsonJsonField.Default, deletedAt: null, updatedAt: null },
  ], { autoConnect: true }),
  snaplet.Billboard(x => billboardsAndIds.map((bai) => ({
    ...bai,
    address: faker.location.streetAddress(),
    postCode: faker.location.zipCode(),
    name: faker.location.street(),
    Map: ({ store }) => {
      const map = store.Map.find(x => x.name === "billboards")
      if (!map) throw new Error("Map not found")
      return map
    },
  })), { autoConnect: true }),
  snaplet.Place(statesAndIds.map((sai) => ({
    ...sai,
    Map: ({ store }) => {
      const map = store.Map.find(x => x.name === "mexican_states")
      if (!map) throw new Error("Map not found")
      return map
    }
  })), { autoConnect: true }),
  snaplet.BillboardInPlace(x => x(15, () => emptyNode), { autoConnect: true }),
]);