<template>
    <div class="main-page">
        <section class="main-jumbotron color-white py-70">
        <progressive-background class="section-bg"
                                placeholder="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/bg-thumb.jpg?alt=media&token=50710fed-37f2-46f4-a74c-a70d79ef7f03"
                                src="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/bg.jpg?alt=media&token=f31535e0-c161-4b39-b2bc-015d19435539"
        ></progressive-background>
        <div class="container">
            <div class="row mb-5">
                <div class="col-xl-7">
                    <h1>
                        Киберспортивная организация ProgressGaming
                    </h1>
                </div>
            </div>
            <div class="row">
                <div class="col-md-7" style="border-radius: 10px; overflow: hidden">
                    <slick class="row flex-nowrap" ref="boxes" :options="boxOptions">
                        <div class="col-12">
                            <div class="box d-flex align-items-center" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/box1%402x-min.jpg?alt=media&token=52429935-0725-4e10-87d8-3cf1d1a33ad8)">
                                <progressive-background src="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/box1-min.jpg?alt=media&token=77ee2d3f-48bd-491e-9c61-b373ed25ddbf" placeholder="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/box1-thumb-min.jpg?alt=media&token=c52aa294-4530-43ab-94ba-fe0cf8199da0" class="pg-bg"></progressive-background>
                                <div class="content">
                                    <h2 class="mb-3">Стань PRO!</h2>
                                    <p class="mb-60">Тренировки по DOTA 2</p>
                                    <ul class="pl-4 normal mb-5">
                                        <li class="mb-3">Развивай навыки индивидуальной и командной игры</li>
                                        <li class="mb-3">Участвуй в турнирах</li>
                                        <li class="mb-3">Опытные тренера и надежные партнеры – залог успеха</li>
                                        <li>Будь лучшим и попади в профессиональную команду PG</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="box d-flex align-items-center" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo%402x-min.jpg?alt=media&token=fda8297a-6eee-4e97-8588-0cbd45d3c652)">
                                <progressive-background src="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo-min.jpg?alt=media&token=359b401f-c0fe-4bd8-b6c5-3e9495298e0c" placeholder="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo-min.jpg?alt=media&token=359b401f-c0fe-4bd8-b6c5-3e9495298e0c" class="pg-bg"></progressive-background>
                                <div class="content">
                                    <h2 class="mb-3">Стань PRO!</h2>
                                    <p class="mb-60">Тренировки по CS:GO</p>
                                    <ul class="pl-4 normal mb-5">
                                        <li class="mb-3">Совершенствуй AIM</li>
                                        <li class="mb-3">Участвуй в турнирах</li>
                                        <li class="mb-3">Изучай командные тактики под руководством тренера</li>
                                        <li>Будь лучшим и попади в профессиональную команду PG</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </slick>
                    <button-arrows @onLeftClick="prev()" @onRightClick="next()" class="box-button"></button-arrows>
                </div>
                <div class="d-none d-md-block col-md-5">
                    <div class="vk-box" style="background: #FCFCFC; max-height: 380px;overflow: hidden;border-radius: 10px;">
                        <div id="vk_groups"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
        <section class="main-news bg-light-yellow py-70">
            <bg-image v-for="(bgImage, index) in bgImages"
                      :key="index"
                      :image="bgImage.image"
                      :pos="bgImage.pos"></bg-image>
            <div class="container">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Новости академии</span>
                    </h3>
                    <router-link to="news" class="btn btn-sm btn-transparent ml-auto mr-4">
                        Посмотреть все
                    </router-link>
                    <button-arrows v-if="news && news.length>3"
                                   :leftDisabled="newsSlickAccess.left"
                                   :rightDisabled="newsSlickAccess.right"
                                   @onLeftClick="prevNews()"
                                   @onRightClick="nextNews()"
                                   class="d-inline-block"
                    ></button-arrows>
                </div>
                <slick class="row mb-5 slick-rounded-sm"
                       v-if="news && news.length !== 0"
                       ref="newsSlick" :options="newsOptions"
                       @afterChange="handleNewsSlickChange"
                >
                    <div class="col-12" v-for="(article, index) in news" :key="index">
                        <news-block :article="article" class="mb-0"></news-block>
                    </div>
                </slick>
            </div>
        </section>
        <family-section></family-section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex';
    import VueProgressiveImage from 'vue-progressive-image'
    import ButtonArrows from '@/components/elements/ButtonArrows'
    import NewsBlock from '@/components/elements/NewsBlock'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import BgImage from '@/components/elements/bgImage'
    import Slick from 'vue-slick'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'MainView',
        components: {Slick, ButtonArrows, NewsBlock, FamilySection, BgImage},
        props: {
        },
        data() {
            return {
                boxOptions: {
                    speed: 300,
                    slidesToShow: 1,
                    arrows: false,
                    fade: false,
                    cssEase: 'linear',
                },
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
                },
                bgImages: [
                    {
                        pos: 'left',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/skull%402x-min.jpg?alt=media&token=ee0aeb2d-1215-40e0-9fb0-9d0752d7b0f7',
                            thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/skull-thumb-min.jpg?alt=media&token=dc941100-8cce-48cb-ad75-35eb024c6943'
                        }
                    },
                    {
                        pos: 'right',
                        image: {
                            src: "https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/soldier%402x-min.jpg?alt=media&token=68b93fab-2058-4fdf-adf0-e9fb024678c6",
                            thumb: "https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/soldier%400%2C1x-min.jpg?alt=media&token=38431728-efa6-47ef-beff-d2494c35cb7f"
                        }
                    }
                ]

            }
        },
        computed: {
            ...mapState({
                news: state => state.news.top
            })
        },
        methods: {
            next() {
                this.$refs.boxes.next();
            },
            prev() {
                this.$refs.boxes.prev();
            },
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
                    this.$refs.boxes.reSlick();
                    this.$refs.newsSlick.reSlick();
                });
            }
        },
        beforeCreate() {
            this.$store.dispatch('news/getTopNews')
            window.VK.Widgets.Group("vk_groups", {mode: 4, wide: 1, width:'auto', height: "380", color1: 'FCFCFC', color2: '383838', color3: 'F48013'}, 154413381);
        }

    }
</script>

<style scoped lang="scss" src="./main-page.scss"/>