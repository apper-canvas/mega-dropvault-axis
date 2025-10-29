import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { formatFileSize } from "@/utils/fileUtils";
import { toast } from "react-toastify";

const FilePreviewModal = ({ file, isOpen, onClose }) => {
  if (!file) return null;
  
  const handleCopyLink = async () => {
if (file.url_c) {
      try {
        await navigator.clipboard.writeText(file.url_c);
        toast.success("Link copied to clipboard!");
      } catch (error) {
        toast.error("Failed to copy link");
      }
    }
  };
  
  const handleDownload = () => {
if (file.url_c) {
      const link = document.createElement("a");
      link.href = file.url_c;
      link.download = file.name_c;
      link.click();
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-morphism rounded-2xl p-6 max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-white font-display">
{file.name_c}
                </h2>
                <p className="text-gray-400 text-sm">
                  {formatFileSize(file.size_c)}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
{file.url_c && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      icon="Copy"
                      onClick={handleCopyLink}
                    >
                      Copy Link
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon="Download"
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-gray-400 hover:text-white"
                >
                  <ApperIcon name="X" className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Preview Content */}
            <div className="flex justify-center items-center bg-gray-900/50 rounded-xl p-8 min-h-[400px]">
{file.thumbnail_url_c || file.url_c ? (
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  src={file.thumbnail_url_c || file.url_c}
                  alt={file.name_c}
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl"
                />
              ) : (
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 
                                  rounded-full flex items-center justify-center mb-4 mx-auto">
                    <ApperIcon name="Image" className="w-12 h-12 text-primary-400" />
                  </div>
                  <p className="text-gray-400">Preview not available</p>
                </div>
              )}
            </div>
            
            {/* File Info */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
<span className="text-gray-400">File type:</span>
                <span className="ml-2 text-white">{file.type_c}</span>
              </div>
              <div>
                <span className="text-gray-400">Uploaded:</span>
                <span className="ml-2 text-white">
                  {new Date(file.uploaded_at_c).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FilePreviewModal;