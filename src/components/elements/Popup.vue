<template>
    <div v-if="show" class="popup d-flex align-items-center justify-content-center">
        <div class="popup-back" @click="destroyMe"></div>
        <div class="popup-body">
            <img v-if="image"
                 :src="image.hq ? image.hq : image.src"
                 @click="modalRight"
                 @load="imgLoad"
            />
            <iframe v-if="iframe"
                    :src="iframe"
                    frameborder="0"
                    @load="videoLoad"
                    allowfullscreen
                    width="800px"
                    height="400px"
            ></iframe>
            <span v-if="loaded" class="icon-cancel" @click="destroyMe"></span>
            <span v-if="isGallery && loaded" class="icon-arrow-left" @click="modalLeft"></span>
            <span v-if="isGallery && loaded" class="icon-arrow-right" @click="modalRight"></span>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .popup {
        position: fixed;
        z-index: 10000;
        top: 0;left: 0;right: 0;bottom: 0;
        padding: 50px;
    }
    .popup-body {
        position: relative;
        display: block;
        margin: 0 auto;
        img {
            display: block;
            max-width: 90vw;
            max-height: 90vh;
            margin: auto;
            width: auto;
            box-shadow: 0 10px 50px rgba(0,0,0,0.8);
        }
        iframe {
            display: block;
            max-width: 100%;
            box-shadow: 0 10px 50px rgba(0,0,0,0.8);
            background: white;
        }
        .icon-cancel {
            font-size: 2rem;
            color: white;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
            position: absolute;
            right: -25px;
            top: 0;
            cursor: pointer;
        }
        .icon-arrow-left, .icon-arrow-right {
            font-size: 2rem;
            color: black;
            background: white;
            border-radius: 20px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 1);
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
            display: block;
            height: 40px;
            width: 40px;
            line-height: 40px;
            cursor: pointer;
            text-align: center;
        }
        .icon-arrow-left {
            left: -45px;
        }
        .icon-arrow-right {
            right: -45px;
        }
    }
    .popup-back {
        position: absolute;
        cursor: pointer;
        top: -50px;left: -50px;right: -50px;bottom: -50px;
        background: rgba(0,0,0,.8);
    }

</style>
<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'popup',
        props: {
            image: false,
            iframe: false,
            show: false,
            isGallery: false,
        },
        data() {
            return {
                loaded: false
            }
        },
        methods: {
            destroyMe() {
                this.image = false;
                this.iframe = false;
                this.show = false;
                this.$emit('onDestroy');
            },
            modalLeft() {
                this.$emit('onModalLeft');
            },
            modalRight() {
                this.$emit('onModalRight');
            },
            imgLoad() {
                this.loaded = true;
            },
            videoLoad() {
                this.loaded = true;
            }
        }
    };
</script>