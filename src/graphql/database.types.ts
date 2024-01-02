export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      Billboard: {
        Row: {
          address: string | null
          createdAt: string
          customerId: string | null
          deletedAt: string | null
          id: string
          mapId: string | null
          name: string | null
          postCode: string | null
          updatedAt: string | null
        }
        Insert: {
          address?: string | null
          createdAt?: string
          customerId?: string | null
          deletedAt?: string | null
          id: string
          mapId?: string | null
          name?: string | null
          postCode?: string | null
          updatedAt?: string | null
        }
        Update: {
          address?: string | null
          createdAt?: string
          customerId?: string | null
          deletedAt?: string | null
          id?: string
          mapId?: string | null
          name?: string | null
          postCode?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Billboard_customerId_fkey"
            columns: ["customerId"]
            isOneToOne: false
            referencedRelation: "Customer"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Billboard_mapId_fkey"
            columns: ["mapId"]
            isOneToOne: false
            referencedRelation: "Map"
            referencedColumns: ["id"]
          }
        ]
      }
      BillboardInPlace: {
        Row: {
          billboardId: string | null
          createdAt: string
          deletedAt: string | null
          id: string
          placeId: string | null
          updatedAt: string | null
        }
        Insert: {
          billboardId?: string | null
          createdAt?: string
          deletedAt?: string | null
          id: string
          placeId?: string | null
          updatedAt?: string | null
        }
        Update: {
          billboardId?: string | null
          createdAt?: string
          deletedAt?: string | null
          id?: string
          placeId?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "BillboardInPlace_billboardId_fkey"
            columns: ["billboardId"]
            isOneToOne: false
            referencedRelation: "Billboard"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "BillboardInPlace_placeId_fkey"
            columns: ["placeId"]
            isOneToOne: false
            referencedRelation: "Place"
            referencedColumns: ["id"]
          }
        ]
      }
      Customer: {
        Row: {
          createdAt: string
          deletedAt: string | null
          email: string
          id: string
          name: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          email: string
          id: string
          name?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          email?: string
          id?: string
          name?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      Map: {
        Row: {
          createdAt: string
          deletedAt: string | null
          geoJson: Json
          id: string
          name: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          geoJson: Json
          id: string
          name?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          geoJson?: Json
          id?: string
          name?: string | null
          updatedAt?: string | null
        }
        Relationships: []
      }
      Place: {
        Row: {
          createdAt: string
          deletedAt: string | null
          id: string
          mapId: string | null
          name: string | null
          updatedAt: string | null
        }
        Insert: {
          createdAt?: string
          deletedAt?: string | null
          id: string
          mapId?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Update: {
          createdAt?: string
          deletedAt?: string | null
          id?: string
          mapId?: string | null
          name?: string | null
          updatedAt?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "Place_mapId_fkey"
            columns: ["mapId"]
            isOneToOne: false
            referencedRelation: "Map"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: unknown
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

