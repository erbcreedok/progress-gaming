<template>
    <div class="media-page">
        <section class="bg-light-yellow py-70">
            <div class="container mb-70">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Фото материалы</span>
                    </h3>

                    <div class="d-inline-flex ml-auto align-items-center">
                        <p v-if="photoSlickControls.all > 0" class="mr-3 mb-0">
                            {{photoSlickControls.current}} / {{photoSlickControls.all}}
                        </p>
                        <button-arrows class="d-inline-block"
                                       v-if="photos && photos.length>0"
                                       :leftDisabled="photoSlickControls.left"
                                       :rightDisabled="photoSlickControls.right"
                                       @onLeftClick="photoSlickPrev()"
                                       @onRightClick="photoSlickNext()"
                        ></button-arrows>
                    </div>
                </div>
                <slick class="row"
                       ref="photoSlick"
                       :options="photoSlickOptions"
                       @afterChange="handlePhotoSlickChange"
                       @init="handlePhotoSlickInit"
                       v-if="photos && photos.length > 0">
                    <div class="col-12" v-for="(photo, index) in photos" :key="index">
                        <article-block class="mb-5"
                                       @click="handleImageClick(index)"
                                       :article="photo"></article-block>
                    </div>
                </slick>
                <popup :show="showImageModal"
                       :image="selectedImage"
                       :isGallery = "true"
                       @onDestroy="closeImageModal"
                       @onModalLeft="prevImage"
                       @onModalRight="nextImage"></popup>
            </div>
            <div class="container">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Видео материалы</span>
                    </h3>

                    <div class="d-inline-flex ml-auto align-items-center">
                        <p v-if="videoSlickControls.all > 0" class="mr-3 mb-0">
                            {{videoSlickControls.current}} / {{videoSlickControls.all}}
                        </p>
                        <button-arrows class="d-inline-block"
                                       v-if="videos && videos.length>0"
                                       :leftDisabled="videoSlickControls.left"
                                       :rightDisabled="videoSlickControls.right"
                                       @onLeftClick="videoSlickPrev()"
                                       @onRightClick="videoSlickNext()"
                        ></button-arrows>
                    </div>
                </div>
                <slick class="row"
                       ref="videoSlick"
                       :options="videoSlickOptions"
                       @afterChange="handleVideoSlickChange"
                       @init="handleVideoSlickInit"
                       v-if="videos && videos.length > 0">
                    <div class="col-12" v-for="(video, index) in videos" :key="index">
                        <article-block class="mb-5"
                                       @click="handleVideoClick(index)"
                                       :article="video"></article-block>
                    </div>
                </slick>
                <popup :show="showVideoModal"
                       :iframe="selectedVideo"
                       @onDestroy="closeVideoModal"></popup>
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
    import ArticleBlock from '@/components/elements/ArticleBlock'
    import ButtonArrows from '@/components/elements/ButtonArrows'
    import Slick from 'vue-slick'
    import Popup from '../../components/elements/Popup'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'MediaView',
        components: { FamilySection, ArticleBlock, ButtonArrows, Slick, Popup },
        props: {
        },
        computed: {
            ...mapState({
                photos: state => state.photos.all,
                videos: state => state.videos.all
            })
        },
        methods: {
            videoSlickPrev() {
                this.$refs.videoSlick.prev();
            },
            videoSlickNext() {
                this.$refs.videoSlick.next();
            },
            photoSlickPrev() {
                this.$refs.photoSlick.prev();
            },
            photoSlickNext() {
                this.$refs.photoSlick.next();
            },
            handlePhotoSlickChange(event, slick, currentSlide) {
                this.photoSlickControls.left  = currentSlide===0;
                this.photoSlickControls.right = currentSlide >= (slick.slideCount - slick.options.slidesToShow);
                this.photoSlickControls.current = currentSlide + 1;
                this.photoSlickControls.all = (slick.slideCount / slick.options.slidesToShow);
            },
            handleVideoSlickChange(event, slick, currentSlide) {
                this.videoSlickControls.left  = currentSlide===0;
                this.videoSlickControls.right = currentSlide >= (slick.slideCount - slick.options.slidesToShow);
                this.videoSlickControls.current = currentSlide + 1;
                this.videoSlickControls.all = (slick.slideCount > slick.options.slidesToShow) ? (slick.slideCount - slick.options.slidesToShow + 1) : 1;
            },
            handlePhotoSlickInit(event, slick) {
                this.photoSlickControls.current = 1;
                this.photoSlickControls.all = (slick.slideCount / slick.options.slidesToShow);
            },
            handleVideoSlickInit(event, slick) {
                this.videoSlickControls.current = 1;
                this.videoSlickControls.all = (slick.slideCount > slick.options.slidesToShow) ? (slick.slideCount - slick.options.slidesToShow + 1) : 1;
            },
            handleImageClick(index) {
                this.selectedImageIndex = index;
                this.selectedImage = {src: this.photos[this.selectedImageIndex].image.src, hq: this.photos[this.selectedImageIndex].bestQuality.src}
                this.showImageModal = true
            },
            handleVideoClick(index) {
                this.selectedVideoIndex = index;
                this.selectedVideo = this.videos[this.selectedVideoIndex].iframeLink
                this.showVideoModal = true
            },
            closeImageModal() {
                this.showImageModal = false;
                this.selectedImage = null;
            },
            closeVideoModal() {
                this.showVideoModal = false;
                this.selectedVideo = null;
            },
            prevImage() {
                this.selectedImageIndex-=1;
                if (this.selectedImageIndex===-1) this.selectedImageIndex = this.photos.length-1;
                this.selectedImage = {src: this.photos[this.selectedImageIndex].image.src, hq: this.photos[this.selectedImageIndex].bestQuality.src}
            },
            nextImage() {
                this.selectedImageIndex+=1;
                this.selectedImageIndex%=this.photos.length;
                this.selectedImage = {src: this.photos[this.selectedImageIndex].image.src, hq: this.photos[this.selectedImageIndex].bestQuality.src}
            }
        },
        data() {
            return {
                videoSlickOptions: {
                    slidesToShow: 4,
                    arrows: false,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesToShow: 3,
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 2,
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                centerPadding: '50px'
                            }
                        },
                    ]
                },
                photoSlickOptions: {
                    rows: 2,
                    slidesPerRow: 4,
                    arrows: false,
                    infinite: false,
                    responsive: [
                        {
                            breakpoint: 992,
                            settings: {
                                slidesPerRow: 3
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesPerRow: 2
                            }
                        },
                        {
                            breakpoint: 576,
                            settings: {
                                rows: 1,
                                slidesPerRow: 1,
                                centerMode: true,
                                centerPadding: '50px'
                            }
                        },
                    ]

                },
                videoSlickControls: {
                    left: true,
                    right: false,
                    current: 0,
                    all: 0,
                },
                photoSlickControls: {
                    left: true,
                    right: false,
                    current: 0,
                    all: 0,
                },
                selectedImage: null,
                selectedVideo: null,
                showImageModal: false,
                showVideoModal: false,
                selectedImageIndex: 0,
                selectedVideoIndex: 0,
            }
        },
        beforeCreate() {
            this.$store.dispatch('photos/getPhotos')
            this.$store.dispatch('videos/getVideos')
        }

    }
</script>

<style scoped lang="scss" src="./media-page.scss"/>