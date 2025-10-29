import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No files uploaded yet", 
  description = "Start by dropping files into the upload zone or click to browse.",
  actionText = "Browse Files",
  onAction,
  icon = "Upload"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="p-6 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-full mb-4">
          <ApperIcon 
            name={icon} 
            className="w-16 h-16 text-primary-400" 
          />
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8 max-w-md"
      >
        <h3 className="text-2xl font-bold text-white mb-3 font-display">
          {title}
        </h3>
        <p className="text-gray-400 text-lg leading-relaxed">
          {description}
        </p>
      </motion.div>
      
      {onAction && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAction}
          className="bg-gradient-primary text-white px-8 py-4 rounded-xl font-semibold text-lg
                     hover:shadow-xl hover:shadow-primary-500/25 transition-all duration-200
                     flex items-center space-x-3 group"
        >
          <ApperIcon 
            name="FolderOpen" 
            className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" 
          />
          <span>{actionText}</span>
        </motion.button>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center space-x-6 text-sm text-gray-500"
      >
        <div className="flex items-center space-x-2">
          <ApperIcon name="Shield" className="w-4 h-4" />
          <span>Secure Upload</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Zap" className="w-4 h-4" />
          <span>Fast Processing</span>
        </div>
        <div className="flex items-center space-x-2">
          <ApperIcon name="Share" className="w-4 h-4" />
          <span>Easy Sharing</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Empty;