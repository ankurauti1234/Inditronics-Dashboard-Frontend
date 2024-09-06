'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, File, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const FileUploadAssets = () => {
  const [files, setFiles] = useState([])

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(prevFiles => [...prevFiles, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  const removeFile = (fileToRemove) => {
    setFiles(files.filter(file => file !== fileToRemove))
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 ">
      <Card>
        <CardContent>
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg font-medium">
              {isDragActive ? 'Drop the files here' : 'Drag & drop files here, or click to select files'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Supported file types: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)
            </p>
          </div>
        </CardContent>
      </Card>

      {files.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Uploaded Files:</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-secondary rounded-md">
                <div className="flex items-center">
                  <File className="w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">{file.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(file)}
                  className="text-destructive hover:text-destructive/90"
                >
                  <X className="w-4 h-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUploadAssets