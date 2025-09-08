<template>
  <div class="nav-button" @click="showMenu">
    <MenuOutlined />
    <a-popover
      placement="bottomRight"
      trigger="click"
      v-model:open="popoverVisible"
      overlay-class-name="reset-popover"
    >
      <template #content>
        <NavLinks />
      </template>
    </a-popover>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MenuOutlined } from '@ant-design/icons-vue'
import NavLinks from './NavLinks.vue'
import { useGlobalStore } from '../composables'

const globalStore = useGlobalStore()
const popoverVisible = ref(false)

const showMenu = () => {
  globalStore.setNavStyle('inline')
  popoverVisible.value = true
}
</script>

<style lang="less">
@import '../styles/palette.less';

.nav-button {
  cursor: pointer;
  display: none;
  position: absolute;
  padding: 0 0.6rem;
  right: 0.8rem;
  top: 0.1875rem;
  z-index: 3;
  font-size: 1.375rem;
  color: #828282;
  line-height: @navbarHeight;
}

.reset-popover {
  width: 16rem;

  :deep(.ant-popover-inner-content) {
    padding: 0;
  }
}

@media (max-width: @MQMobile) {
  .nav-button {
    display: block;
  }
}
</style>
