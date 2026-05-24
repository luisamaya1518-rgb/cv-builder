import type { CVFormData, CVStyle } from "../types/cv.types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function generateCV(formData: CVFormData, style: CVStyle): Promise<string> {
  const response = await fetch(`${API_URL}/api/cv/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ formData, style }),
  });

  if (!response.ok) throw new Error("Error al generar el CV");
  const data = await response.json();
  return data.html;
}

export async function editCV(currentHTML: string, prompt: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/cv/edit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentHTML, prompt }),
  });

  if (!response.ok) throw new Error("Error al editar el CV");
  const data = await response.json();
  return data.html;
}