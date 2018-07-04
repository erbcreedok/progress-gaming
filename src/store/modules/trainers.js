import { fl, fs } from '../api'
import { trainerOptions, mapTrainers } from '../models/trainers'



const state = {
    isLoading: false,
    all: [],
    mock: [
        {
            id: 1,
            name: 'Андрей Ли',
            description: 'Тренер по дисциплине CS:GO',
            biography: 'Работал в роли тренера с такими игроками как "Ramz1k", "hippo", "neaLan" и многими другими.',
            image: {
                src: 'http://www.technokrata.hu/uploads/2018/01/addicted-computer-gamer-playing-late-at-night-170103438-57a366de3df78cf4590b8910.jpg',
                thumb: 'https://media.gettyimages.com/photos/addicted-computer-gamer-playing-late-at-night-picture-id170103438?b=1&k=6&m=170103438&s=170x170&h=BdNAO6-RjFaOZrkwtpf1-LUp3aT268p9H7QosF53dAw='
            },
            awards: [
                'TECHLABS CUP KZ 2012 2nd place',
                'TECHLABS CUP KZ 2013 (mou, keen, malinger, cau, sonic) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'ASUS ROG Championship (hippo,malinger,aldikk,ED,galantis) 2nd place',
                'TECHLABS CUP KZ 2013 (mou, keen, malinger, cau, sonic) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'ASUS ROG Championship (hippo,malinger,aldikk,ED,galantis) 2nd place'
            ]
        },
        {
            id: 2,
            name: 'Марат Абенов',
            description: 'Тренер по дисциплине DOTA 2',
            biography: 'Выступал за такие коллективы как: OSPL, Next.kz, Xgame.kz, ursastroithram , Gus.gaming , 3dmax, bbc<br/><br/>Играл в одних командах со Stalcat, Watafaka, Mantis и многими другими.',
            image: {
                src: 'http://i08.kanobu.net/r/71f61f7a340127526997ef2987ab777f/1040x-/u.kanobu.ru/editor/images/74/e2571f63-8ade-49b5-8185-ca388710cce2.jpg',
                thumb: 'http://jbreaker.ru/images/stories/pics/KART/e2571f63-8ade-49b5-8185-ca388710cce2.jpg'
            },
            awards: [
                'TECHLABS CUP KZ 2012 2nd place',
                'TECHLABS CUP KZ 2013 (mou, keen, malinger, cau, sonic) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'TECHLABS CUP KZ 2014 (AdreN, hobbit, malinger, zLex,fANTASTIKA) 1st place',
                'ASUS ROG Championship (hippo,malinger,aldikk,ED,galantis) 2nd place'
            ]
        }
    ]
}

const actions = {
    getTrainers({commit}) {
        commit('setLoading', true)
        fs.collection('trainers').orderBy('order').get().then((shots) => {
            let payload = [];
            shots.forEach((doc) => {
                payload.push(doc.data())
            });
            commit('setLoading', false);
            commit('setTrainers', payload);
        })
    },
    setTrainers({commit}) {
        commit('setLoading', true)
        fl.content.get('trainers', trainerOptions).then( shot => {
            if(!shot) return;
            const payload = mapTrainers(shot);
            commit('setLoading', false);
            payload.map((item) => {
                fs.collection('trainers').doc('id'+item.id).set(item);
            })
        })
    }
}

const mutations = {
    setLoading(state, isLoading) {
        state.isLoading = isLoading
    },
    setTrainers(state, payload) {
        state.all = payload;
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}