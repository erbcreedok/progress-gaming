import { fl, fs } from '../api'
import { photosOptions, mapPhotos } from '../models/photos'



const state = {
    isLoading: false,
    all: [],
    mock: [
        {
            id: 1,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-min.jpg?alt=media&token=6aeba034-2515-480c-adfa-88bdd3fb6af7',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-thumb-min.jpg?alt=media&token=29d41b57-d5d8-4ff8-9d80-f6e7c0c31852',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker%402x-min.jpg?alt=media&token=e0544d84-1df3-47d0-96e6-26cf9e1ab57a'
            },
            title: 'Supermajor. Vici Gaming оказалась сильнее Newbee',
        },
        {
            id: 2,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-min.jpg?alt=media&token=893f3b1e-f8bf-447e-a140-40c3d92285b1',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-thumb-min.jpg?alt=media&token=4bb18fbb-fb0f-4c77-be78-8afa6b162bda',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall%402x-min.jpg?alt=media&token=6c41981f-fee9-4bb6-a8b8-746f0e5acfbe'
            },
            title: 'Na\'Vi vs Mousesports ФИНАЛ StarSeries i-League S4',
        },
        {
            id: 3,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-min.jpg?alt=media&token=a03f6b4b-14a8-48a4-a0ab-b52121f364da',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-thumb-min.jpg?alt=media&token=01e066e9-9f9c-43c0-abf5-74174c399868',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale%402x-min.jpg?alt=media&token=6af4a583-9cfb-4976-85d4-f98d75c63dc7'
            },
            title: 'Как научиться играть в DOTA2?',
        },
        {
            id: 1,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-min.jpg?alt=media&token=6aeba034-2515-480c-adfa-88bdd3fb6af7',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-thumb-min.jpg?alt=media&token=29d41b57-d5d8-4ff8-9d80-f6e7c0c31852',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker%402x-min.jpg?alt=media&token=e0544d84-1df3-47d0-96e6-26cf9e1ab57a'
            },
            title: 'Supermajor. Vici Gaming оказалась сильнее Newbee',
        },
        {
            id: 2,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-min.jpg?alt=media&token=893f3b1e-f8bf-447e-a140-40c3d92285b1',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-thumb-min.jpg?alt=media&token=4bb18fbb-fb0f-4c77-be78-8afa6b162bda',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall%402x-min.jpg?alt=media&token=6c41981f-fee9-4bb6-a8b8-746f0e5acfbe'
            },
            title: 'Na\'Vi vs Mousesports ФИНАЛ StarSeries i-League S4',
        },
        {
            id: 3,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-min.jpg?alt=media&token=a03f6b4b-14a8-48a4-a0ab-b52121f364da',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale-thumb-min.jpg?alt=media&token=01e066e9-9f9c-43c0-abf5-74174c399868',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/battleroyale%402x-min.jpg?alt=media&token=6af4a583-9cfb-4976-85d4-f98d75c63dc7'
            },
            title: 'Как научиться играть в DOTA2?',
        },
        {
            id: 1,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-min.jpg?alt=media&token=6aeba034-2515-480c-adfa-88bdd3fb6af7',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-thumb-min.jpg?alt=media&token=29d41b57-d5d8-4ff8-9d80-f6e7c0c31852',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker%402x-min.jpg?alt=media&token=e0544d84-1df3-47d0-96e6-26cf9e1ab57a'
            },
            title: 'Supermajor. Vici Gaming оказалась сильнее Newbee',
        },
        {
            id: 2,
            image: {
                src: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-min.jpg?alt=media&token=893f3b1e-f8bf-447e-a140-40c3d92285b1',
                thumb: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall-thumb-min.jpg?alt=media&token=4bb18fbb-fb0f-4c77-be78-8afa6b162bda',
                hq: 'https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/csgo_wall%402x-min.jpg?alt=media&token=6c41981f-fee9-4bb6-a8b8-746f0e5acfbe'
            },
            title: 'Na\'Vi vs Mousesports ФИНАЛ StarSeries i-League S4',
        }
    ]
}

const actions = {
    getPhotos({commit}) {
        commit('setLoading', true)
        fs.collection('gallery').orderBy('order').get().then((shots) => {
            let payload = [];
            shots.forEach((doc) => {
                payload.push(doc.data())
            });
            commit('setLoading', false);
            commit('setPhotos', payload);
        })
    },
    setPhotos({commit}) {
        commit('setLoading', true)
        fl.content.get('gallery', photosOptions).then( shot => {
            if(!shot) return;
            const payload = mapPhotos(shot);
            commit('setLoading', false);
            payload.map((item) => {
                fs.collection('gallery').doc('id'+item.id).set(item);
            })
        })
    }
}

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setPhotos(state, payload) {
        state.all = payload;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}