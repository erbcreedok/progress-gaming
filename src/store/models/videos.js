export const videosOptions = {
    fields: [
        'id',
        'order',
        'title',
        'image',
        'thumb',
        'image_hd',
        'iframeLink',
    ],
    populate: [
        'image', 'thumb', 'image_hd'
    ]
}

export const mapVideos = (shot) => {
    return Object.keys(shot).sort((a,b) => shot[a].order - shot[b].order).map((key) => {
        let n = shot[key];
        return mapVideo(n);
    });
}

export const mapVideo = (n) => {
    n.image = {
        src: n.image && n.image[0] ? n.image[0].url : null,
        thumb: n.thumb && n.thumb[0] ? n.thumb[0].url : null,
        hq: n.image_hd && n.image_hd[0] ? n.image_hd[0].url : null
    };
    delete n.thumb;
    delete n.image_hd;
    return n;
}