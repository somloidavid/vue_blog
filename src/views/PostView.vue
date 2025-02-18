<template>
    <div class="container py-5">
        <div v-if="post" class="card shadow">
            <img :src="`/${post.image}`" :alt="post.title" class="card-img-top post-header-image">
            <div class="card-body p-4">
                <h1 class="card-title display-4 mb-2">{{ post.title }}</h1>
                <h2 class="text-muted h4 mb-4">{{ post.subtitle }}</h2>
                <div class="post-content">
                    <p class="lead mb-4">{{ post.shortText }}</p>
                    <hr class="my-4">
                    <div class="post-text">{{ post.text }}</div>
                </div>
                <div class="mt-4">
                    <span class="badge bg-primary me-2">{{ getCategoryName(post.categoryId) }}</span>
                </div>
            </div>
        </div>
        <div v-else class="alert alert-warning">
            Post not found.
        </div>
    </div>
</template>

<script>
import { usePostsStore } from '@/stores/posts';
import { onMounted, computed } from 'vue';

export default {
    props: {
        id: {
            type: String,
            required: true
        }
    },
    setup(props) {
        const postsStore = usePostsStore();

        onMounted(() => {
            postsStore.fetchPosts();
            postsStore.fetchCategories();
        });

        const postId = computed(() => parseInt(props.id));
        const post = computed(() => postsStore.getPostById(postId.value));

        const getCategoryName = (categoryId) => {
            const category = postsStore.categories.find(c => c.id === categoryId);
            return category ? category.name : '';
        };

        return { post, getCategoryName };
    }
}
</script>

<style scoped>
.post-header-image {
    height: 400px;
    object-fit: cover;
}

.post-content {
    font-size: 1.1rem;
    line-height: 1.8;
}

.post-text {
    white-space: pre-line;
}

.card {
    border: none;
    border-radius: 15px;
}

@media (max-width: 768px) {
    .post-header-image {
        height: 250px;
    }

    .display-4 {
        font-size: 2rem;
    }

    .h4 {
        font-size: 1.2rem;
    }
}
</style>