import { newsOptions, mapNews } from './news'

export const articleOptions = {
    fields: [
        'id',
        'title',
        'date',
        'category',
        'image',
        'thumb',
        'image_hd',
        'body',
        'related',
        'order'
    ],
    populate: [
        'image', 'thumb', 'image_hd', {
            field: 'related',
            ...newsOptions
        }
    ]
};

export const mapArticles = (shot) => {
    if (!shot) return;
    return Object.keys(shot).map((key) => {
        let n = shot[key];
        return mapArticle(n);
    });
}

export const mapArticle = (shot) => {
    let article = shot;
    article.image = {
        src: article.image && article.image[0] ? article.image[0].url : null,
        thumb: article.thumb && article.thumb[0] ? article.thumb[0].url : null,
        hq: article.image_hd && article.image_hd[0] ? article.image_hd[0].url : null
    };
    article.date = new Date(article.date);
    article.related = article.related ? mapNews(article.related) : null;
    delete article.thumb;
    delete article.image_hd;
    return article;
};