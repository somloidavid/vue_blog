<template>
    <div class="container mx-auto py-8">
        <h1 class="text-2xl font-bold mb-4">Edit Post</h1>
        <form v-if="post" @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-8">
            <div class="mb-4">
                <label for="title" class="block text-gray-700 text-sm font-bold mb-2">Title:</label>
                <input type="text" id="title" v-model="title"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="subtitle" class="block text-gray-700 text-sm font-bold mb-2">Subtitle:</label>
                <input type="text" id="subtitle" v-model="subtitle"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="shortText" class="block text-gray-700 text-sm font-bold mb-2">Short Text:</label>
                <textarea id="shortText" v-model="shortText"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div class="mb-4">
                <label for="text" class="block text-gray-700 text-sm font-bold mb-2">Text:</label>
                <textarea id="text" v-model="text"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div class="mb-4">
                <label for="image" class="block text-gray-700 text-sm font-bold mb-2">Image URL:</label>
                <input type="text" id="image" v-model="image"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>
            <div class="mb-4">
                <label for="categoryId" class="block text-gray-700 text-sm font-bold mb-2">Category:</label>
                <select id="categoryId" v-model="categoryId"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    <option v-for="category in postsStore.categories" :key="category.id" :value="category.id">{{
                        category.name }}</option>
                </select>
            </div>
            <button type="submit"
                class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update
                Post</button>
        </form>
        <div v-else class="text-gray-500">
            Post not found.
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const postsStore = usePostsStore();
        const router = useRouter();
        const route = useRoute();
        const authStore = useAuthStore();

        const postId = computed(() => parseInt(props.id));
        const post = computed(() => postsStore.getPostById(postId.value));

        const title = ref('');
        const subtitle = ref('');
        const shortText = ref('');
        const text = ref('');
        const image = ref('');
        const categoryId = ref(null);

        onMounted(() => {
            postsStore.fetchPosts();

            if (post.value) {
                title.value = post.value.title;
                subtitle.value = post.value.subtitle;
                shortText.value = post.value.shortText;
                text.value = post.value.text;
                image.value = post.value.image;
                categoryId.value = post.value.categoryId;
            }
        });

        const handleSubmit = async () => {
            try {
                const updatedPost = {
                    id: postId.value,
                    title: title.value,
                    subtitle: subtitle.value,
                    shortText: shortText.value,
                    text: text.value,
                    image: image.value,
                    categoryId: parseInt(categoryId.value),
                    userId: authStore.user.id
                };

                await postsStore.updatePost(updatedPost);
                router.push(`/posts/${postId.value}`);
            } catch (error) {
                console.error("Error updating post:", error);
            }
        };

        return {
            post,
            title,
            subtitle,
            shortText,
            text,
            image,
            categoryId,
            handleSubmit
        };
    },
};
</script>