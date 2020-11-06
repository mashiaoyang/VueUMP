<template>
    <div>
        <el-row>
            <panel-group></panel-group>
        </el-row>
       <el-row>
           <map-flow></map-flow> 
       </el-row>
       <el-row>
           
       </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/PanelGroup'
import MapFlow from './components/MapFlow.vue'

export default {
    components: { MapFlow, PanelGroup }
}
</script>