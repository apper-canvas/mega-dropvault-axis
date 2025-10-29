import { getApperClient } from "@/services/apperClient";

const uploadService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const response = await apperClient.fetchRecords("upload_c", {
        fields: [],
        pagingInfo: { limit: 100, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching uploads:", error);
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

      const response = await apperClient.getRecordById("upload_c", parseInt(id), {
        fields: []
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data || null;
    } catch (error) {
      console.error(`Error fetching upload ${id}:`, error);
      return null;
    }
  },

  async create(uploadData) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      // Convert files array to comma-separated string of IDs
      const filesString = Array.isArray(uploadData.files_c) 
        ? uploadData.files_c.map(f => f.id || f).join(',')
        : uploadData.files_c || '';

      const response = await apperClient.createRecord("upload_c", {
        records: [{
          files_c: filesString,
          total_size_c: uploadData.total_size_c,
          share_link_c: uploadData.share_link_c,
          expires_at_c: uploadData.expires_at_c || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          created_at_c: uploadData.created_at_c || new Date().toISOString()
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
          console.error("Failed to create upload:", result.message);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error("Error creating upload:", error);
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
      
      if (updates.files_c !== undefined) {
        updateData.files_c = Array.isArray(updates.files_c)
          ? updates.files_c.map(f => f.id || f).join(',')
          : updates.files_c;
      }
      if (updates.total_size_c !== undefined) updateData.total_size_c = updates.total_size_c;
      if (updates.share_link_c !== undefined) updateData.share_link_c = updates.share_link_c;
      if (updates.expires_at_c !== undefined) updateData.expires_at_c = updates.expires_at_c;
      if (updates.created_at_c !== undefined) updateData.created_at_c = updates.created_at_c;

      const response = await apperClient.updateRecord("upload_c", {
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
          console.error("Failed to update upload:", result.message);
          return null;
        }
      }

      return null;
    } catch (error) {
      console.error(`Error updating upload ${id}:`, error);
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

      const response = await apperClient.deleteRecord("upload_c", {
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
      console.error(`Error deleting upload ${id}:`, error);
      return false;
    }
  },

  async getRecent(limit = 10) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return [];
      }

      const response = await apperClient.fetchRecords("upload_c", {
        fields: [],
        orderBy: [{ fieldName: "created_at_c", sorttype: "DESC" }],
        pagingInfo: { limit: limit, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching recent uploads:", error);
      return [];
    }
  },

  async getByShareLink(shareLink) {
    try {
      const apperClient = getApperClient();
      if (!apperClient) {
        console.error("ApperClient not initialized");
        return null;
      }

      const response = await apperClient.fetchRecords("upload_c", {
        fields: [],
        where: [{
          FieldName: "share_link_c",
          Operator: "EqualTo",
          Values: [shareLink]
        }],
        pagingInfo: { limit: 1, offset: 0 }
      });

      if (!response.success) {
        console.error(response.message);
        return null;
      }

      return response.data && response.data.length > 0 ? response.data[0] : null;
    } catch (error) {
      console.error("Error fetching upload by share link:", error);
      return null;
    }
  }
};

export default uploadService;