import axios from "axios";


const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Fallback to a default URL
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
    
  },
});

// Categories
export const fetchCategories = async () => api.get("/api/categories");

//Users
export const fetchUsers = async () => api.get("/api/users?populate[articles]=*&populate[avatar]=*");

//Fetch user by user name 
export const fetchUserByUsername = async (username: string) => {
  try {
    const response = await api.get(`/api/users`, {
      params: {
        filters: {
          username: {
            $eq: username,
          },
        },
        populate: ['articles', 'avatar'],
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by username:', error);
    throw error; 
  }
};

///update user


export const updateUserById = async (id: number, updatedData: any, token: string | null) => {
   // Replace with your actual authentication token if needed

  const response = await axios.put(`/api/users/${id}`, updatedData, {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Fallback to a default URL
    headers: {
      Authorization: `Bearer ${token}`, // Include token if your API requires authentication
      "Content-Type": "application/json",
    },
  });

  return response.data;
};



// Articles
export const fetchArticles = async (queryString: string) =>
  api.get(`/api/articles?${queryString}`);

// Create Article
export const createArticle = async (formData: FormData) =>
  api.post("/api/articles", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      // "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
    },
  });

// Fetch Article By Slug
export const fetchArticleBySlug = async (queryString: string) =>
  api.get(`/api/articles?${queryString}`);

//Fetch article By author name
export const fetchArticleByAuthorName = async (queryString: string) =>
  api.get(`/api/articles?${queryString}`);

 //Fetch article By documentId
 export const fetchArticleByDocumentId = async ( documentId : string, queryString: string) =>
    api.get(`/api/articles/${documentId}?${queryString}`)

 //// update article 
 export const updateArticle = async (documentId: string, updatedData: any) => 
  api.put(`/api/articles/${documentId}`, updatedData)
 


// Delete Article
export const deleteArticle = async (id: string) => {
  try {
    const response = await api.delete(`/api/articles/${id}`);
    return response.data; // Return the response data if needed
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error; // Rethrow the error for further handling if needed
  }
};

//// create article by fetch
// export const createArticle = async (formData: FormData) => {
//   try {
//     const response = await fetch(
//       `${
//         process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:1337"
//       }/api/articles`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${process.env.NEXT_PUBLIC_BACKEND_API_KEY}`,
//         },
//         body: formData,
//       }
//     );

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error creating article:", error);
//     throw error;
//   }
// };
