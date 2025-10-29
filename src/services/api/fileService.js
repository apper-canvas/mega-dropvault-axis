import filesData from "../mockData/files.json";

let files = [...filesData];

const fileService = {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...files];
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const file = files.find(f => f.Id === parseInt(id));
    return file ? { ...file } : null;
  },

  async create(fileData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newFile = {
      ...fileData,
      Id: Math.max(...files.map(f => f.Id), 0) + 1,
      uploadedAt: new Date().toISOString(),
      status: "uploading",
      progress: 0,
      url: null
    };
    files.push(newFile);
    return { ...newFile };
  },

  async update(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index === -1) return null;
    
    files[index] = { ...files[index], ...updates };
    return { ...files[index] };
  },

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index === -1) return false;
    
    files.splice(index, 1);
    return true;
  },

  async getByStatus(status) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return files.filter(f => f.status === status).map(f => ({ ...f }));
  },

  async updateProgress(id, progress) {
    await new Promise(resolve => setTimeout(resolve, 100));
    const index = files.findIndex(f => f.Id === parseInt(id));
    if (index === -1) return null;
    
    files[index].progress = Math.min(progress, 100);
    if (progress >= 100) {
      files[index].status = "completed";
      files[index].url = `https://dropvault.com/files/${id}/${encodeURIComponent(files[index].name)}`;
    }
    
    return { ...files[index] };
  }
};

export default fileService;