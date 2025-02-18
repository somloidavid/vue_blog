<template>
    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-body p-4">
                        <h2 class="card-title text-center mb-4">Create New Post</h2>
                        <form @submit.prevent="handleSubmit">
                            <div class="mb-3">
                                <label for="title" class="form-label">Title</label>
                                <input type="text" class="form-control" id="title" v-model="post.title" required>
                            </div>
                            <div class="mb-3">
                                <label for="subtitle" class="form-label">Subtitle</label>
                                <input type="text" class="form-control" id="subtitle" v-model="post.subtitle">
                            </div>
                            <div class="mb-3">
                                <label for="shortText" class="form-label">Short Text</label>
                                <textarea class="form-control" id="shortText" v-model="post.shortText" rows="3"
                                    required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="text" class="form-label">Full Text</label>
                                <textarea class="form-control" id="text" v-model="post.text" rows="6"
                                    required></textarea>
                            </div>
                            <div class="mb-3">
                                <label for="image" class="form-label">Image URL</label>
                                <input type="text" class="form-control" id="image" v-model="post.image" required>
                            </div>
                            <div class="mb-3">
                                <label for="category" class="form-label">Category</label>
                                <select class="form-select" id="category" v-model="post.categoryId" required>
                                    <option value="">Select a category</option>
                                    <option v-for="category in postsStore.categories" :key="category.id"
                                        :value="category.id">
                                        {{ category.name }}
                                    </option>
                                </select>
                            </div>
                            <div v-if="error" class="alert alert-danger">{{ error }}</div>
                            <div class="d-grid">
                                <button type="submit" class="btn btn-primary">Create Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { usePostsStore } from '@/stores/posts';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const postsStore = usePostsStore();
        const authStore = useAuthStore();
        const router = useRouter();
        const error = ref('');

        const post = ref({
            title: '',
            subtitle: '',
            shortText: '',
            text: '',
            image: '',
            categoryId: '',
            userId: authStore.user?.id
        });

        const handleSubmit = async () => {
            try {
                if (!authStore.user) {
                    error.value = 'You must be logged in to create a post';
                    return;
                }
                await postsStore.addPost(post.value);
                router.push('/');
            } catch (err) {
                error.value = err.message;
            }
        };

        return {
            post,
            error,
            postsStore,
            handleSubmit
        };
    }
}
</script>