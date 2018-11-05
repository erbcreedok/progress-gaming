<template>
    <div class="about-page">
        <section class="bg-black color-white" style="position: fixed;top: 80px;left: 0;right: 0;z-index: 999;">
            <div class="container py-4">
                <div class="d-flex tabs">
                    <router-link to="/about/organization" class="mr-md-80 mr-3 text-nowrap color-inherit" active-class="active">
                        <span class="text-uppercase">Об организации</span>
                    </router-link>
                    <router-link to="/about/teams" class="mr-md-80 mr-3 text-nowrap color-inherit" active-class="active">
                        <span class="text-uppercase">Все команды</span>
                    </router-link>
                    <router-link to="/about/trainers" class="mr-md-80 mr-3 text-nowrap color-inherit" active-class="active">
                        <span class="text-uppercase">Наши тренера</span>
                    </router-link>
                </div>
            </div>
        </section>
        <section class="organization-page bg-light-yellow" v-if="page==='organization'">
            <bg-image v-for="(bgImage, index) in bgImages"
                      :key="index"
                      :image="bgImage.image"
                      :pos="bgImage.pos"></bg-image>
            <div class="container py-80 pb-220">
                <h3 class="mb-5">
                    <span class="text-uppercase">Информация о нас</span>
                </h3>
                <p class="mb-5">
                    <b>Progress Gaming</b> - это первая киберспортивная академия в Казахстане. Мы предлагаем нашим воспитанникам проходить обучение по двум киберспортивным дисциплинам: <span class="color-orange">CS:GO и DOTA 2</span>.<br><br>
                    По прошествию времени опытные тренера определят самых способных и талантливых игроков, которые попадут в профессиональные команды, для участия в локальных и международных турнирах. Мы считаем, что наша академия станет кузницей кадров казахстанского киберспорта.
                </p>
                <h3 class="font-weight-bold">Миссия компании – продвижение казахстанских игроков на мировую арену киберспорта. </h3>
            </div>
        </section>
        <section class="teams-page bg-light-yellow py-80 pb-220" v-if="page==='teams'">
            <bg-image v-for="(bgImage, index) in bgImages"
                      :key="index"
                      :image="bgImage.image"
                      :pos="bgImage.pos"></bg-image>
            <div class="container">
                <h3 class="mb-5">
                    <span class="text-uppercase">Фото галерея команды</span>
                </h3>
            </div>
            <div class="container-fluid" style="max-width: 1400px;">
                <slick class="row"
                       ref="gallerySlick"
                       v-if="gallery && gallery.length > 0"
                       @afterChange="handleGallerySlickChange"
                       :options="teamGallery">
                    <div class="col-12" v-for="(item,index) in gallery" :key="index">
                        <div class="box" @click="openModal(item, index)">
                            <div class="pg-bg filter-thumb" :style="{backgroundImage: 'url(' + item.image.thumb + ')'}"></div>
                            <div class="pg-bg" :style="{backgroundImage: 'url(' + item.image.src + ')'}"></div>
                            <span class="box-hover">Увеличить <span class="icon-search"></span></span>
                        </div>
                    </div>
                </slick>
                <popup :show="showModal"
                       :image="selectedImage"
                       @onDestroy="closeModal"
                       :isGallery = "true"
                       @onModalLeft="gallerySlickPrev"
                       @onModalRight="gallerySlickNext"></popup>
            </div>
        </section>
        <section class="trainers-page bg-light-yellow" v-if="page==='trainers'">
            <bg-image v-for="(bgImage, index) in bgImages"
                      :key="index"
                      :image="bgImage.image"
                      :pos="bgImage.pos"></bg-image>
            <div class="container py-80 pb-220">
                <h3 class="mb-40">
                    <span class="text-uppercase">Наши тренера</span>
                </h3>
                <trainer-box v-for="(trainer, index) in trainers" :key="index" :trainer="trainer"></trainer-box>
            </div>
        </section>
        <family-section></family-section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import { mapState } from 'vuex'
    import VueProgressiveImage from 'vue-progressive-image'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import TrainerBox from '@/components/elements/trainerBox'
    import Slick from 'vue-slick'
    import Popup from '../../components/elements/Popup'
    import BgImage from '@/components/elements/bgImage'
    import 'slick-carousel/slick/slick.css'
    import 'vue-popup/lib/popup.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'AboutView',
        components: { FamilySection, TrainerBox, Slick, Popup, BgImage},
        mixins: [Popup],
        props: {
        },
        data() {
            return {
                teamGallery: {
                    infinite: true,
                    centerMode: true,
                    focusOnSelect: true,
                    arrows: false,
                    variableWidth: true,
                    slidesToShow: 3,
                    speed: 300,
                    responsive: [
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                variableWidth: false,
                            }
                        }
                    ]
                },
                selectedIndex: 0,
                selectedImage: null,
                showModal: false,
                bgImages: [
                    {
                        pos: 'left',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/b2b-min.jpg?alt=media&token=84803170-0fb3-421e-9132-e991ed61d57c',
                            thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/b2b-thumb-min.jpg?alt=media&token=ad7f55e6-ca4a-41a9-a00e-86c000623380',
                            hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/b2b%402x-min.jpg?alt=media&token=8bcfa8f0-ce40-4a6c-8fcc-fb5004e28de5'
                        }
                    },
                    {
                        pos: 'right',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/abyssal-min.jpg?alt=media&token=cf96b1fa-bc0e-432d-9e05-f65f7d52e78b',
                            thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/abyssal-thumb-min.jpg?alt=media&token=4c0db1ca-2f83-4dfa-b8b7-2db3306b676a',
                            hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/abyssal%402x-min.jpg?alt=media&token=59b20b0d-407a-43f2-b6fc-fbfb31b32da5'
                        }
                    }
                ]
            }
        },
        computed: {
            page () {
                return this.$route.params.page;
            },
            ...mapState({
                gallery: state => state.gallery.all,
                trainers: state => state.trainers.all
            })
        },
        methods: {
            handleGallerySlickChange(event, slick, currentSlide) {
                this.selectedIndex = currentSlide
                this.selectedImage = this.gallery[currentSlide].image
            },
            openModal(item, index) {
                if (index!==this.selectedIndex) return;
                this.selectedImage = item.image;
                this.showModal = true;
            },
            closeModal() {
                this.showModal = false;
                this.selectedImage = null;
            },
            gallerySlickNext() {
                this.$refs.gallerySlick.next();
            },
            gallerySlickPrev() {
                this.$refs.gallerySlick.prev();
            }
        },
        beforeMount() {
            this.$store.dispatch('gallery/getPhotos');
            this.$store.dispatch('trainers/getTrainers');
        }

    }
</script>

<style scoped lang="scss" src="./about-page.scss"/>