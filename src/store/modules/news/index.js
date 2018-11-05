import { fl, fs } from '../../api'
import { newsOptions, mapNews } from '../../models/news'

const state = {
    isLoading: false,
    itemsPerPage: 6,
    allCount: 0,
    all: [],
    page: [],
    top: [],
    ids: {},
    mock: [
        {
            id: 1,
            topic: 'Supermajor. Vici Gaming оказалась сильнее Newbee',
            description: 'Уверен, что многие из вас поддержали обновленную систему профессионального сезона в Dota 2. Но некоторые даже не представ…',
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-min.jpg?alt=media&token=6aeba034-2515-480c-adfa-88bdd3fb6af7',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-thumb-min.jpg?alt=media&token=29d41b57-d5d8-4ff8-9d80-f6e7c0c31852',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker%402x-min.jpg?alt=media&token=e0544d84-1df3-47d0-96e6-26cf9e1ab57a'
            },
            category: 'Dota 2'
        },
        {
            id: 2,
            topic: 'Немного о новой системе Pro Circuit jj',
            description: 'Уверен, что многие из вас поддержали обновленную систему профессионального сезона в Dota 2. Но некоторые даже не представ…',
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-min.jpg?alt=media&token=893f3b1e-f8bf-447e-a140-40c3d92285b1',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-thumb-min.jpg?alt=media&token=4bb18fbb-fb0f-4c77-be78-8afa6b162bda',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall%402x-min.jpg?alt=media&token=6c41981f-fee9-4bb6-a8b8-746f0e5acfbe'
            },
            category: 'CS:GO'
        },
        {
            id: 3,
            topic: 'В Dota 2 исправили отображение эффектов Nimbus',
            description: 'Уверен, что многие из вас поддержали обновленную систему профессионального сезона в Dota 2. Но некоторые даже не представ…',
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-min.jpg?alt=media&token=a03f6b4b-14a8-48a4-a0ab-b52121f364da',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-thumb-min.jpg?alt=media&token=01e066e9-9f9c-43c0-abf5-74174c399868',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale%402x-min.jpg?alt=media&token=6af4a583-9cfb-4976-85d4-f98d75c63dc7'
            },
            category: 'Патчи'
        }
    ]
}

const actions = {
    getAllNewsCount({commit}) {
        commit('setLoading', true)
        fs.collection('static').doc('newsCount').get().then((doc)=> {
            if(!doc.exists) { commit('setLoading', false); return }
            const newsCount = doc.data();
            commit('setLoading', false);
            commit('setAllNewsCount',  newsCount.count);
        });
    },
    async setAllNewsCount({commit}) {
        commit('setLoading', true)
        await fl.content.get('news', {fields: ['id']}).then(async shot => {
            if(!shot) return;
            const count = Object.keys(shot);
            commit('setLoading', false);
            return await fs.collection('static').doc('newsCount').set({count: count.length}).then(() => {
                console.log('setAllNewsCount')
            });
        })
    },
    getTopNews({commit}) {
        commit('setLoading', true)
        fs.collection('topNews').orderBy('order').get().then((shots) => {
            let payload = [];
            shots.forEach((doc) => {
                payload.push(doc.data())
            });
            commit('setLoading', false);
            commit('setTopNews', payload);
        })
    },
    async setTopNews({commit}) {
        commit('setLoading', true)
        await fl.content.get('mainNews', {
            fields: ['news_list'],
            populate: [
                {
                    field: 'news_list',
                    subFields: [{field:'news', ...newsOptions}]
                }
            ]
        }).then(async shot => {
            if(!shot) return;
            let top = [];
            shot.news_list.map((newsItem) => {
                top.push(newsItem.news[0])
            });
            const news = mapNews(top);
            commit('setLoading', false);
            await Promise.all(news.map((newsItem) => {
                return fs.collection('topNews').doc('id'+newsItem.id).set(newsItem).then(() => {
                    console.log('setTopNews');
                });
            }));
            await fs.collection('static').doc('topNews').set({news: news}).then(() => {
                console.log('setTopNews');
            });
        })
    },
    getPageNews({commit}, page) {
        const start = this.state.news.itemsPerPage * (page - 1)
        const itemsPerPage = this.state.news.itemsPerPage
        commit('setLoading', true)
        fs.collection('news').orderBy('order').startAt(start).limit(itemsPerPage).get().then((shots) => {
            let payload = [];
            shots.forEach((doc) => {
               payload.push(doc.data())
            });
            commit('setLoading', false);
            commit('setPageNews', payload);
        });
    },
    getAllNews({commit}) {
        commit('setLoading', true)
        fs.collection('news').orderBy('order').get().then((shots) => {
            let payload = [];
            shots.forEach((doc) => {
                payload.push(doc.data())
            });
            commit('setLoading', false);
            commit('setAllNews', payload);
        })
    },
    async setAllNews({commit}) {
        commit('setLoading', true)
        await fl.content.get('news', newsOptions).then(async shot => {
            if(!shot) return;
            const news = mapNews(shot);
            await fs.collection('static').doc('all').set({news: news});
            await Promise.all(news.map((newsItem) => {
                return fs.collection('news').doc('id'+newsItem.id).set(newsItem);
            }));
         })
    },
    getNewsItem({commit}, id) {
        commit('setLoading', true)
        fs.collection('news').doc('id'+id).get().then((doc) => {
            if (!doc.exists) { commit('setLoading', false); return; }
            commit('addNewsItem',  doc.data());
        })
    }
}

const getters = {
}

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setTopNews(state, news) {
        state.top = news;
    },
    setAllNews(state, news) {
        state.all = news;
    },
    setPageNews(state, news) {
        state.page = news;
        news.forEach((newsItem) => {
           if(state.all.filter(i => i.id === newsItem.id).length===0) {
               state.all.push(newsItem)
           }
        });
    },
    setAllNewsCount(state, count) {
        state.allCount = count;
    },
    addNewsItem(state, newsItem) {
        state.ids['id' + newsItem.id] = newsItem
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
}