<template>
    <div class="container py-70">
        <div class="row">
            <div class="col-12">

                <b-button v-for="(model, index) in models"
                          :key="index"
                          @click="model.method(model)"
                          size="sm"
                          :variant="model.fetched ? 'success' :'black'"
                >
                    <span v-if="model.fetched === 0"><span class="d-inline-block ml-2">😐</span> Обновить</span>
                    <span v-if="model.fetched === 1"><span class="d-inline-block ml-2 spin-it">🤢</span> Обновляю</span>
                    <span v-if="model.fetched === 2"><span class="d-inline-block ml-2">🤗</span> Обновил</span>
                    {{model.title}}
                </b-button>

                <!--<b-button @click='updateNewsFromFlamelink' size="sm" :variant="newsFetched ? 'success' :'black'">Обновить новости</b-button>-->
                <!--<b-button @click='updateArticlesFromFlamelink' size="sm" :variant="newsFetched ? 'success' :'black'">Обновить статьи</b-button>-->
                <!--<b-button @click='updateGalleryFromFlamelink' size="sm" variant='black'>Обновить галерею</b-button>-->
                <!--<b-button @click='updateMediaFromFlamelink' size="sm" variant='black'>Обновить медиа</b-button>-->
                <!--<b-button @click='updateTrainersFromFlamelink' size="sm" variant='black'>Обновить тренеров</b-button>-->
                <hr>
                <b-button @click='updateAllFromFlamelink' size="sm" variant='black'>Обновить все</b-button>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .btn {
        margin: 10px 30px;
    }
    .spin-it {
        animation: spin-me .5s ease-in-out infinite;
        transform-origin: 7px;
    }

</style>
<script>
    export default {
        name: 'updater',
        data() {
            return {
                articleFetched: 0,
                newsFetched: 0,
                galleryFetched: 0,
                mediaFetched: 0,
                trainersFetched: 0,
                models: [
                    {
                        name: 'news', title: 'новости', fetched: 0, method: this.updateNewsFromFlamelink
                    },
                    {
                        name: 'articles', title: 'статьи', fetched: 0, method: this.updateArticlesFromFlamelink
                    },
                    {
                        name: 'gallery', title: 'галерею', fetched: 0, method: this.updateGalleryFromFlamelink
                    },
                    {
                        name: 'media', title: 'медиа', fetched: 0, method: this.updateMediaFromFlamelink
                    },
                    {
                        name: 'trainers', title: 'тренеров', fetched: 0, method: this.updateTrainersFromFlamelink
                    },
                ]
            }
        },
        methods: {
            modelFetched(model) {
                model.fetched = 2
                setTimeout(() => model.fetched = 0, 2000);
            },
            updateAllFromFlamelink() {
                this.updateNewsFromFlamelink()
                this.updateArticlesFromFlamelink();
                this.updateGalleryFromFlamelink()
                this.updateMediaFromFlamelink()
                this.updateTrainersFromFlamelink()
            },
            async updateNewsFromFlamelink(model) {
                model.fetched = 1;
                const dists = [
                    this.$store.dispatch('news/setAllNewsCount'),
                    this.$store.dispatch('news/setTopNews'),
                    this.$store.dispatch('news/setAllNews')
                ];
                await Promise.all(dists.map( a => {

                }))

            },
            updateArticlesFromFlamelink(model) {
                model.fetched = 1;
                this.$store.dispatch('article/setArticles').then(() => {
                    this.modelFetched(model)
                });
            },
            updateGalleryFromFlamelink() {
                this.$store.dispatch('gallery/setPhotos');
            },
            updateMediaFromFlamelink() {
                this.$store.dispatch('photos/setPhotos');
                this.$store.dispatch('videos/setVideos');
            },
            updateTrainersFromFlamelink() {
                this.$store.dispatch('trainers/setTrainers');
            }

        }
    }
</script>
