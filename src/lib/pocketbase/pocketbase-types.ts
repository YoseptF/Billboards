/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Billboards = "billboards",
	Maps = "maps",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum BillboardsSocioEconomicLevelOptions {
	"low" = "low",
	"medium" = "medium",
	"high" = "high",
}

export enum BillboardsTrafficLevelOptions {
	"low" = "low",
	"medium" = "medium",
	"high" = "high",
}

export enum BillboardsKindOptions {
	"Billboard" = "Billboard",
	"Print" = "Print",
	"Tunnel" = "Tunnel",
	"Wall" = "Wall",
}
export type BillboardsRecord = {
	city?: string
	cost?: number
	isBestChoice?: boolean
	isPolitic?: boolean
	isPopular?: boolean
	kind?: BillboardsKindOptions
	latitude: number
	longitud: number
	name: string
	owner?: RecordIdString
	sizeX?: number
	sizeY?: number
	socioEconomicLevel?: BillboardsSocioEconomicLevelOptions
	state: string
	trafficLevel?: BillboardsTrafficLevelOptions
	visits?: number
}

export type MapsRecord<Tgeojson = unknown> = {
	geojson: null | Tgeojson
	name: string
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type BillboardsResponse<Texpand = unknown> = Required<BillboardsRecord> & BaseSystemFields<Texpand>
export type MapsResponse<Tgeojson = unknown, Texpand = unknown> = Required<MapsRecord<Tgeojson>> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	billboards: BillboardsRecord
	maps: MapsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	billboards: BillboardsResponse
	maps: MapsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'billboards'): RecordService<BillboardsResponse>
	collection(idOrName: 'maps'): RecordService<MapsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
