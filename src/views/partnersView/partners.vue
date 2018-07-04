<template>
    <div class="partners-page">
        <section class="bg-light-yellow py-70">
            <div class="container mb-70">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Наши партнеры</span>
                    </h3>
                    <button-arrows @onLeftClick="prev()" @onRightClick="next()" class="d-inline-block d-md-none ml-auto"></button-arrows>
                </div>
                <slick class="row mb-5 pb-2" ref="logos" :options="logoSlick" @afterChange="handleAfterChange">
                    <div class="col-12" v-for="partner in partners" v-bind:key="partner.id">
                        <div class="logo-container d-inline-flex align-items-center text-center">
                            <img :src="partner.image.src" alt="">
                        </div>
                    </div>
                </slick>
                <div class="row">
                    <div class="col-12">
                        <h3 class="mb-20" v-html="partners[selected].title"></h3>
                        <p v-html="partners[selected].text"></p>
                    </div>
                </div>
            </div>
        </section>
        <family-section></family-section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import ButtonArrows from '@/components/elements/ButtonArrows'
    import Slick from 'vue-slick'
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'PartnersView',
        components: { FamilySection, ButtonArrows, Slick },
        props: {
        },
        data() {
            return {
                logoSlick: {
                    infinite: true,
                    slidesToShow: 4,
                    arrows: false,
                    focusOnSelect: true,
                    responsive: [
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                centerMode: true,
                                variableWidth: true,
                                centerPadding: '20%',
                            }
                        }
                    ]
                },
                partners: [
                    {
                        id: 1,
                        title: 'HyperX',
                        text: 'Подразделение (и одноимённый бренд) американской компании Kingston Technology, специализирующееся на создании высокопроизводительных твердотельных накопителей, памяти DDR4 и DDR3, USB-флеш-накопителей, а также геймерских гарнитур и игровых аксессуаров. Компоненты HyperX неоднократно использовались при постановке мировых рекордов разгона компьютеров. HyperX также финансирует развитие киберспорта и профессиональные геймерские команды[1]. Наушники HyperX являются официальной продукцией профессиональных игроков команд Alliance, CNB E-sports Club, SK-Gaming, Team Liquid, Renegades',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/hyperx-kingston-min.jpg?alt=media&token=0629f0bd-ea6b-40ff-ad92-f81582d3b99b'
                        }
                    },
                    {
                        id: 2,
                        title: 'Nvidia',
                        text: 'Американская компания, один из крупнейших разработчиков графических ускорителей и процессоров, а также наборов системной логики. На рынке продукция компании известна под такими торговыми марками как GeForce, nForce, Quadro, Tesla, ION и Tegra.',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/nvidia-min.jpg?alt=media&token=22893781-c56a-45e8-a687-2a6ab9c9d862'
                        }
                    },
                    {
                        id: 3,
                        title: 'Microsoft',
                        text: 'Одна из крупнейших транснациональных компаний по производству проприетарного программного обеспечения для различного рода вычислительной техники — персональных компьютеров, игровых приставок, КПК, мобильных телефонов и прочего, разработчик наиболее широко распространённой на данный момент в мире программной платформы — семейства операционных систем Windows.<br/><br/>Подразделения компании также производят семейство игровых консолей Xbox, а также аксессуары для персональных компьютеров (клавиатуры, мыши и т. д.). C 2012 года производит собственный планшетный компьютер — Surface. Продукция Microsoft продаётся более чем в 80 странах мира, программы переведены более чем на 45 языков.',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/microsoft-min.jpg?alt=media&token=db49d7d7-f517-4af0-aa3b-cb55343cbf02'
                        }
                    },
                    {
                        id: 4,
                        title: 'Unity',
                        text: 'Межплатформенная среда разработки компьютерных игр. Unity позволяет создавать приложения, работающие под более чем 20 различными операционными системами, включающими персональные компьютеры, игровые консоли, мобильные устройства, интернет-приложения и другие. Выпуск Unity состоялся в 2005 году и с того времени идёт постоянное развитие.<br/><br/>Основными преимуществами Unity являются наличие визуальной среды разработки, межплатформенной поддержки и модульной системы компонентов. К недостаткам относят появление сложностей при работе с многокомпонентными схемами и затруднения при подключении внешних библиотек.<br/><br/>На Unity написаны тысячи игр, приложений и симуляций, которые охватывают множество платформ и жанров. При этом Unity используется как крупными разработчиками, так независимыми студиями',
                        image: {
                            src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/unity-min.jpg?alt=media&token=de8cb4e1-6e38-4efd-b8d3-25c5c9479489'
                        }
                    }
                ],
                selected: 0
            }
        },
        methods: {
            next() {
                this.$refs.logos.next();
            },

            prev() {
                this.$refs.logos.prev();
            },

            reInit() {
                this.$nextTick(() => {
                    this.$refs.boxes.reSlick();
                });
            },
            handleAfterChange(event, slick, currentSlide) {
                this.selected = currentSlide;
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../assets/scss/3-base/variables";
    .logo-container {
        height: 140px;
        background: white;
        padding: 20px;
        cursor: pointer;
        img {
            max-width: 100%;
            max-height: 100%;
            height: auto;
            width: auto;
            min-width: 120px;
            margin: 0 auto;
        }
        transition: .3s;
        &:hover {
            box-shadow: inset 0 0 3px rgba($orange, .7);
        }
    }
    .slick-current .logo-container{
        box-shadow: inset 0 0 0 1px rgba($orange, 1);
    }

</style>