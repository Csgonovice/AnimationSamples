"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Download, File, Folder, Trash2, CheckCircle, AlertCircle } from "lucide-react"

interface FileAnimationsProps {
  isPlaying: boolean
}

export function FileAnimations({ isPlaying }: FileAnimationsProps) {
  const [currentDemo, setCurrentDemo] = useState(0)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [files, setFiles] = useState<Array<{ id: number; name: string; status: string }>>([])

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      setCurrentDemo((prev) => (prev + 1) % 8)
      setUploadProgress(0)
      setFiles([])
    }, 3000)

    return () => clearTimeout(timer)
  }, [isPlaying, currentDemo])

  useEffect(() => {
    if (currentDemo === 0 && isPlaying) {
      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) return 0
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [currentDemo, isPlaying])

  const demos = [
    // File Upload Progress
    <Card key="upload-progress" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          Uploading Files
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-center">
            <motion.div
              animate={isPlaying ? { y: [0, -10, 0] } : {}}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
            >
              <Upload className="w-12 h-12 text-blue-500 mx-auto" />
            </motion.div>
            <p className="text-sm text-slate-600 mt-2">document.pdf</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-blue-500 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${uploadProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
          {uploadProgress === 100 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center text-green-600"
            >
              <CheckCircle className="w-5 h-5 mr-2" />
              Upload Complete!
            </motion.div>
          )}
        </div>
      </CardContent>
    </Card>,

    // Drag and Drop Zone
    <div key="drag-drop" className="w-full max-w-md mx-auto">
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center bg-slate-50 hover:bg-slate-100 transition-colors"
      >
        <motion.div
          animate={isPlaying ? { y: [0, -5, 0] } : {}}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        </motion.div>
        <p className="text-slate-600 font-medium">Drop files here</p>
        <p className="text-sm text-slate-500 mt-1">or click to browse</p>
      </motion.div>
    </div>,

    // File Browser
    <Card key="file-browser" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>My Files</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {[
            { name: "Documents", type: "folder", size: null },
            { name: "Images", type: "folder", size: null },
            { name: "report.pdf", type: "file", size: "2.4 MB" },
            { name: "presentation.pptx", type: "file", size: "5.1 MB" },
          ].map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ backgroundColor: "#f8fafc" }}
              className="flex items-center justify-between p-2 rounded cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {item.type === "folder" ? (
                  <Folder className="w-5 h-5 text-blue-500" />
                ) : (
                  <File className="w-5 h-5 text-slate-500" />
                )}
                <span className="text-sm">{item.name}</span>
              </div>
              {item.size && <span className="text-xs text-slate-500">{item.size}</span>}
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // Download Animation
    <div key="download-animation" className="w-full max-w-xs mx-auto text-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
      >
        <motion.div
          animate={isPlaying ? { y: [0, 5, 0] } : {}}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          <Download className="w-5 h-5" />
        </motion.div>
        Download File
      </motion.button>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-slate-600 mt-2"
      >
        document.pdf (2.4 MB)
      </motion.p>
    </div>,

    // File Status List
    <Card key="file-status" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>File Operations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {[
            { name: "image1.jpg", status: "uploading", progress: 75 },
            { name: "document.pdf", status: "complete", progress: 100 },
            { name: "video.mp4", status: "error", progress: 0 },
          ].map((file, index) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <File className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium">{file.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                {file.status === "uploading" && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full"
                  />
                )}
                {file.status === "complete" && <CheckCircle className="w-4 h-4 text-green-600" />}
                {file.status === "error" && <AlertCircle className="w-4 h-4 text-red-600" />}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>,

    // File Preview
    <Card key="file-preview" className="w-full max-w-sm mx-auto">
      <CardContent className="p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-3 flex items-center justify-center"
        >
          <File className="w-12 h-12 text-slate-400" />
        </motion.div>
        <h3 className="font-semibold text-sm">presentation.pptx</h3>
        <p className="text-xs text-slate-500">Modified 2 hours ago</p>
        <div className="flex space-x-2 mt-3">
          <Button size="sm" variant="outline" className="flex-1">
            Preview
          </Button>
          <Button size="sm" className="flex-1">
            Download
          </Button>
        </div>
      </CardContent>
    </Card>,

    // Bulk Operations
    <Card key="bulk-operations" className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Bulk Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 mb-4">
          {["file1.pdf", "file2.docx", "file3.jpg"].map((file, index) => (
            <motion.div
              key={file}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3 p-2 bg-slate-50 rounded"
            >
              <motion.input
                type="checkbox"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                className="rounded"
                defaultChecked
              />
              <File className="w-4 h-4 text-slate-500" />
              <span className="text-sm">{file}</span>
            </motion.div>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" className="flex-1">
            <Download className="w-4 h-4 mr-1" />
            Download
          </Button>
          <Button size="sm" variant="destructive" className="flex-1">
            <Trash2 className="w-4 h-4 mr-1" />
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>,

    // Storage Usage
    <Card key="storage-usage" className="w-full max-w-xs mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Storage Usage</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle cx="48" cy="48" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 251.2" }}
              animate={isPlaying ? { strokeDasharray: "188.4 251.2" } : {}}
              transition={{ duration: 2 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">75%</span>
          </div>
        </div>
        <p className="text-sm text-slate-600">7.5 GB of 10 GB used</p>
        <Button size="sm" className="mt-3">
          Upgrade Storage
        </Button>
      </CardContent>
    </Card>,
  ]

  return (
    <div className="flex items-center justify-center h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentDemo}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          {demos[currentDemo]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
