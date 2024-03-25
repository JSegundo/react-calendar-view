export function getFileName(fileUrl: string) {
  const parts = fileUrl.split("/")
  const filename = parts && parts.length ? parts[parts.length - 1] : null
  return filename
}
