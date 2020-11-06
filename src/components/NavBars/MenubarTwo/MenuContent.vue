<template>
    <component :is="componentName" :item="item"></component>   
</template>

<script>
import SubChildren from './SubChildren'
import SubItem from './SubItem'

export default {
    name: "MenuContent",
    components: { SubChildren, SubItem },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        componentName () {
            if(this.item != null && this.item.hasOwnProperty('children')) {
                return "SubChildren"
            } else {
                return "SubItem"
            }
        }
    },
}
</script>