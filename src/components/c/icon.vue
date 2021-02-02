<template>
    <v-icon :large="large"><slot /></v-icon>
</template>
<script>
export default {
    props:{
        large:{
            type: Boolean,
            default: false
        }
    }
}
</script>