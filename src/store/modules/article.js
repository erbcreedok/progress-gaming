import { fl, fs } from '../api'
import { articleOptions, mapArticles } from '../models/articles'



const state = {
    isLoading: false,
    articles: {},
    article: null
}

const getters = {
}

const actions = {
    getArticle({commit}, id) {
        commit('setLoading', true)
        commit('setArticle', id)
        return fs.collection('articles').doc('id'+id).get().then((doc) => {
            if (!doc.exists) { commit('setLoading', false); return }
            const payload = doc.data();
            commit('setLoading', false);
            commit('addArticle',  payload);
            commit('setArticle',  payload.id);
        })
    },
    async setArticles({commit}) {
        commit('setLoading', true);
        await fl.content.get('article', articleOptions).then( async shot => {
            if(!shot) return;
            const articles = mapArticles(shot);
            await Promise.all(articles.map((article) => {
                return fs.collection('articles').doc('id'+article.id).set(article);
            })).then(() => {
                commit('setLoading', false);
            });
        });
    }
}

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setArticle(state, articleId) {
        state.article = state.articles['id' + articleId];
    },
    addArticle(state, article) {
        state.articles['id' + article.id] = article;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}