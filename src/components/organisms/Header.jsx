import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useAuth } from "@/layouts/Root";
import { useSelector } from "react-redux";
const Header = ({ onShowStats }) => {
  const { logout } = useAuth();
  const { user } = useSelector((state) => state.user);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-6 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <ApperIcon name="Upload" className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white font-display">
                DropVault
              </h1>
              <p className="text-gray-400 text-sm">
                Secure file sharing made simple
              </p>
            </div>
          </motion.div>
          
          {/* Header Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-6 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <ApperIcon name="Shield" className="w-4 h-4 text-green-400" />
                <span>Secure</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Zap" className="w-4 h-4 text-blue-400" />
                <span>Fast Upload</span>
              </div>
              <div className="flex items-center space-x-2">
                <ApperIcon name="Share" className="w-4 h-4 text-purple-400" />
                <span>Easy Share</span>
              </div>
            </div>
            
<Button
              variant="outline"
              size="sm"
              icon="BarChart3"
              onClick={onShowStats}
              className="hidden md:flex"
            >
              Stats
            </Button>
            
            {user && (
              <Button
                variant="ghost"
                size="sm"
                icon="LogOut"
                onClick={logout}
                className="hidden md:flex"
              >
                Logout
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-gray-400 hover:text-white"
            >
              <ApperIcon name="Menu" className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;