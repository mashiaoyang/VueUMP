<template>
  <div>
      <el-row :gutter="10">
        <el-col :span="4" v-for="(item, index) in demos" :key="index">
          <el-card>
            <router-link :to="item.to">
              <i :class="item.icon"></i>
              {{item.name}}
            </router-link>            
          </el-card>
        </el-col>        
      </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      demos: [
        { icon: 'el-icon-edit', name: '设备图', to: '/equipment'},
        { icon: 'el-icon-edit', name: '热点地图', to: '/map'},
        { icon: 'el-icon-edit', name: '红茶销量图', to: '/global'},

      ]
    }
  }
    
}
</script>