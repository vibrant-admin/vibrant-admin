export const useNotificationStore = defineStore('notification', () => {
  // 消息
  const messageList = ref([])
  const messageCount = ref(0)

  // 待办
  const todoList = ref([])
  const todoCount = ref(0)

  // 总数
  const total = computed(() => messageCount.value + todoCount.value)

  // 初始化
  function init() {
    getUnreadMessage()
    getUnreadTodo()
  }

  // 获取未读消息
  async function getUnreadMessage() {
    // 模拟
    messageCount.value = 20
  }

  // 获取未读待办
  async function getUnreadTodo() {
    // 模拟
    todoCount.value = 0
  }

  return {
    messageList,
    messageCount,
    todoList,
    todoCount,
    total,
    init,
  }
})
