export const trainerOptions = {
    fields: [
        'id',
        'order',
        'title',
        'image',
        'thumb',
        'image_hd',
        'description',
        'biography',
        'achievements',
    ],
    populate: [
        'image', 'thumb', 'image_hd'
    ]
}

export const mapTrainers = (shot) => {
    return Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
        let n = shot[key];
        return mapTrainer(n);
    });
}

export const mapTrainer = (n) => {
    n.image = {
        src: n.image && n.image[0] ? n.image[0].url : null,
        thumb: n.thumb && n.thumb[0] ? n.thumb[0].url : null,
        hq: n.image_hd && n.image_hd[0] ? n.image_hd[0].url : null
    };
    n.achievements.map((a, index) => {
        n.achievements[index] = a.achievement;
    })
    delete n.thumb;
    delete n.image_hd;
    return n;
}