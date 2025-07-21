<script setup lang="ts">
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Tabbar from './components/Tabbar/index.vue'

const route = useRoute()
const keepAliveStore = useKeepAliveStore()
const isLink = computed(() => !!route.meta.link)
</script>

<template>
  <div class="relative h-[100vh] w-[100vw] flex flex-col">
    <div class="h-[60px] w-full border-b border-border bg-background text-foreground transition-colors">
      <Header />
    </div>
    <div class="flex flex-1 overflow-hidden">
      <div class="h-[100%] w-[250px] flex-none border-r border-border transition-colors">
        <Sidebar />
      </div>
      <div class="w-0 flex flex-auto flex-col bg-[--main-area-bg] transition-colors">
        <div class="border-b border-border p-1 transition-colors">
          <Tabbar />
        </div>
        <div class="flex-1 overflow-auto p-4">
          <RouterView v-slot="{ Component }">
            <Transition mode="out-in">
              <KeepAlive :include="keepAliveStore.list">
                <component :is="Component" v-show="!(isLink)" :key="route.fullPath" />
              </KeepAlive>
            </Transition>
          </RouterView>
        </div>
      </div>
    </div>
  </div>
</template>
