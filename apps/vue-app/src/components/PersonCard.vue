<template>
  <div class="person-card" @click="$emit('click', name)">
    <div class="card-image">
      <img :src="imageUrl" :alt="name" />
    </div>
    <div class="card-content">
      <h3>{{ name }}</h3>
      <p class="description">{{ description }}</p>
      <div class="dynasty-info">
        <span class="dynasty">{{ dynasty }}</span>
        <span class="period">{{ period }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  description: string;
  imageUrl: string;
  dynasty: string;
  period: string;
}>();

defineEmits<{
  (e: 'click', name: string): void;
}>();
</script>

<style scoped>
.person-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  width: 280px;
  margin: 1rem;
}

.person-card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: 320px;
  overflow: hidden;
  position: relative;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
}

h3 {
  color: #42b883;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
}

.description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.dynasty-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #888;
  font-size: 0.9rem;
}

.dynasty {
  color: #42b883;
  font-weight: 500;
}

.period {
  color: #666;
}
</style> 