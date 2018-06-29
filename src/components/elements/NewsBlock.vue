<template>
    <div class="box news-block" style="background-image: url(https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker%402x-min.jpg?alt=media&token=13d859ef-71fe-460e-8e2e-daea32156589)">
        <progressive-background class="pg-bg"
                                src="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-min.jpg?alt=media&token=fb4c1266-94e0-4a0b-a29f-20a5c2b95b20"
                                placeholder="https://firebasestorage.googleapis.com/v0/b/pg-media-b4329.appspot.com/o/invoker-thumb-min.jpg?alt=media&token=8c9634db-0e1b-4cac-a095-e930932a0ecb"></progressive-background>
        <div class="content">
            <h3 class="mb-20">
                Supermajor. Vici Gaming оказалась сильнее Newbee
            </h3>
            <div class="h-line mb-3"></div>
            <p class="normal">
                Уверен, что многие из вас поддержали обновленную систему профессионального сезона в Dota 2. Но некоторые даже не представ…
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'news-block',
    }
</script>

<style scoped lang="scss">
    .box.news-block {
        padding: 25px;
        height: 350px;
        max-width: 325px;
        &:after {
            content:'';position:absolute;top:0;left:0;right:0;bottom:0;
            background: rgba(0,0,0,.2);
        }
        .content {
            color: $white;
            position: relative;
            z-index:10;
        }
    }
</style>