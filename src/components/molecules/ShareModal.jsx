import { motion, AnimatePresence } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const ShareModal = ({ upload, isOpen, onClose }) => {
  if (!upload) return null;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(upload.shareLink);
      toast.success("Share link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };
  
  const handleShare = (platform) => {
    const shareText = `Check out these files I uploaded: ${upload.shareLink}`;
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(upload.shareLink)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(upload.shareLink)}`,
      email: `mailto:?subject=Shared Files&body=${encodeURIComponent(shareText)}`
    };
    
    window.open(shareUrls[platform], "_blank", "width=600,height=400");
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
            className="glass-morphism rounded-2xl p-6 w-full max-w-md"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white font-display">
                Share Files
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </Button>
            </div>
            
            {/* Share Link */}
            <Card variant="solid" padding="sm" className="mb-6">
              <div className="flex items-center space-x-3">
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-400 mb-1">Share Link</p>
                  <p className="text-sm text-white truncate font-mono">
                    {upload.shareLink}
                  </p>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  icon="Copy"
                  onClick={handleCopyLink}
                >
                  Copy
                </Button>
              </div>
            </Card>
            
            {/* Social Share Options */}
            <div className="space-y-3">
              <p className="text-sm text-gray-400 font-medium">
                Share on social media
              </p>
              
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleShare("twitter")}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Twitter" className="w-4 h-4" />
                  <span>Twitter</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare("facebook")}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Facebook" className="w-4 h-4" />
                  <span>Facebook</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare("linkedin")}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Linkedin" className="w-4 h-4" />
                  <span>LinkedIn</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => handleShare("email")}
                  className="flex items-center space-x-2"
                >
                  <ApperIcon name="Mail" className="w-4 h-4" />
                  <span>Email</span>
                </Button>
              </div>
            </div>
            
            {/* Upload Info */}
            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Files:</span>
                <span className="text-white">{upload.files.length}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-400">Expires:</span>
                <span className="text-white">
                  {new Date(upload.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ShareModal;