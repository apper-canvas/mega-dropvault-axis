import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ 
  message = "Something went wrong", 
  description = "Please try again or contact support if the problem persists.",
  onRetry 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        className="mb-6 p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-full"
      >
        <ApperIcon 
          name="AlertTriangle" 
          className="w-12 h-12 text-red-400" 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl font-bold text-white mb-2">
          {message}
        </h3>
        <p className="text-gray-400 max-w-md">
          {description}
        </p>
      </motion.div>
      
      {onRetry && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="bg-gradient-primary text-white px-6 py-3 rounded-xl font-semibold 
                     hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-200
                     flex items-center space-x-2"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4" />
          <span>Try Again</span>
        </motion.button>
      )}
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-xs text-gray-500"
      >
        Error occurred at {new Date().toLocaleTimeString()}
      </motion.div>
    </motion.div>
  );
};

export default Error;