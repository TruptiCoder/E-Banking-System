import apiClient from "./apiClient";
 
// POST generate and download a statement (PDF or CSV)
export async function generateStatementAPI(payload) {
  const res = await apiClient.post("/api/statements/generate", payload, {
    responseType: "blob",   // tell axios to treat response as a file
  });
 
  // Create a temporary download link and trigger it
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  const format = (payload.format ?? "pdf").toLowerCase();
  link.setAttribute("download", `statement_${payload.accountId}_${payload.fromDate}_${payload.toDate}.${format}`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
 
  return { success: true };
}