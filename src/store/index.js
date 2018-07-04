import Vue from 'vue'
import Vuex from 'vuex'
import news from './modules/news'
import photos from './modules/photos'
import videos from './modules/videos'
import article from './modules/article'
import gallery from './modules/gallery'
import trainers from './modules/trainers'

Vue.use(Vuex)

export function createStore () {
    return new Vuex.Store({
        state: {
        },
        modules: {
            news: news,
            photos: photos,
            videos: videos,
            article: article,
            gallery: gallery,
            trainers: trainers
        }
    })
}