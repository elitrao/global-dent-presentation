import type { ComponentType } from "react";

export type SlideId =
  | "slide-1"
  | "slide-2"
  | "slide-3"
  | "slide-4"
  | "slide-5"
  | "slide-6"
  | "slide-7"
  | "slide-8"
  | "slide-9";

export type DetailPanelId = "inventory" | "candidates" | "investment";

export interface DetailGroup {
  title: string;
  owner?: string;
  items: string[];
}

export interface DetailPanelContent {
  id: DetailPanelId;
  title: string;
  intro: string;
  groups: DetailGroup[];
  note?: string;
}

export interface SlideProps {
  openPanel: (id: DetailPanelId) => void;
}

export interface SlideDefinition {
  id: SlideId;
  title: string;
  component: ComponentType<SlideProps>;
}
