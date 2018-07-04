<template>
    <div class="button-arrows-container">
        <button :disabled="leftDisabled" v-on:click="$emit('onLeftClick')"><span class="icon-angle-left"></span></button>
        <button :disabled="rightDisabled" v-on:click="$emit('onRightClick')"><span class="icon-angle-right"></span></button>
    </div>
</template>

<script>
    export default {
        name: 'button-arrows',
        props: [
            'leftDisabled',
            'rightDisabled'
        ]
    }
</script>

<style scoped lang="scss">
    .button-arrows-container {
        height: 30px;
        min-width: 57px;
        border-radius: 15px;
        overflow: hidden;
        box-shadow: 0 1px 1px rgba(93, 76, 76, 0.17);
        button {
            line-height: 30px;
            height: 30px;
            background: white;
            border: none;
            cursor: pointer;
            position: relative;
            color: #888888;
            outline: none;
            &:hover {
                background: #eee;
            }
            &:disabled {
                background: #fff;
                opacity: .3;
                cursor: default;
            }
            &:last-child {
                margin-left: 1px;
            }
            &:last-child:before {
                content: '';
                position: absolute;
                top: 0; left: -1px; bottom: 0;
                display: inline-block;
                background: #fff;
                width: 1px;
                margin: auto;
            }
            &:last-child:after {
                content: '';
                position: absolute;
                top: 0; left: -1px; bottom: 0;
                display: inline-block;
                height: 15px;
                background: #E3E3E3;
                width: 1px;
                margin: auto;

            }
        }
    }
</style>