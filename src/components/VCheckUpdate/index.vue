<script setup lang="ts">
defineOptions({
  name: 'FaCheckUpdates',
})

const visible = ref(false)
const lastVersionTag = ref('')
const checkUpdatesInterval = ref(Number.NaN)

async function getVersionTag() {
  try {
    const response = await fetch(`${location.origin}${location.pathname}`, {
      cache: 'no-cache',
      method: 'HEAD',
    })
    return response.headers.get('etag') || response.headers.get('last-modified')
  }
  catch {
    console.error('检查更新失败')
  }
}

async function checkUpdates() {
  const versionTag = await getVersionTag()
  if (!versionTag) {
    return
  }
  if (!lastVersionTag.value) {
    lastVersionTag.value = versionTag
    return
  }
  if (visible.value) {
    return
  }
  if (lastVersionTag.value !== versionTag && versionTag) {
    stopInterval()
    visible.value = true
    ElMessageBox.confirm(
      '发现新版本，是否刷新页面？',
      '提示',
      {
        confirmButtonText: '刷新',
        cancelButtonText: '取消',
        type: 'warning',
      },
    ).then(() => {
      location.reload()
    })
  }
}

function startInterval() {
  checkUpdates()
  checkUpdatesInterval.value = window.setInterval(checkUpdates, 60_000)
}

function stopInterval() {
  clearInterval(checkUpdatesInterval.value)
}

function handleVisibilitychange() {
  if (document.hidden) {
    stop()
  }
  else {
    checkUpdates().finally(() => {
      startInterval()
    })
  }
}

onMounted(() => {
  if (import.meta.env.PROD) {
    startInterval()
    document.addEventListener('visibilitychange', handleVisibilitychange)
  }
})

onUnmounted(() => {
  if (import.meta.env.PROD) {
    stopInterval()
    document.removeEventListener('visibilitychange', handleVisibilitychange)
  }
})
</script>
