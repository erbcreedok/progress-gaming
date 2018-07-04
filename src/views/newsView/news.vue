<template>
    <div class="news-page">
        <section class="bg-light-yellow py-70">
            <div class="container mb-70">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Новости академии</span>
                    </h3>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-4" v-for="(article, index) in allNews" :key="index">
                        <news-block class="mb-5 mx-auto" :article="article"></news-block>
                    </div>
                </div>
                <b-button v-if="allNews.length!==0 && allNews.length < allNewsCount" class="mx-auto my-5 d-block" variant="transparent-black" size="sm" @click="loadMore()">
                    Показать еще
                </b-button>
            </div>
        </section>
        <family-section></family-section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex';
    import VueProgressiveImage from 'vue-progressive-image'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import NewsBlock from '@/components/elements/NewsBlock'
    import ButtonArrows from '@/components/elements/ButtonArrows'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'NewsView',
        components: { FamilySection, NewsBlock, ButtonArrows },
        props: {
        },
        data() {
            return {
                page: 1,
            }
        },
        computed: {
            ...mapState({
                allNews: state => state.news.all,
                allNewsCount: state => state.news.allCount,
                itemsPerPage: state => state.news.itemsPerPage
            })
        },
        methods: {
            loadMore() {
                this.$store.dispatch('news/getPageNews', ++this.page);
            }
        },
        beforeMount() {
            this.$store.dispatch('news/getAllNewsCount').then(() => {
                this.$store.dispatch('news/getPageNews', this.page);
            });
        },
    }
</script>

<style scoped lang="scss" src="./news-page.scss"/>