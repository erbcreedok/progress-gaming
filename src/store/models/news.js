export const newsOptions = {
    fields: [
        'id',
        'order',
        'title',
        'subtitle',
        'image',
        'thumbnail',
        'image_hd',
        'category',
        'article'
    ],
    populate: [
        'image', 'thumbnail', 'image_hd'
    ]
};
export const mapNews = (shot) => {
    return Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
        let n = shot[key];
        return mapNewsItem(n);
    });
};
export const mapNewsItem = (n) => {
    n.image = {
        src: n.image && n.image[0] ? n.image[0].url : null,
        thumb: n.thumbnail && n.thumbnail[0] ? n.thumbnail[0].url : null,
        hq: n.image_hd && n.image_hd[0] ? n.image_hd[0].url : null
    };
    delete n.thumbnail;
    delete n.image_hd;
    return n;
};
