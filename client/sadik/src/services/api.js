const API_URL = "http://localhost:8000/api/v1";

// Вспомогательная функция для получения заголовков с кодом
const getHeaders = (includeAuth = true) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  // Добавляем код родительского клуба, если он есть
  const clubCode = localStorage.getItem("parentClubCode");
  if (clubCode) {
    headers["X-Club-Code"] = clubCode;
    console.log("Adding club code to headers:", clubCode);
  }

  // Добавляем токен авторизации, если нужно и он есть
  if (includeAuth) {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
};

export const api = {
  async getTeachers() {
    const response = await fetch(`${API_URL}/teachers`, {
      headers: getHeaders(false), // Не требует авторизации
    });
    if (!response.ok) throw new Error("Failed to fetch teachers");
    return response.json();
  },

  async getEvents() {
    const response = await fetch(`${API_URL}/events`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch events");
    return response.json();
  },

  async getUpcomingEvents() {
    const response = await fetch(`${API_URL}/events/upcoming`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch upcoming events");
    return response.json();
  },

  async getArchiveEvents() {
    const response = await fetch(`${API_URL}/events/archive`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch archive events");
    return response.json();
  },

  async getNews() {
    try {
      const response = await fetch("http://localhost:8000/api/v1/news", {
        headers: getHeaders(false),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching news:", error);
      return [];
    }
  },

  async getNewsById(id) {
    try {
      const response = await fetch(`http://localhost:8000/api/v1/news/${id}`, {
        headers: getHeaders(false),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching news by id:", error);
      return null;
    }
  },

  async incrementNewsViews(id) {
    try {
      console.log(`Calling increment views API for news ID: ${id}`);

      const response = await fetch(
        `http://localhost:8000/api/v1/news/${id}/views`,
        {
          method: "POST",
          headers: getHeaders(false),
        },
      );

      if (!response.ok) {
        console.log("Trying fallback: fetching news with auto-increment");
        const newsResponse = await fetch(
          `http://localhost:8000/api/v1/news/${id}`,
          { headers: getHeaders(false) },
        );
        if (newsResponse.ok) {
          return await newsResponse.json();
        }
        throw new Error("Failed to increment views");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error incrementing views:", error);
      return null;
    }
  },

  async getReviews() {
    const response = await fetch(`${API_URL}/reviews`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  async addReview(reviewData) {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: getHeaders(true), // Требует авторизации
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("Failed to add review");
    return response.json();
  },

  async getClassRooms() {
    const response = await fetch(`${API_URL}/class-rooms`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch class rooms");
    return response.json();
  },

  async getMenuByDay(day) {
    const response = await fetch(`${API_URL}/menu/${day}`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  async getAllMenu() {
    const response = await fetch(`${API_URL}/menu`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  async getGallery() {
    const response = await fetch(`${API_URL}/gallery`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch gallery");
    return response.json();
  },

  async getGalleryByCategory(category) {
    const response = await fetch(`${API_URL}/gallery/${category}`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch gallery by category");
    return response.json();
  },

  async submitContact(formData) {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit contact form");
    return response.json();
  },

  async submitRegistration(formData) {
    const response = await fetch(`${API_URL}/registration`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit registration");
    return response.json();
  },

  async submitExcursion(formData) {
    const response = await fetch(`${API_URL}/excursion`, {
      method: "POST",
      headers: getHeaders(false),
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit excursion request");
    return response.json();
  },

  async getPrograms() {
    const response = await fetch(`${API_URL}/programs`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch programs");
    return response.json();
  },

  async getPricingPlans() {
    const response = await fetch(`${API_URL}/pricing/plans`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch pricing plans");
    return response.json();
  },

  async getFaqs() {
    const response = await fetch(`${API_URL}/pricing/faqs`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch faqs");
    return response.json();
  },

  async getContactInfo() {
    const response = await fetch(`${API_URL}/settings/contact`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch contact info");
    return response.json();
  },

  async getSocialLinks() {
    const response = await fetch(`${API_URL}/settings/social`, {
      headers: getHeaders(false),
    });
    if (!response.ok) throw new Error("Failed to fetch social links");
    return response.json();
  },

  async getForumTopics() {
    const headers = getHeaders(true);
    console.log("Fetching topics with headers:", headers);

    const response = await fetch(`${API_URL}/forum/topics`, {
      headers: headers,
    });

    console.log("Response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response:", errorText);
      throw new Error(`Failed to fetch topics: ${response.status}`);
    }
    return response.json();
  },

  async createForumTopic(topicData) {
    const headers = getHeaders(true);
    console.log("Creating topic with headers:", headers);
    console.log("Topic data:", topicData);

    try {
      const response = await fetch(`${API_URL}/forum/topics`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(topicData),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);

        let errorMessage = `HTTP error ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Если не JSON, используем текст
          if (errorText) errorMessage = errorText;
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const responseText = await response.text();
      console.log("Response text:", responseText);

      if (!responseText) {
        return { success: true, message: "Тема успешно создана" };
      }

      try {
        const data = JSON.parse(responseText);
        console.log("Parsed data:", data);
        return data;
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);

        if (response.ok) {
          return {
            success: true,
            message: "Тема создана",
            data: {
              id: Date.now(),
              title: topicData.title,
              content: topicData.content,
              user_id: JSON.parse(localStorage.getItem("user") || "{}").id,
              created_at: new Date().toISOString(),
              user: JSON.parse(localStorage.getItem("user") || "{}"),
            },
          };
        }

        throw new Error("Сервер вернул некорректный ответ");
      }
    } catch (error) {
      console.error("Fetch error in createForumTopic:", error);

      if (error.status) {
        throw error;
      }

      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error(
          "Сервер недоступен. Убедитесь, что сервер Laravel запущен.",
        );
      }
      throw error;
    }
  },

  // Добавьте после createForumTopic
  async updateForumTopic(topicId, data) {
    const headers = getHeaders(true);
    console.log(`Updating topic ${topicId}:`, data);

    try {
      const response = await fetch(`${API_URL}/forum/topics/${topicId}`, {
        method: "PUT",
        headers: headers,
        body: JSON.stringify(data),
      });

      console.log("Update topic response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);

        let errorMessage = `HTTP error ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          if (errorText) errorMessage = errorText;
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const responseText = await response.text();
      console.log("Update topic response:", responseText);

      if (!responseText) {
        return { success: true, message: "Тема обновлена" };
      }

      try {
        const jsonData = JSON.parse(responseText);
        return jsonData;
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        if (response.ok) {
          return {
            success: true,
            message: "Тема обновлена",
            data: { id: topicId, ...data },
          };
        }
        throw new Error("Сервер вернул некорректный ответ");
      }
    } catch (error) {
      console.error("Error in updateForumTopic:", error);
      throw error;
    }
  },

  async hasParentClubAccess() {
    const token = localStorage.getItem("token");
    console.log("=== hasParentClubAccess called ===");
    console.log("Token:", token ? "Token exists" : "No token");

    if (!token) {
      console.log("No token found, returning false");
      return { has_access: false };
    }

    const headers = getHeaders(true);
    console.log("Fetching with headers:", headers);

    try {
      const response = await fetch(`${API_URL}/parent-club/has-access`, {
        method: "GET",
        headers: headers,
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        if (response.status === 401) {
          console.log("Token expired or invalid");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          return { has_access: false };
        }

        if (response.status === 403) {
          console.log("Access forbidden");
          return { has_access: false };
        }

        console.log(`HTTP error ${response.status}`);
        return { has_access: false };
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      return { has_access: false };
    }
  },

  async register(userData) {
    console.log("Registering user with data:", userData);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Register response:", { status: response.status, data });

      if (!response.ok) {
        const error = new Error(data.message || "Registration failed");
        error.status = response.status;
        error.errors = data.errors;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  async login(credentials) {
    console.log("Logging in with:", credentials);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: getHeaders(false),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log("Login response:", { status: response.status, data });

      if (!response.ok) {
        const error = new Error(data.message || "Login failed");
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  async logout() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/logout`, {
      method: "POST",
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to logout");
    return response.json();
  },

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/user`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to get user");
    return response.json();
  },

  async getForumTopic(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/forum/topics/${id}`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Failed to fetch topic");
    return response.json();
  },

  async addForumPost(topicId, content) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/forum/topics/${topicId}/posts`, {
      method: "POST",
      headers: getHeaders(true),
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add post");
    }

    return data;
  },

  getMenuItems: async () => {
    const response = await fetch(`${API_URL}/menu-items`, {
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Ошибка загрузки меню");
    return response.json();
  },

  createMenuItem: async (formData) => {
    const response = await fetch(`${API_URL}/menu-items`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Ошибка создания блюда");
    return response.json();
  },

  updateMenuItem: async (id, formData) => {
    const response = await fetch(`${API_URL}/menu-items/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formData,
    });
    if (!response.ok) throw new Error("Ошибка обновления блюда");
    return response.json();
  },

  deleteMenuItem: async (id) => {
    const response = await fetch(`${API_URL}/menu-items/${id}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });
    if (!response.ok) throw new Error("Ошибка удаления блюда");
    return response.json();
  },

  async deleteForumTopic(topicId) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/forum/topics/${topicId}`, {
      method: "DELETE",
      headers: getHeaders(true),
    });

    if (!response.ok) {
      const error = new Error("Failed to delete topic");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  async toggleTopicLock(topicId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/admin/forum/topics/${topicId}/toggle-lock`,
      {
        method: "PATCH",
        headers: getHeaders(true),
      },
    );

    if (!response.ok) {
      const error = new Error("Failed to toggle lock");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  async toggleTopicPin(topicId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/admin/forum/topics/${topicId}/toggle-pin`,
      {
        method: "PATCH",
        headers: getHeaders(true),
      },
    );

    if (!response.ok) {
      const error = new Error("Failed to toggle pin");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  async deleteForumPost(topicId, postId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/forum/topics/${topicId}/posts/${postId}`,
      {
        method: "DELETE",
        headers: getHeaders(true),
      },
    );

    if (!response.ok) {
      const error = new Error("Failed to delete post");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  async checkParentClubAccess(secretCode) {
    const token = localStorage.getItem("token");
    console.log("Checking parent club access with code:", secretCode);

    const headers = getHeaders(true);
    console.log("Headers:", headers);

    const response = await fetch(`${API_URL}/parent-club/check-access`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ secret_code: secretCode }),
    });

    const data = await response.json();
    console.log("Check access response:", data);

    if (!response.ok) {
      throw new Error(data.message || "Failed to check access");
    }

    return data;
  },

  // НОВЫЙ МЕТОД: обновление поста (ТОЛЬКО ОДИН РАЗ!)
  // В api.js убедитесь, что метод возвращает правильные данные
  // В api.js замените существующий метод updateForumPost на этот:
  async updateForumPost(topicId, postId, data) {
    const headers = getHeaders(true);
    console.log(`Updating post ${postId} in topic ${topicId}:`, data);

    try {
      const response = await fetch(
        `${API_URL}/forum/topics/${topicId}/posts/${postId}`,
        {
          method: "PUT",
          headers: headers,
          body: JSON.stringify(data),
        },
      );

      console.log("Update post response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);

        let errorMessage = `HTTP error ${response.status}`;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // Если не JSON, используем текст
          if (errorText) errorMessage = errorText;
        }

        const error = new Error(errorMessage);
        error.status = response.status;
        throw error;
      }

      const responseText = await response.text();
      console.log("Update post response:", responseText);

      if (!responseText) {
        return { success: true, message: "Сообщение обновлено" };
      }

      try {
        const jsonData = JSON.parse(responseText);
        return jsonData;
      } catch (parseError) {
        console.error("Failed to parse JSON:", parseError);
        if (response.ok) {
          return {
            success: true,
            message: "Сообщение обновлено",
            data: { id: postId, content: data.content },
          };
        }
        throw new Error("Сервер вернул некорректный ответ");
      }
    } catch (error) {
      console.error("Error in updateForumPost:", error);
      throw error;
    }
  },

  // НОВЫЙ МЕТОД: блокировка пользователя
  async toggleUserBan(userId) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/admin/users/${userId}/toggle-ban`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );

    if (!response.ok) {
      const error = new Error("Failed to toggle user ban");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },

  // НОВЫЙ МЕТОД: получение списка пользователей
  async getUsers() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const error = new Error("Failed to fetch users");
      error.status = response.status;
      throw error;
    }

    return response.json();
  },
};
