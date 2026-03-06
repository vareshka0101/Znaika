const API_URL = "http://localhost:8000/api/v1";

export const api = {
  async getTeachers() {
    const response = await fetch(`${API_URL}/teachers`);
    if (!response.ok) throw new Error("Failed to fetch teachers");
    return response.json();
  },

  async getEvents() {
    const response = await fetch(`${API_URL}/events`);
    if (!response.ok) throw new Error("Failed to fetch events");
    return response.json();
  },

  async getUpcomingEvents() {
    const response = await fetch(`${API_URL}/events/upcoming`);
    if (!response.ok) throw new Error("Failed to fetch upcoming events");
    return response.json();
  },

  async getArchiveEvents() {
    const response = await fetch(`${API_URL}/events/archive`);
    if (!response.ok) throw new Error("Failed to fetch archive events");
    return response.json();
  },

  async getNews() {
    const response = await fetch(`${API_URL}/news`);
    if (!response.ok) throw new Error("Failed to fetch news");
    return response.json();
  },

  async getNewsById(id) {
    const response = await fetch(`${API_URL}/news/${id}`);
    if (!response.ok) throw new Error("Failed to fetch news");
    return response.json();
  },

  async getReviews() {
    const response = await fetch(`${API_URL}/reviews`);
    if (!response.ok) throw new Error("Failed to fetch reviews");
    return response.json();
  },

  async addReview(reviewData) {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) throw new Error("Failed to add review");
    return response.json();
  },

  async getClassRooms() {
    const response = await fetch(`${API_URL}/class-rooms`);
    if (!response.ok) throw new Error("Failed to fetch class rooms");
    return response.json();
  },

  async getMenuByDay(day) {
    const response = await fetch(`${API_URL}/menu/${day}`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  async getAllMenu() {
    const response = await fetch(`${API_URL}/menu`);
    if (!response.ok) throw new Error("Failed to fetch menu");
    return response.json();
  },

  async getGallery() {
    const response = await fetch(`${API_URL}/gallery`);
    if (!response.ok) throw new Error("Failed to fetch gallery");
    return response.json();
  },

  async getGalleryByCategory(category) {
    const response = await fetch(`${API_URL}/gallery/${category}`);
    if (!response.ok) throw new Error("Failed to fetch gallery by category");
    return response.json();
  },

  async submitContact(formData) {
    const response = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit contact form");
    return response.json();
  },

  async submitRegistration(formData) {
    const response = await fetch(`${API_URL}/registration`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit registration");
    return response.json();
  },

  async submitExcursion(formData) {
    const response = await fetch(`${API_URL}/excursion`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Failed to submit excursion request");
    return response.json();
  },

  async getPrograms() {
    const response = await fetch(`${API_URL}/programs`);
    if (!response.ok) throw new Error("Failed to fetch programs");
    return response.json();
  },

  async getPricingPlans() {
    const response = await fetch(`${API_URL}/pricing/plans`);
    if (!response.ok) throw new Error("Failed to fetch pricing plans");
    return response.json();
  },

  async getFaqs() {
    const response = await fetch(`${API_URL}/pricing/faqs`);
    if (!response.ok) throw new Error("Failed to fetch faqs");
    return response.json();
  },

  async getContactInfo() {
    const response = await fetch(`${API_URL}/settings/contact`);
    if (!response.ok) throw new Error("Failed to fetch contact info");
    return response.json();
  },

  async getSocialLinks() {
    const response = await fetch(`${API_URL}/settings/social`);
    if (!response.ok) throw new Error("Failed to fetch social links");
    return response.json();
  },

  async getForumTopics() {
    const token = localStorage.getItem("token");
    console.log(
      "Fetching topics with token:",
      token ? "Token exists" : "No token",
    );

    const response = await fetch(`${API_URL}/forum/topics`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
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
    const token = localStorage.getItem("token");
    console.log(
      "Creating topic with token:",
      token ? "Token exists" : "No token",
    );
    console.log("Topic data:", topicData);
    console.log("API URL:", API_URL);

    try {
      const response = await fetch(`${API_URL}/forum/topics`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(topicData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      const responseText = await response.text();
      console.log("Response text:", responseText);

      try {
        const data = JSON.parse(responseText);
        console.log("Parsed data:", data);

        if (!response.ok) {
          const error = new Error(data.message || "Failed to create topic");
          error.status = response.status;
          error.data = data;
          throw error;
        }

        return data;
      } catch (e) {
        console.error("Failed to parse response as JSON:", responseText);
        throw new Error("Server returned invalid JSON");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error(
          "Сервер недоступен. Убедитесь, что сервер Laravel запущен (php artisan serve) и CORS настроен правильно.",
        );
      }
      throw error;
    }
  },

  async hasParentClubAccess() {
    const token = localStorage.getItem("token");
    console.log("=== hasParentClubAccess called ===");
    console.log("Token:", token ? "Token exists" : "No token");
    console.log("API_URL:", API_URL);

    if (!token) {
      console.log("No token found, returning false");
      return { has_access: false };
    }

    const url = `${API_URL}/parent-club/has-access`;
    console.log("Fetching URL:", url);

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);

        if (response.status === 401) {
          console.log("Token expired or invalid");
          localStorage.removeItem("token");
          return { has_access: false };
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      return { has_access: false };
    }
  },

  async register(userData) {
    console.log("Registering user with data:", userData);

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to logout");
    return response.json();
  },

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to get user");
    return response.json();
  },

  async getForumTopic(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/forum/topics/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
    if (!response.ok) throw new Error("Failed to fetch topic");
    return response.json();
  },

  async addForumPost(topicId, content) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/forum/topics/${topicId}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to add post");
    }

    return data;
  },
};
