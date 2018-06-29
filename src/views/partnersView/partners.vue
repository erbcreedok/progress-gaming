<template>
    <div class="partners-page">
        <section class="bg-light-yellow py-70">
            <div class="container mb-70">
                <div class="d-flex align-items-center mb-5">
                    <h3>
                        <span class="text-uppercase">Наши партнеры</span>
                    </h3>
                    <button-arrows class="d-inline-block ml-auto"></button-arrows>
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
    import '../../../node_modules/slick-carousel/slick/slick.css'

    Vue.use(VueProgressiveImage)

    export default {
        name: 'PartnersView',
        components: { FamilySection, NewsBlock, ButtonArrows },
        props: {
        },
        computed: {
        }

    }
</script>

<style scoped lang="scss"/>