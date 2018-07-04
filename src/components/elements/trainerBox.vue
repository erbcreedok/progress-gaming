<template>
    <div class="trainer-box box bg-white mb-5">
        <div class="row">
            <div class="col-md-7">
                <div class="row">
                    <div class="col-md-6">
                        <progressive-background
                                class="box-image mb-3"
                                :src="trainer.image.src"
                                :placeholder="trainer.image.thumb"
                        ></progressive-background>
                    </div>
                    <div class="col-md-6">
                        <b class="mb-3" v-html="trainer.description"></b>
                        <h2 class="font-weight-normal mb-20" v-html="trainer.title"></h2>
                        <p class="normal" v-html="trainer.biography"></p>
                    </div>
                </div>
            </div>
            <div class="col-md-5 pt-4">
                <p class="normal">
                    <span class="icon-trophy color-orange"></span> Достижения
                </p>
                <ul class="trophy pl-4 mb-5">
                    <li v-for="(achievement, index) in achievements" v-html="achievement" :key="index"></li>
                </ul>
                <b-button variant="transparent-black" size="sm" v-if="shorted" @click="shorted=false">Посмотреть все</b-button>
                <b-button variant="transparent-black" size="sm" v-if="!shorted && trainer.achievements.length > 5" @click="shorted=true">Скрыть</b-button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'trainer-box',
        props: ['trainer'],
        data() {
            return {
                shorted: this.trainer.achievements.length > 5,
            }
        },
        computed: {
            achievements() {
                return (this.shorted) ? this.trainer.achievements.slice(0,5) : this.trainer.achievements
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/3-base/variables";
    .trainer-box.box {
        padding: 45px 30px;
        box-shadow: 0 1px 2px rgba(0,0,0,.2);
        .box-image {
            margin-top: -45px;
            width: 290px;
            height: 280px;
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
        }
    }
    ul.trophy {
        list-style: none;
        li:before {
            content: "•";
            color: $orange;
            display: block;
            margin-left: -2rem;
            position: absolute;
            font-size: 2.4rem;
            top: 7px;
        }
        li {
            position: relative;
            padding: 15px 0 15px 2rem;
            margin: 0 0 0 -2rem;
            border-top: 1px solid $gray ;
        }
    }
</style>