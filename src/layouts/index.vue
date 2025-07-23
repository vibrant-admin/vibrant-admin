<script setup lang="ts">
import Header from './components/Header/index.vue'
import Sidebar from './components/Sidebar/index.vue'
import Tabbar from './components/Tabbar/index.vue'

const route = useRoute()
const keepAliveStore = useKeepAliveStore()
const isLink = computed(() => !!route.meta.link)
</script>

<template>
  <div class="flex flex-col h-[100vh] w-[100vw] relative">
    <div class="text-foreground border-b border-border bg-background h-[60px] w-full transition-colors">
      <Header />
    </div>
    <div class="flex flex-1 overflow-hidden">
      <div class="border-r border-border flex-none h-[100%] w-[250px] transition-colors">
        <Sidebar />
      </div>
      <div class="bg-[--main-area-bg] flex flex-auto flex-col w-0 transition-colors">
        <div class="p-1 border-b border-border transition-colors">
          <Tabbar />
        </div>
        <div class="p-4 flex-1 overflow-auto">
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
