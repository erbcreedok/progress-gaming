<template>
    <router-link class="box news-block d-block"
                 v-if="article"
                 :to="'/article/' + article.article">
        <progressive-background class="pg-bg"
                                :src="article.image.hq"
                                :placeholder="article.image.thumb"
                                :fallback="article.image.src"
        ></progressive-background>
        <div class="box-tag">
            <span class="text-uppercase" v-html="article.category"></span>
        </div>
        <div class="content">
            <h3 class="mb-20" v-html="article.title"></h3>
            <div class="h-line mb-3"></div>
            <p class="normal" v-html="article.subtitle"></p>
        </div>
    </router-link>
</template>

<script>
    export default {
        name: 'news-block',
        props: ['article']
    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/3-base/variables";
    .box.news-block {
        padding: 25px;
        height: 350px;
        max-width: 325px;
        cursor: pointer;
        text-decoration: none;
        outline: none;
        .pg-bg {
            z-index: 1;
        }
        &:after {
            content:'';position:absolute;top:0;left:0;right:0;bottom:0;
            background: rgba(0,0,0,.2);
            z-index: 2;
            transition: .3s;
        }
        &:hover:after {
            background: rgba(0,0,0,.7);
        }
        .box-tag {
            background: $black;
            color: $white;
            border-radius: 13px 0;
            height: 26px;
            min-width: 70px;
            box-shadow: 0 1px 2px rgba($black, .16);
            position: absolute;
            top:25px;right: 25px;
            z-index: 3;
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
            line-height: 26px;
            padding: 0 5px;
        }
        .content {
            color: $white;
            position: relative;
            z-index:10;
            top: 120px;
            h3 {
                height: 72px;
                overflow: hidden;
            }
            p {
                height: 68px;
                overflow: hidden;
            }
        }
    }
</style>