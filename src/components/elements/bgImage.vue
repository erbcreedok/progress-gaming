<template>
    <progressive-img :class="'bg-image bg-image-' + pos"
                     :src="image.hq"
                     :fallback="image.src"
                     :placeholder="image.thumb"
    ></progressive-img>
</template>

<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'bg-image',
        props: {
            pos: '',
            image: {},
        }
    }
</script>

<style scoped lang="scss">
    .bg-image{
        position: absolute;
        z-index:1;
        bottom: 0;
        opacity: .4;
        &.bg-image-left {
            left: 0;
            width: 200px;
        }
        &.bg-image-right {
            right: -80px;
            width: 200px;
        }
    }
</style>