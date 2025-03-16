import type React from "react";

export interface InputConfig {
  id: string;
  label: string;
  type?: string;
  state: React.Dispatch<React.SetStateAction<string>>;
}