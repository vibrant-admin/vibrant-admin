<script setup lang="ts">
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'

const route = useRoute()
const keepAliveStore = useKeepAliveStore()
const isIframe = computed(() => !!route.meta.iframe)
const isLink = computed(() => !!route.meta.link)
</script>

<template>
  <div class="relative h-[100vh] w-[100vw] flex flex-col">
    <Header />
    <div class="flex flex-auto">
      <div class="h-[100%] w-[250px] bg-red-500">
        <Sidebar />
      </div>
      <div>
        <RouterView v-slot="{ Component }">
          <Transition mode="out-in">
            <KeepAlive :include="keepAliveStore.list">
              <component :is="Component" v-show="!(isIframe || isLink)" :key="route.fullPath" />
            </KeepAlive>
          </Transition>
        </RouterView>
      </div>
    </div>
  </div>
</template>
