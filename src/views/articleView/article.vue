<template>
    <div class="media-page">
        <div class="article-body" v-if="article && article!=={} && article.id">
        <div class="section">
            <progressive-background
                    class="section-bg bluefy"
                    :src="article.image.hq"
                    :placeholder="article.image.thumb"
                    :fallback="article.image.src"
            ></progressive-background>
            <div class="container py-80 color-white">
                <p class="normal mb-60">
                    <router-link class="no-appearance" to="/news">
                        <span class="icon-arrow-left mr-3"></span> <span class="text-uppercase">ВЕРНУТЬСЯ НАЗАД</span>
                    </router-link>
                </p>
                <h1 class="font-weight-medium mb-40" v-html="article.title">
                </h1>
                <p class="normal mb-20">
                    Дата выпуска: <span class="color-orange">4 июнь, 2018</span>
                </p>
                <p class="normal mb-20">
                    Категория выпуска: <span class="color-orange" v-html="article.category"></span>
                </p>

            </div>
        </div>
        <section class="bg-white py-70">
            <div class="container">
                <article v-html="article.body"></article>
            </div>
        </section>
        <section class="bg-light-yellow py-70">
            <div class="container">
                <div class="d-flex mb-5">
                    <h2 class="text-uppercase">ВАМ БУДЕТ ИНТЕРЕСНО УЗНАТЬ</h2>
                    <button-arrows v-if="article.related && article.related.length>3"
                                   :leftDisabled="newsSlickAccess.left"
                                   :rightDisabled="newsSlickAccess.right"
                                   @onLeftClick="prevNews()"
                                   @onRightClick="nextNews()"
                                   class="d-inline-block"
                    ></button-arrows>
                </div>
                <slick class="row mb-5 slick-rounded-sm"
                       v-if="article.related && article.related.length !== 0"
                       ref="newsSlick" :options="newsOptions"
                       @afterChange="handleNewsSlickChange"
                >
                    <div class="col-12" v-for="(newsItem, index) in article.related" :key="index">
                        <news-block :article="newsItem"></news-block>
                    </div>
                </slick>
            </div>
        </section>
        <family-section></family-section>
    </div>
        <div class="bg-white" v-else style="height: 100vh"></div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex';
    import VueProgressiveImage from 'vue-progressive-image'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import ButtonArrows from '@/components/elements/ButtonArrows'
    import NewsBlock from '@/components/elements/NewsBlock'
    import Slick from 'vue-slick'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'ArticleView',
        components: { FamilySection, ButtonArrows, NewsBlock, Slick },
        props: {
        },
        data() {
            return {
                newsOptions: {
                    slidesToShow: 3,
                    infinite: false,
                    arrows: false,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 2
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                centerPadding: '100px',
                            }
                        },
                        {
                            breakpoint: 520,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                centerPadding: '15%',
                            }
                        },
                        {
                            breakpoint: 380,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                centerPadding: '30px',
                            }
                        }
                    ]
                },
                newsSlickAccess: {
                    left: true,
                    right: false
                }
            }
        },
        computed: {
            ...mapState({
                article: state => state.article.article,
                news: state => state.news.top,
            })
        },
        methods: {
            prevNews() {
                this.$refs.newsSlick.prev();
            },
            nextNews() {
                this.$refs.newsSlick.next();
            },
            handleNewsSlickChange(event, slick, currentSlide) {
                this.newsSlickAccess.left  = currentSlide===0;
                this.newsSlickAccess.right = currentSlide >= (slick.slideCount - slick.options.slidesToShow);
            },
            reInit() {
                // Helpful if you have to deal with v-for to update dynamic lists
                this.$nextTick(() => {
                    this.$refs.newsSlick.reSlick();
                });
            }
        },
        beforeCreate() {
            const articleId = this.$route.params.id;
            this.$store.dispatch('article/getArticle', articleId)
        },

    }
</script>

<style scoped lang="scss">
    a.no-appearance {
        opacity: 1;
        transition: .3s;
        &:hover {
            opacity: .7;
        }
    }
    .bluefy:after {
        content: '';
        display: block;
        z-index: 1;
        position: absolute;
        background: rgba(#3C8EB7,.3);
        top:0;left:0;right:0;bottom:0;
        margin: auto;
    }
    article {
        & /deep/ h2 {
            margin-bottom: 3rem;
        }
        & /deep/ p {
            margin-bottom: 2rem;
        }
        & /deep/ iframe {
            max-width: 100%;
            width: 600px;
            border-radius: 10px;
        }
        & /deep/ [data-oembed-url] {
            overflow: auto;
            & > div {
                max-width: 100% !important;
                width: 600px;
                margin-top: 4rem;
                margin-bottom: 4rem;
                border-radius: 10px;
                overflow: hidden;
            }
        }
    }
</style>