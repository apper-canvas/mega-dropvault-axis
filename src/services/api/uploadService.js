import uploadsData from "../mockData/uploads.json";

let uploads = [...uploadsData];

const uploadService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...uploads];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const upload = uploads.find(u => u.Id === parseInt(id));
    return upload ? { ...upload } : null;
  },

  async create(uploadData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newUpload = {
      ...uploadData,
      Id: Math.max(...uploads.map(u => u.Id), 0) + 1,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      shareLink: `https://dropvault.com/share/${Math.random().toString(36).substring(2, 15)}`
    };
    uploads.push(newUpload);
    return { ...newUpload };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = uploads.findIndex(u => u.Id === parseInt(id));
    if (index === -1) return null;
    
    uploads[index] = { ...uploads[index], ...updates };
    return { ...uploads[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = uploads.findIndex(u => u.Id === parseInt(id));
    if (index === -1) return false;
    
    uploads.splice(index, 1);
    return true;
  },

  async getRecent(limit = 10) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return uploads
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit)
      .map(u => ({ ...u }));
  },

  async getByShareLink(shareLink) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const upload = uploads.find(u => u.shareLink === shareLink);
    return upload ? { ...upload } : null;
  }
};

export default uploadService;