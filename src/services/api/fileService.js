import { getApperClient } from "@/services/apperClient";

const fileService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const response = await apperClient.fetchRecords("file_c", {
        fields: [],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching files:", error);
      return [];
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const response = await apperClient.getRecordById("file_c", parseInt(id), {
        fields: []
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching file ${id}:`, error);
      return null;
    }
  },

  async create(fileData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const response = await apperClient.createRecord("file_c", {
        records: [{
          name_c: fileData.name_c,
          size_c: fileData.size_c,
          type_c: fileData.type_c,
          status_c: fileData.status_c || "uploading",
          progress_c: fileData.progress_c || 0,
          url_c: fileData.url_c || null,
          thumbnail_url_c: fileData.thumbnail_url_c || null,
          uploaded_at_c: fileData.uploaded_at_c || new Date().toISOString()
        }]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Failed to create file:", result.message);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating file:", error);
      return null;
    }
  },

  async update(id, updates) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const updateData = { Id: parseInt(id) };
      if (updates.name_c !== undefined) updateData.name_c = updates.name_c;
      if (updates.size_c !== undefined) updateData.size_c = updates.size_c;
      if (updates.type_c !== undefined) updateData.type_c = updates.type_c;
      if (updates.status_c !== undefined) updateData.status_c = updates.status_c;
      if (updates.progress_c !== undefined) updateData.progress_c = updates.progress_c;
      if (updates.url_c !== undefined) updateData.url_c = updates.url_c;
      if (updates.thumbnail_url_c !== undefined) updateData.thumbnail_url_c = updates.thumbnail_url_c;
      if (updates.uploaded_at_c !== undefined) updateData.uploaded_at_c = updates.uploaded_at_c;

      const response = await apperClient.updateRecord("file_c", {
        records: [updateData]
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results && response.results.length > 0) {
        const result = response.results[0];
        if (result.success) {
          return result.data;
        } else {
          console.error("Failed to update file:", result.message);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error(`Error updating file ${id}:`, error);
      return null;
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return false;
      }

      const response = await apperClient.deleteRecord("file_c", {
        RecordIds: [parseInt(id)]
      });

      if (!response.success) {
        console.error(response.message);
        return false;
      }

      if (response.results && response.results.length > 0) {
        return response.results[0].success;
      }

      return false;
    } catch (error) {
      console.error(`Error deleting file ${id}:`, error);
      return false;
    }
  },

  async getByStatus(status) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const response = await apperClient.fetchRecords("file_c", {
        fields: [],
        where: [{
          FieldName: "status_c",
          Operator: "EqualTo",
          Values: [status]
        }],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching files by status:", error);
      return [];
    }
  },

  async updateProgress(id, progress) {
    try {
      const progressValue = Math.min(progress, 100);
      const updates = {
        progress_c: progressValue
      };

      if (progressValue >= 100) {
        updates.status_c = "completed";
        updates.url_c = `https://dropvault.com/files/${id}`;
      }

      return await this.update(id, updates);
    } catch (error) {
      console.error(`Error updating progress for file ${id}:`, error);
      return null;
    }
  }
};

export default fileService;