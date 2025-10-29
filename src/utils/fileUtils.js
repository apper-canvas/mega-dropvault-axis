export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const formatUploadSpeed = (bytesPerSecond) => {
  const mbps = bytesPerSecond / (1024 * 1024);
  if (mbps >= 1) {
    return `${mbps.toFixed(1)} MB/s`;
  }
  
  const kbps = bytesPerSecond / 1024;
  return `${kbps.toFixed(0)} KB/s`;
};

export const formatTimeRemaining = (seconds) => {
  if (!seconds || !isFinite(seconds)) return "Calculating...";
  
  if (seconds < 60) {
    return `${Math.ceil(seconds)}s`;
  }
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.ceil(seconds % 60);
  
  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  return `${hours}h ${remainingMinutes}m`;
};

export const getFileIcon = (fileType) => {
  if (fileType.startsWith("image/")) return "Image";
  if (fileType.startsWith("video/")) return "Video";
  if (fileType.startsWith("audio/")) return "Music";
  if (fileType.includes("pdf")) return "FileText";
  if (fileType.includes("word") || fileType.includes("document")) return "FileText";
  if (fileType.includes("excel") || fileType.includes("spreadsheet")) return "FileSpreadsheet";
  if (fileType.includes("powerpoint") || fileType.includes("presentation")) return "FileImage";
  if (fileType.includes("zip") || fileType.includes("archive")) return "Archive";
  return "File";
};

export const isImageFile = (fileType) => {
  return fileType.startsWith("image/");
};

export const validateFile = (file) => {
  const maxSize = 100 * 1024 * 1024; // 100MB
  const allowedTypes = [
    "image/", "video/", "audio/", "application/pdf", "application/msword",
    "application/vnd.openxmlformats-officedocument", "text/", "application/zip",
    "application/x-zip-compressed", "application/json"
  ];
  
  if (file.size > maxSize) {
    return { valid: false, error: "File size must be less than 100MB" };
  }
  
  const isValidType = allowedTypes.some(type => file.type.startsWith(type));
  if (!isValidType) {
    return { valid: false, error: "File type not supported" };
  }
  
  return { valid: true };
};

export const generateThumbnail = (file) => {
  return new Promise((resolve) => {
    if (!isImageFile(file.type)) {
      resolve(null);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        
        const maxSize = 150;
        let { width, height } = img;
        
        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  });
};