import { fl, fs } from '../api'
import { articleOptions, mapArticles } from '../models/articles'



const state = {
    isLoading: false,
    article: {}
}

const actions = {
    getArticle({commit}, id) {
        commit('setLoading', true)
        fs.collection('articles').doc('id'+id).get().then((doc) => {
            if (!doc.exists) { commit('setLoading', false); return }
            const payload = doc.data();
            commit('setLoading', false);
            commit('setArticle',  payload);
        })
    },
    setArticles({commit}) {
        commit('setLoading', true);
        fl.content.get('article', articleOptions).then( shot => {
            if(!shot) return;
            const articles = mapArticles(shot);
            articles.map((article) => {
                fs.collection('articles').doc('id'+article.id).set(article);
            });
            commit('setLoading', false);
        });
    }
}

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setArticle(state, article) {
        state.article = article;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}