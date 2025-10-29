import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import Button from "@/components/atoms/Button";
import Empty from "@/components/ui/Empty";
import DropZone from "@/components/molecules/DropZone";
import FileCard from "@/components/molecules/FileCard";
import { formatFileSize, formatTimeRemaining, formatUploadSpeed, generateThumbnail } from "@/utils/fileUtils";

const FileUploader = ({ onUploadComplete, onFilePreview }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const simulateUpload = async (file) => {
    const fileId = Date.now() + Math.random();
    const fileSize = file.size;
    const uploadSpeed = 1024 * 1024 * (Math.random() * 2 + 1); // 1-3 MB/s
    const totalTime = fileSize / uploadSpeed;
    
    // Generate thumbnail for images
    const thumbnailUrl = await generateThumbnail(file);
    
const newFile = {
      id: fileId,
      name_c: file.name,
      size_c: file.size,
      type_c: file.type,
      status_c: "uploading",
      progress_c: 0,
      uploaded_at_c: new Date().toISOString(),
      thumbnail_url_c: thumbnailUrl,
      url_c: null
    };
    
    setFiles(prev => [...prev, newFile]);
    
    // Simulate upload progress
    const updateInterval = 100;
    const progressIncrement = (updateInterval / 1000) / totalTime * 100;
    let currentProgress = 0;
    
    const progressInterval = setInterval(() => {
      currentProgress += progressIncrement + Math.random() * 2;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        
        // Complete upload
const completedFile = {
          ...newFile,
          status_c: "completed",
          progress_c: 100,
          url_c: `https://dropvault.com/files/${fileId}/${encodeURIComponent(file.name)}`
        };
        
        setFiles(prev => 
          prev.map(f => f.id === fileId ? completedFile : f)
        );
        
        toast.success(`${file.name} uploaded successfully!`);
} else {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress_c: Math.min(currentProgress, 100) }
              : f
          )
        );
      }
    }, updateInterval);
    
    return newFile;
  };
  
  const handleFilesDrop = useCallback(async (droppedFiles) => {
    setIsUploading(true);
    
    try {
      const uploadPromises = droppedFiles.map(file => simulateUpload(file));
      const uploadedFiles = await Promise.all(uploadPromises);
      
      // Create upload group for sharing
const upload = {
        id: Date.now(),
        files_c: uploadedFiles,
        total_size_c: droppedFiles.reduce((total, file) => total + file.size, 0),
        share_link_c: `https://dropvault.com/share/${Date.now()}`,
        expires_at_c: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        created_at_c: new Date().toISOString()
      };
      
      setTimeout(() => {
        onUploadComplete?.(upload);
      }, 2000);
      
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  }, [onUploadComplete]);
  
  const handleRemoveFile = useCallback((fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success("File removed");
  }, []);
  
  const clearAllFiles = useCallback(() => {
    setFiles([]);
    toast.success("All files cleared");
}, []);
  
  const uploadingFiles = files.filter(f => f.status_c === "uploading");
  const completedFiles = files.filter(f => f.status_c === "completed");
  const hasFiles = files.length > 0;
  
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Drop Zone */}
      <DropZone 
        onFilesDrop={handleFilesDrop}
        disabled={isUploading}
      />
      
      {/* Upload Progress Section */}
      <AnimatePresence>
        {uploadingFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">
                Uploading {uploadingFiles.length} {uploadingFiles.length === 1 ? "file" : "files"}...
              </h3>
              <div className="text-sm text-gray-400">
{Math.round(uploadingFiles.reduce((acc, f) => acc + (f.progress_c || 0), 0) / uploadingFiles.length)}% complete
              </div>
            </div>
            
            <div className="space-y-3">
              {uploadingFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  showActions={false}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Completed Files Section */}
      <AnimatePresence>
        {completedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white font-display">
                Uploaded Files ({completedFiles.length})
              </h3>
              
<div className="flex items-center space-x-3">
                <div className="text-sm text-gray-400">
                  Total: {formatFileSize(completedFiles.reduce((acc, f) => acc + (f.size_c || 0), 0))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFiles}
                  className="text-gray-400 hover:text-white"
                >
                  Clear All
                </Button>
              </div>
            </div>
            
            <div className="grid gap-3">
              {completedFiles.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onRemove={handleRemoveFile}
                  onPreview={onFilePreview}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Empty State */}
      {!hasFiles && !isUploading && (
        <Empty
          title="Ready to upload files"
          description="Your uploaded files will appear here with shareable links and preview options."
          icon="Upload"
        />
      )}
    </div>
  );
};

export default FileUploader;