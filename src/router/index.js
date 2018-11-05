import Vue from 'vue'
import Router from 'vue-router'
import MainView from '@/views/mainView/main.vue'
import AboutView from '@/views/aboutView/about.vue'
import MediaView from '@/views/mediaView/media.vue'
import NewsView from '@/views/newsView/news.vue'
import PartnersView from '@/views/partnersView/partners.vue'
import ContactsView from '@/views/contactsView/contacts.vue'
import ArticleView from '@/views/articleView/article.vue'
import Updater from '@/components/elements/updater.vue'

Vue.use(Router)


export function createRouter () {
    return new Router({
            mode: 'hash',
            fallback: false, 
            scrollBehavior: () => ({ y: 0 }), 
        routes: [
            { path: '/', component: MainView },
            { path: '/about/:page', component: AboutView },
            { path: '/about', redirect: '/about/organization'},
            { path: '/media', component: MediaView},
            { path: '/news', component: NewsView},
            { path: '/partners', component: PartnersView },
            { path: '/contacts', component: ContactsView },
            { path: '/article/id:id', component: ArticleView },
            { path: '/article/', redirect: '/'},
            { path: '/updateData/', component: Updater},
            { path: '*', redirect: '/'}
        ]
    })
}