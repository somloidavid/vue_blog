import { defineStore } from 'pinia'
import axios from 'axios'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    categories: [],
    searchQuery: '',
  }),
  getters: {
    recentPosts: (state) => state.posts.slice(0, 6),
    filteredPosts: (state) => {
      const query = state.searchQuery.toLowerCase()
      return state.posts.filter((post) => post.title.toLowerCase().includes(query))
    },
    postsByCategory: (state) => (categoryId) => {
      return state.posts.filter((post) => post.categoryId === categoryId)
    },
    getPostById: (state) => (postId) => {
      return state.posts.find((post) => post.id === postId)
    }
  },
  actions: {
    async fetchPosts() {
      const response = await axios.get('/posts')
      this.posts = response.data
    },
    async fetchCategories() {
      const response = await axios.get('/categories')
      this.categories = response.data
    },
    async addPost(post) {
      try {
        const response = await axios.post('/posts', post, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.posts.push(response.data);
      } catch (error) {
        console.error("Error adding post:", error);
        throw error;
      }
    },
    async updatePost(post) {
      try {
        const response = await axios.put(`/posts/${post.id}`, post, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const index = this.posts.findIndex((p) => p.id === post.id)
        if (index !== -1) {
          this.posts[index] = response.data
        }
      } catch (error) {
        console.error("Error updating post:", error);
        throw error;
      }
    },
    async deletePost(postId) {
      try {
        await axios.delete(`/posts/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        this.posts = this.posts.filter((post) => post.id !== postId)
      } catch (error) {
        console.error("Error deleting post:", error);
        throw error;
      }
    },
  },
})