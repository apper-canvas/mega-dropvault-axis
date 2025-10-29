import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/organisms/Header";
import FileUploader from "@/components/organisms/FileUploader";
import ShareModal from "@/components/molecules/ShareModal";
import FilePreviewModal from "@/components/molecules/FilePreviewModal";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";
import { formatFileSize } from "@/utils/fileUtils";
import { toast } from "react-toastify";

const HomePage = () => {
  const [currentUpload, setCurrentUpload] = useState(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);
  const [showSuccessCard, setShowSuccessCard] = useState(false);
  const [uploadStats, setUploadStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    successRate: 100
  });

const handleUploadComplete = (upload) => {
    setCurrentUpload(upload);
    setShowSuccessCard(true);
    
    // Update stats - use new field names
    setUploadStats(prev => ({
      totalFiles: prev.totalFiles + (upload.files_c ? upload.files_c.length : 0),
      totalSize: prev.totalSize + (upload.total_size_c || 0),
      successRate: 100 // Simulate perfect success rate for demo
    }));
    
    // Auto-copy share link - use new field name
    if (upload.share_link_c) {
      navigator.clipboard.writeText(upload.share_link_c).then(() => {
        toast.success("Share link copied to clipboard!");
      });
    }
  };

  const handleFilePreview = (file) => {
    setPreviewFile(file);
    setPreviewModalOpen(true);
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleNewUpload = () => {
    setCurrentUpload(null);
    setShowSuccessCard(false);
  };

  const handleShowStats = () => {
    toast.info(`Total: ${uploadStats.totalFiles} files, ${formatFileSize(uploadStats.totalSize)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-dark">
      <Header onShowStats={handleShowStats} />
      
      <main className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Success Card */}
          <AnimatePresence>
            {showSuccessCard && currentUpload && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="mb-8"
              >
                <Card variant="gradient" className="border-green-500/30">
                  <div className="flex items-start space-x-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="p-3 bg-green-500/20 rounded-full"
                    >
                      <ApperIcon name="CheckCircle" className="w-8 h-8 text-green-400" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h3 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-xl font-bold text-white mb-2 font-display"
                      >
                        Upload Complete! 🎉
                      </motion.h3>
                      
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="space-y-2 mb-4"
                      >
<p className="text-gray-300">
                          Successfully uploaded {currentUpload.files_c ? currentUpload.files_c.length : 0} {currentUpload.files_c && currentUpload.files_c.length === 1 ? "file" : "files"} 
                          ({formatFileSize(currentUpload.total_size_c || 0)})
                        </p>
                        <p className="text-sm text-gray-400 font-mono">
                          Share link: {currentUpload.share_link_c}
                        </p>
                      </motion.div>
                      
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap gap-3"
                      >
                        <Button
                          variant="success"
                          icon="Share"
                          onClick={handleShare}
                        >
                          Share Files
                        </Button>
                        
                        <Button
                          variant="outline"
                          icon="Upload"
                          onClick={handleNewUpload}
                        >
                          Upload More
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Main Upload Interface */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FileUploader
              onUploadComplete={handleUploadComplete}
              onFilePreview={handleFilePreview}
            />
          </motion.div>
          
          {/* Stats Footer */}
          {uploadStats.totalFiles > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-12 text-center"
            >
              <Card variant="glass" className="inline-block">
                <div className="flex items-center space-x-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="Upload" className="w-4 h-4 text-primary-400" />
                    <span className="text-gray-400">Files:</span>
                    <span className="text-white font-semibold">{uploadStats.totalFiles}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="HardDrive" className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400">Total:</span>
                    <span className="text-white font-semibold">{formatFileSize(uploadStats.totalSize)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="CheckCircle" className="w-4 h-4 text-green-400" />
                    <span className="text-gray-400">Success:</span>
                    <span className="text-white font-semibold">{uploadStats.successRate}%</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </main>
      
      {/* Modals */}
      <ShareModal
        upload={currentUpload}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      
      <FilePreviewModal
        file={previewFile}
        isOpen={previewModalOpen}
        onClose={() => setPreviewModalOpen(false)}
      />
    </div>
  );
};

export default HomePage;