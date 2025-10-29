import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";
import { validateFile } from "@/utils/fileUtils";
import { toast } from "react-toastify";

const DropZone = ({ onFilesDrop, disabled = false, className }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  }, [disabled]);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (disabled) return;
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, [disabled, onFilesDrop]);
  
  const handleFileSelect = useCallback((e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
    e.target.value = ""; // Reset input
  }, [onFilesDrop]);
  
  const processFiles = (files) => {
    const validFiles = [];
    const errors = [];
    
    files.forEach(file => {
      const validation = validateFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });
    
    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
    }
    
    if (validFiles.length > 0) {
      onFilesDrop?.(validFiles);
    }
  };
  
  const openFileDialog = () => {
    if (!disabled) {
      const input = document.createElement("input");
      input.type = "file";
      input.multiple = true;
      input.accept = "image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip";
      input.onchange = handleFileSelect;
      input.click();
    }
  };
  
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{ 
        scale: isDragOver ? 1.02 : 1,
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={openFileDialog}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300",
          "bg-gradient-to-br from-gray-800/20 to-gray-900/20 backdrop-blur-sm",
          !disabled && "hover:border-primary-400 hover:bg-primary-500/5",
          isDragOver 
            ? "border-primary-400 bg-primary-500/10 scale-102" 
            : "border-gray-600",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Animated background effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0"
          animate={{
            opacity: isDragOver ? 0.1 : 0,
            background: isDragOver 
              ? "linear-gradient(135deg, #5B21B6, #8B5CF6)" 
              : "transparent"
          }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative z-10">
          <motion.div
            animate={{ 
              y: isDragOver ? -5 : 0,
              scale: isDragOver ? 1.1 : 1 
            }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-500/20 to-secondary-500/20 
                            rounded-full flex items-center justify-center mb-4">
              <ApperIcon 
                name={isDragOver ? "Download" : "Upload"} 
                className={cn(
                  "w-10 h-10 transition-colors duration-200",
                  isDragOver ? "text-primary-300" : "text-primary-400"
                )} 
              />
            </div>
          </motion.div>
          
          <motion.div
            animate={{ scale: isDragOver ? 1.05 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 font-display">
              {isDragOver ? "Drop files here!" : "Drag & Drop Files"}
            </h3>
            <p className="text-gray-400 mb-6 text-lg">
              {isDragOver 
                ? "Release to upload your files" 
                : "Or click to browse and select files"
              }
            </p>
            
            <Button
              variant="primary"
              size="lg"
              icon="FolderOpen"
              disabled={disabled}
              className="mb-4"
            >
              Browse Files
            </Button>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 mt-6">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Image" className="w-4 h-4" />
                <span>Images</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Video" className="w-4 h-4" />
                <span>Videos</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="FileText" className="w-4 h-4" />
                <span>Documents</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Archive" className="w-4 h-4" />
                <span>Archives</span>
              </div>
            </div>
            
<p className="text-xs text-gray-600 mt-4">
              Maximum file size: 100MB per file
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DropZone;