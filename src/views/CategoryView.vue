<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Recent Posts</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="post in postsStore.recentPosts" :key="post.id" class="bg-white rounded-lg shadow-md p-4">
                <img :src="post.image" :alt="post.title" class="w-full h-48 object-cover mb-2 rounded-md">
                <h2 class="text-xl font-semibold mb-2">{{ post.title }}</h2>
                <p class="text-gray-700">{{ post.shortText }}</p>
                <router-link :to="{ name: 'post', params: { id: post.id } }"
                    class="inline-block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Read
                    More</router-link>
            </div>
        </div>

        <h2 class="text-xl font-bold mt-8 mb-4">Categories</h2>
        <div class="flex flex-wrap gap-2">
            <router-link v-for="category in postsStore.categories" :key="category.id"
                :to="{ name: 'category', params: { id: category.id } }"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full">{{ category.name
                }}</router-link>
        </div>
    </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts';
import { onMounted } from 'vue';

export default {
    setup() {
        const postsStore = usePostsStore();

        onMounted(() => {
            postsStore.fetchPosts();
            postsStore.fetchCategories();
        });

        return { postsStore };
    }
}
</script>