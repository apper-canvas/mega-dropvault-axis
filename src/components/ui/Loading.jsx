import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ message = "Loading files..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="mb-6"
      >
        <ApperIcon 
          name="Loader2" 
          className="w-12 h-12 text-primary-400" 
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          {message}
        </h3>
        <p className="text-gray-400 text-sm">
          Please wait while we process your request
        </p>
      </motion.div>
      
      {/* Shimmer skeleton */}
      <div className="w-full max-w-md mt-8 space-y-4">
        {[1, 2, 3].map((index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            className="glass-morphism rounded-xl p-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gradient-to-r from-gray-600 to-gray-700 rounded shimmer" />
                <div className="h-2 bg-gradient-to-r from-gray-600 to-gray-700 rounded shimmer w-2/3" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;