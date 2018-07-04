<template>
    <div class="article-block"
         @click="handleClick">
        <progressive-background
                class="mb-4 article-img"
                :src="article.image.hq"
                :placeholder="article.image.thumb"
                :fallback="article.image.src"
        ></progressive-background>
        <p class="normal" v-html="article.title"></p>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'article-block',
        props: ['article'],
        methods: {
            handleClick() {
                this.$emit('click');
            }
        }
    }
</script>

<style scoped lang="scss">
    .article-block {
        cursor: zoom-in;
        .article-img {
            height: 162px;
            border-radius: 2.7px;
            overflow: hidden;
            position: relative;
            &:before {
                content: "\E90A";
                font-family: 'icons-pg' !important;
                display: block;
                color: white;
                font-size: 3rem;
                z-index: 4;
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                text-align: center;
                height: 40px;
                line-height: 40px;
                margin: auto;
                opacity: 0;
                transition: .3s;
            }
            &:after {
                content: '';
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
                background: rgba(0,0,0,.4);
                opacity: 0;
                z-index:3;
                transition: .3s;
            }
        }
        p {
            height: 34px;
            overflow: hidden;
        }
        &:hover {
            .article-img:before {
                opacity: 1;
            }
            .article-img:after {
                opacity: 1;
            }
        }
    }

</style>