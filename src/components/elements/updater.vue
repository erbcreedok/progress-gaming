<template>
    <div class="container py-70">
        <div class="row">
            <div class="col-12">
                <b-button @click='updateNewsFromFlamelink' size="sm" variant='black'>Обновить новости</b-button>
                <b-button @click='updateArticlesFromFlamelink' size="sm" variant='black'>Обновить статьи</b-button>
                <b-button @click='updateGalleryFromFlamelink' size="sm" variant='black'>Обновить галерею</b-button>
                <b-button @click='updateMediaFromFlamelink' size="sm" variant='black'>Обновить медиа</b-button>
                <b-button @click='updateTrainersFromFlamelink' size="sm" variant='black'>Обновить тренеров</b-button>
                <hr>
                <b-button @click='updateAllFromFlamelink' size="sm" variant='black'>Обновить все</b-button>
            </div>
        </div>
    </div>
</template>
<style scoped="">
    .btn {
        margin: 10px 30px;
    }
</style>
<script>
    export default {
        name: 'updater',
        methods: {
            updateAllFromFlamelink() {
                this.updateNewsFromFlamelink()
                this.updateArticlesFromFlamelink()
                this.updateGalleryFromFlamelink()
                this.updateMediaFromFlamelink()
                this.updateTrainersFromFlamelink()
            },
            updateNewsFromFlamelink() {
                this.$store.dispatch('news/setAllNewsCount');
                this.$store.dispatch('news/setTopNews');
                this.$store.dispatch('news/setAllNews');
            },
            updateArticlesFromFlamelink() {
                this.$store.dispatch('article/setArticles');
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
