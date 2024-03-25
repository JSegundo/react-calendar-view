import React, { useState } from "react"
import { getFileName } from "../../../utils/actions/hooks/getFileName"
import { uploadFile } from "../../../utils/actions"

interface Props {
  bookingId: string
}
const FileSection = ({ bookingId }: Props) => {
  const [fileUrl, setfileUrl] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleFileUpload = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const uploadedFileUrl = await uploadFile(bookingId, file)
      setfileUrl(uploadedFileUrl)
      alert("Success!")
    } catch (err) {
      console.error(err)
      alert("Error uploading file. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      {loading && <LoadingSkeleton />}
      {!loading && fileUrl && <p>{getFileName(fileUrl)}</p>}
      <label htmlFor="file">Upload File</label>
      <input id="file" type="file" onChange={handleFileUpload} />
    </div>
  )
}

export default FileSection

const LoadingSkeleton = () => {
  return (
    <div className="flex space-x-2 items-center mb-2 animate-pulse">
      <div className="w-6 h-6 bg-gray-200 rounded"></div>
      <div className="w-full">
        <p className="h-4 w-full bg-gray-200 rounded"></p>
      </div>
    </div>
  )
}
