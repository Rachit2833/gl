"use server";

export async function uploadFile(formData) {
  try {
    const res = await fetch("http://localhost:2833/upload", {
      method: "POST",
      body: formData,
    });
    if (!res.ok) {
      throw new Error(`Failed to upload file: ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Upload error:", error);
    return { success: false, message: error.message };
  }
}
