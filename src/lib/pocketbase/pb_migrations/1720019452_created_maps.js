/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "sbhfywufkv8inwo",
    "created": "2024-07-03 15:10:52.411Z",
    "updated": "2024-07-03 15:10:52.411Z",
    "name": "maps",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wybhpout",
        "name": "name",
        "type": "text",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "jm89yfnk",
        "name": "geojson",
        "type": "json",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 2000000
        }
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_pyZ0hP7` ON `maps` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("sbhfywufkv8inwo");

  return dao.deleteCollection(collection);
})
