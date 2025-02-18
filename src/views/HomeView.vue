<template>
  <div class="container">
    <div class="mb-4">
      <div class="row mb-3">
        <div class="col-md-6">
          <input type="text" class="form-control" placeholder="Search posts..." v-model="searchQuery">
        </div>
      </div>
      <div class="d-flex flex-wrap gap-2">
        <button class="btn btn-outline-primary" :class="{ active: !selectedCategory }" @click="selectedCategory = null">
          All Posts
        </button>
        <button v-for="category in postsStore.categories" :key="category.id" class="btn btn-outline-primary"
          :class="{ active: selectedCategory === category.id }" @click="selectedCategory = category.id">
          {{ category.name }}
        </button>
      </div>
    </div>

    <h1 class="mb-4">{{ selectedCategory ? getCategoryName(selectedCategory) : 'All' }} Posts</h1>
    <div class="row">
      <div v-for="post in filteredAndSearchedPosts" :key="post.id" class="col-md-4 mb-4">
        <div class="card h-100">
          <img :src="post.image" :alt="post.title" class="card-img-top img-fluid"
            style="height: 200px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.shortText }}</p>
            <router-link :to="{ name: 'post', params: { id: post.id } }" class="btn btn-primary">Read More</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts';
import { ref, computed } from 'vue';

export default {
  setup() {
    const postsStore = usePostsStore();
    const selectedCategory = ref(null);
    const searchQuery = ref('');

    const filteredPosts = computed(() => {
      if (!selectedCategory.value) {
        return postsStore.posts;
      }
      return postsStore.posts.filter(post => post.categoryId === selectedCategory.value);
    });

    const filteredAndSearchedPosts = computed(() => {
      const search = searchQuery.value.toLowerCase().trim();
      if (!search) return filteredPosts.value;
      return filteredPosts.value.filter(post =>
        post.title.toLowerCase().includes(search)
      );
    });

    const getCategoryName = (categoryId) => {
      const category = postsStore.categories.find(c => c.id === categoryId);
      return category ? category.name : '';
    };

    return {
      postsStore,
      selectedCategory,
      searchQuery,
      filteredAndSearchedPosts,
      getCategoryName
    };
  }
}
</script>