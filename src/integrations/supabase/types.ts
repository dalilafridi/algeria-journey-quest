export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_log: {
        Row: {
          action: string
          actor_email_snapshot: string | null
          actor_user_id: string | null
          after_summary: Json | null
          before_summary: Json | null
          created_at: string
          entity_id: string | null
          entity_label: string | null
          entity_type: string | null
          id: string
          metadata: Json | null
        }
        Insert: {
          action: string
          actor_email_snapshot?: string | null
          actor_user_id?: string | null
          after_summary?: Json | null
          before_summary?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
        }
        Update: {
          action?: string
          actor_email_snapshot?: string | null
          actor_user_id?: string | null
          after_summary?: Json | null
          before_summary?: Json | null
          created_at?: string
          entity_id?: string | null
          entity_label?: string | null
          entity_type?: string | null
          id?: string
          metadata?: Json | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          preferred_language: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id: string
          preferred_language?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          preferred_language?: string
          updated_at?: string
        }
        Relationships: []
      }
      source_links: {
        Row: {
          content_id: string
          content_label: string
          content_type: string
          created_at: string
          created_by: string
          id: string
          public_route: string | null
          relationship_note: string | null
          source_id: string
        }
        Insert: {
          content_id: string
          content_label: string
          content_type: string
          created_at?: string
          created_by: string
          id?: string
          public_route?: string | null
          relationship_note?: string | null
          source_id: string
        }
        Update: {
          content_id?: string
          content_label?: string
          content_type?: string
          created_at?: string
          created_by?: string
          id?: string
          public_route?: string | null
          relationship_note?: string | null
          source_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "source_links_source_id_fkey"
            columns: ["source_id"]
            isOneToOne: false
            referencedRelation: "source_records"
            referencedColumns: ["id"]
          },
        ]
      }
      source_records: {
        Row: {
          accessed_date: string | null
          archive_or_institution: string | null
          archived_at: string | null
          author: string | null
          citation_text: string | null
          created_at: string
          created_by: string
          id: string
          identifier: string | null
          isbn: string | null
          language: string | null
          notes: string | null
          publication_date: string | null
          publication_year: number | null
          publisher: string | null
          reliability_tier: Database["public"]["Enums"]["reliability_tier"]
          rights_status: Database["public"]["Enums"]["rights_status"]
          source_type: Database["public"]["Enums"]["source_type"]
          status: Database["public"]["Enums"]["source_status"]
          title: string
          updated_at: string
          updated_by: string
          url: string | null
          verification_date: string | null
        }
        Insert: {
          accessed_date?: string | null
          archive_or_institution?: string | null
          archived_at?: string | null
          author?: string | null
          citation_text?: string | null
          created_at?: string
          created_by: string
          id?: string
          identifier?: string | null
          isbn?: string | null
          language?: string | null
          notes?: string | null
          publication_date?: string | null
          publication_year?: number | null
          publisher?: string | null
          reliability_tier?: Database["public"]["Enums"]["reliability_tier"]
          rights_status?: Database["public"]["Enums"]["rights_status"]
          source_type?: Database["public"]["Enums"]["source_type"]
          status?: Database["public"]["Enums"]["source_status"]
          title: string
          updated_at?: string
          updated_by: string
          url?: string | null
          verification_date?: string | null
        }
        Update: {
          accessed_date?: string | null
          archive_or_institution?: string | null
          archived_at?: string | null
          author?: string | null
          citation_text?: string | null
          created_at?: string
          created_by?: string
          id?: string
          identifier?: string | null
          isbn?: string | null
          language?: string | null
          notes?: string | null
          publication_date?: string | null
          publication_year?: number | null
          publisher?: string | null
          reliability_tier?: Database["public"]["Enums"]["reliability_tier"]
          rights_status?: Database["public"]["Enums"]["rights_status"]
          source_type?: Database["public"]["Enums"]["source_type"]
          status?: Database["public"]["Enums"]["source_status"]
          title?: string
          updated_at?: string
          updated_by?: string
          url?: string | null
          verification_date?: string | null
        }
        Relationships: []
      }
      studio_preferences: {
        Row: {
          sidebar_collapsed: boolean
          theme: string
          updated_at: string
          user_id: string
        }
        Insert: {
          sidebar_collapsed?: boolean
          theme?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          sidebar_collapsed?: boolean
          theme?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          assigned_at: string
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          assigned_at?: string
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      archive_source: { Args: { _id: string }; Returns: undefined }
      assign_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
      can_archive_sources: { Args: { _uid: string }; Returns: boolean }
      can_verify_sources: { Args: { _uid: string }; Returns: boolean }
      can_write_sources: { Args: { _uid: string }; Returns: boolean }
      create_source: { Args: { _payload: Json }; Returns: string }
      get_my_studio_roles: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"][]
      }
      has_any_studio_role: { Args: { _user_id: string }; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_studio_admin: { Args: { _user_id: string }; Returns: boolean }
      link_source_to_content: {
        Args: {
          _content_id: string
          _content_label: string
          _content_type: string
          _public_route: string
          _relationship_note: string
          _source_id: string
        }
        Returns: string
      }
      log_audit_event: {
        Args: {
          _action: string
          _after: Json
          _before: Json
          _entity_id: string
          _entity_label: string
          _entity_type: string
          _metadata: Json
        }
        Returns: string
      }
      restore_source: { Args: { _id: string }; Returns: undefined }
      revoke_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
      set_source_verification: {
        Args: { _id: string; _verification_date: string; _verified: boolean }
        Returns: undefined
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      unlink_source_from_content: {
        Args: { _link_id: string }
        Returns: undefined
      }
      update_my_profile: {
        Args: { _display_name: string; _preferred_language: string }
        Returns: undefined
      }
      update_source: {
        Args: { _id: string; _payload: Json }
        Returns: undefined
      }
    }
    Enums: {
      app_role:
        | "museum_director"
        | "senior_curator"
        | "curator"
        | "researcher"
        | "fact_checker"
        | "translator"
        | "translation_reviewer"
        | "media_curator"
        | "rights_manager"
        | "accessibility_reviewer"
        | "educator"
        | "publisher"
        | "technical_administrator"
      reliability_tier:
        | "primary"
        | "scholarly"
        | "institutional"
        | "reputable_secondary"
        | "contextual"
        | "unverified"
      rights_status:
        | "public_domain"
        | "licensed"
        | "permission_required"
        | "fair_use_review"
        | "unknown"
        | "not_applicable"
      source_status: "draft" | "verified" | "archived"
      source_type:
        | "primary_source"
        | "academic_book"
        | "academic_article"
        | "archive"
        | "museum_record"
        | "government_record"
        | "oral_history"
        | "interview"
        | "newspaper"
        | "map"
        | "photograph"
        | "film"
        | "audio"
        | "documentary"
        | "website"
        | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "museum_director",
        "senior_curator",
        "curator",
        "researcher",
        "fact_checker",
        "translator",
        "translation_reviewer",
        "media_curator",
        "rights_manager",
        "accessibility_reviewer",
        "educator",
        "publisher",
        "technical_administrator",
      ],
      reliability_tier: [
        "primary",
        "scholarly",
        "institutional",
        "reputable_secondary",
        "contextual",
        "unverified",
      ],
      rights_status: [
        "public_domain",
        "licensed",
        "permission_required",
        "fair_use_review",
        "unknown",
        "not_applicable",
      ],
      source_status: ["draft", "verified", "archived"],
      source_type: [
        "primary_source",
        "academic_book",
        "academic_article",
        "archive",
        "museum_record",
        "government_record",
        "oral_history",
        "interview",
        "newspaper",
        "map",
        "photograph",
        "film",
        "audio",
        "documentary",
        "website",
        "other",
      ],
    },
  },
} as const
