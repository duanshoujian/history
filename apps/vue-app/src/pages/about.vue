<template>
  <div class="about-page">
    <h1>历史时间轴</h1>
    <div class="timeline-container">
      <div class="timeline">
        <div
          v-for="(item, index) in history"
          :key="index"
          class="timeline-item"
          :class="{ active: activeIndex === index }"
          @click="todoSomething(index)"
        >
          <div class="timeline-dot"></div>
          <div class="timeline-date">{{ item.startYear }}</div>
        </div>
      </div>

      <div class="timeline-content">
        <div
          v-for="(item, index) in history"
          :key="index"
          class="history-card"
          :class="{ active: activeIndex === index }"
        >
          <h2 class="dynasty-title">{{ item.dynasty }}</h2>
          <p class="dynasty-description">{{ item.notes }}</p>

          <div class="figures-container">
            <h3 class="figures-title">重要人物</h3>
            <div class="figures-grid">
              <PersonCard
                v-for="(figure, figureIndex) in figures"
                :key="figureIndex"
                :name="figure.name"
                :description="figure.description"
                :image-url="getFigureImage(figure.image)"
                :dynasty="item.dynasty"
                :period="`${item.startYear} - ${item.endYear}`"
                @click="handleFigureClick(figure.name, figure._id || '')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { get } from "@/utils/request";
import { DynastyRecord, Figure } from "@monorepo/shared";
import { onMounted, ref } from "vue";
import PersonCard from "@/components/PersonCard.vue";
import { useRouter } from 'vue-router';

const router = useRouter();
const history = ref<DynastyRecord[]>([]);
const activeIndex = ref(0);
const figures = ref<Figure[]>([]);

const todoSomething = (index: number) => {
  setActiveIndex(index);
  getFigures(history.value[index].dynasty);
};

const setActiveIndex = (index: number) => {
  activeIndex.value = index;
};

const getFigures = async (dynasty: string) => {
  const res = await get<Figure[]>(`/figure/dynasty/${dynasty}`);
  figures.value = res;
};

const getFigureImage = (figure: string) => {
  console.log({ figure });
  return `${figure}`;
};

const handleFigureClick = (name: string, _id: string) => {
  router.push(`/figure/${encodeURIComponent(name)}?id=${_id}`);
};

onMounted(async () => {
  const res = await get<DynastyRecord[]>("/history/all");
  history.value = res;
  console.log(history.value);
});
</script>

<style scoped>
.about-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

h1 {
  color: #42b883;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
}

.timeline-container {
  position: relative;
  padding: 2rem 0;
}

.timeline {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  padding: 0 2rem;
}

.timeline::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.timeline-item {
  position: relative;
  z-index: 2;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
}

.timeline-dot {
  width: 20px;
  height: 20px;
  background: #fff;
  border: 3px solid #42b883;
  border-radius: 50%;
  margin: 0 auto 0.5rem;
  transition: all 0.3s ease;
}

.timeline-item.active .timeline-dot {
  background: #42b883;
  transform: scale(1.2);
}

.timeline-date {
  font-size: 0.9rem;
  color: #666;
}

.timeline-content {
  position: relative;
  min-height: 300px;
}

.history-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease;
  pointer-events: none;
}

.history-card.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dynasty-title {
  color: #42b883;
  font-size: 2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.dynasty-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.figures-container {
  margin-top: 2rem;
}

.figures-title {
  color: #42b883;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  text-align: center;
}

.figures-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  justify-items: center;
  padding: 1rem;
}
</style>
