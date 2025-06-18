<template>
  <div class="article-detail">
    <div class="article-header">
      <h1>{{ article?.title }}</h1>
      <div class="article-meta">
        <span class="author">作者：{{ article?.author }}</span>
        <span class="date">发布时间：{{ formatDate(article?.createdAt) }}</span>
        <span class="views">阅读量：{{ article?.viewCount }}</span>
      </div>
      <div class="article-tags" v-if="article?.tags?.length">
        <span v-for="tag in article?.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>

    <div class="article-content">
      <div class="content" v-html="renderedContent"></div>
    </div>

    <div class="article-footer">
      <div class="status-badge" :class="article?.status">
        {{ getStatusText(article?.status) }}
      </div>
      <div class="update-time">
        最后更新：{{ formatDate(article?.updatedAt) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { marked } from 'marked';
import { get } from '@/utils/request';
import { Article } from '@monorepo/shared';

const route = useRoute();
const article = ref<Article | null>(null);

// 配置marked选项
marked.setOptions({
  breaks: true, // 支持换行
  gfm: true, // 支持GitHub风格的Markdown
});

// 计算属性：将Markdown内容转换为HTML
const renderedContent = computed(() => {
  if (!article.value?.content) return '';
  try {
    return marked(article.value.content);
  } catch (error) {
    console.error('Markdown parsing error:', error);
    return article.value.content; // 如果解析失败，返回原始内容
  }
});

const formatDate = (date?: Date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

const getStatusText = (status?: string) => {
  const statusMap: Record<string, string> = {
    draft: '草稿',
    published: '已发布',
    archived: '已归档'
  };
  return statusMap[status || ''] || status;
};

onMounted(async () => {
  const id = route.query.id as string;
  try {
    const response = await get<Article>(`/articles/person/${id}`);
    article.value = response;
  } catch (error) {
    console.error('Failed to fetch article details:', error);
  }
});
</script>

<style scoped>
.article-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.article-header {
  margin-bottom: 3rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 2rem;
}

.article-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 1.5rem;
}

.article-meta {
  display: flex;
  gap: 2rem;
  color: #666;
  margin-bottom: 1rem;
}

.article-tags {
  display: flex;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.tag {
  background: #e8f5e9;
  color: #42b883;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.article-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #333;
}

.article-content :deep(h2) {
  color: #42b883;
  margin: 2rem 0 1rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
}

/* Markdown 样式 */
.article-content :deep(h1) {
  font-size: 2rem;
  color: #333;
  margin: 2rem 0 1rem;
  border-bottom: 2px solid #42b883;
  padding-bottom: 0.5rem;
}

.article-content :deep(h2) {
  font-size: 1.5rem;
  color: #42b883;
  margin: 1.5rem 0 1rem;
}

.article-content :deep(h3) {
  font-size: 1.3rem;
  color: #555;
  margin: 1.3rem 0 0.8rem;
}

.article-content :deep(h4) {
  font-size: 1.1rem;
  color: #666;
  margin: 1.1rem 0 0.6rem;
}

.article-content :deep(p) {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.article-content :deep(ul), .article-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.article-content :deep(li) {
  margin-bottom: 0.5rem;
}

.article-content :deep(blockquote) {
  border-left: 4px solid #42b883;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #666;
  font-style: italic;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 0 4px 4px 0;
}

.article-content :deep(code) {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #e74c3c;
}

.article-content :deep(pre) {
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-size: 0.9rem;
}

.article-content :deep(a) {
  color: #42b883;
  text-decoration: none;
}

.article-content :deep(a:hover) {
  text-decoration: underline;
}

.article-content :deep(strong) {
  font-weight: bold;
  color: #333;
}

.article-content :deep(em) {
  font-style: italic;
  color: #555;
}

.article-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.article-content :deep(th), .article-content :deep(td) {
  border: 1px solid #ddd;
  padding: 0.75rem;
  text-align: left;
}

.article-content :deep(th) {
  background: #f8f9fa;
  font-weight: bold;
}

.article-content :deep(hr) {
  border: none;
  border-top: 1px solid #eee;
  margin: 2rem 0;
}

.article-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 1rem 0;
}

.article-footer {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
}

.status-badge {
  padding: 0.4rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.status-badge.draft {
  background: #fff3e0;
  color: #f57c00;
}

.status-badge.published {
  background: #e8f5e9;
  color: #42b883;
}

.status-badge.archived {
  background: #f5f5f5;
  color: #757575;
}
</style> 