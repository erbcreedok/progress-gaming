<template>
    <div class="partners-page">
        <section class="bg-light-yellow py-70">
            <div class="container mb-70">
                <h3 class="mb-5">
                    <span class="text-uppercase">Контакты</span>
                </h3>
                <p class="f-size-20 mb-5">Сотрудники компании ProgressGaming всегда готовы оказать Вам различную помощь:</p>
                <div class="row mb-60">
                    <div class="col-md-6">
                        <blockquote>
                            <p class="mb-5">Для записи на тренировки:</p>
                            <p class="color-orange f-size-20">
                                <a class="color-inherit" href="tel: 87059101221">8&nbsp;705&nbsp;910&nbsp;1221</a>,
                                <a class="color-inherit" href="tel: 87074550055">8&nbsp;707&nbsp;455&nbsp;00&nbsp;55</a>
                            </p>
                        </blockquote>
                    </div>
                    <div class="col-md-6">
                        <blockquote>
                            <p class="mb-5">По вопросам сотрудничества:</p>
                            <p class="color-orange f-size-20">
                                <a class="color-inherit" href="mailto: cyberacademy.progress@gmail.com" style="word-break: break-all">cyberacademy.progress@gmail.com</a>,
                            </p>
                        </blockquote>
                    </div>
                </div>
                <p class="f-size-20 mb-25">Если у вас есть вопросы или пожелания, напишите нам:</p>
                <form class="row" @submit="formSubmit" v-if="!formSent">
                    <div class="col-md-6">
                        <div class="form-group mb-20">
                            <label for="name">Имя: *</label>
                            <input type="text" required="" name="name" id="name" class="form-control" placeholder="Ваше имя"
                                   v-model="formData.name">
                        </div>
                        <div class="form-group mb-20">
                            <label for="phone">Номер телефона: *</label>
                            <input type="text" required="" name="phone" id="phone" class="form-control" placeholder="Ваш номер телефона"
                                   v-mask="'+# (###) ### ## ##'"
                                   v-model="formData.phone" @focus="onFocus">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group mb-20">
                            <label for="extra">Дополнительно: </label>
                            <textarea name="extra" id="extra" class="form-control" placeholder="Введите ваше сообщение"
                                      v-model="formData.extra" style="height: 132px;"></textarea>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <button class="btn btn-black">
                            <span class="text-uppercase">Отправить</span>
                        </button>
                    </div>
                </form>
                <div class="row modal-thanks" v-if="formSent">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p class="h2 text-center font-weight-bold my-6">
                                Большое спасибо! :D<br>
                                Ваша заявка принята <span class="icon-checkmark"></span>
                            </p>
                            <p class="notifier text-right">
                                <a href="#" data-dismiss="modal" class="color-gray" @click="closeModal">Отправить еще</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <family-section></family-section>
    </div>
</template>

<script>
    import Vue from 'vue'
    import VueProgressiveImage from 'vue-progressive-image'
    import VueMask from 'v-mask'
    import FamilySection from '@/components/sections/pgFamilyComponent/pgFamily'
    import '../../../node_modules/slick-carousel/slick/slick.css'
    import Resource from 'vue-resource'

    Vue.use(VueProgressiveImage)
    Vue.use(VueMask)
    Vue.use(Resource)
    Vue.http.options.emulateJSON = true;
    const http = Vue.http;

    export default {
        name: 'ContactsView',
        components: { FamilySection },
        props: {
        },
        data() {
            return {
                formData: {
                    name: '',
                    phone: '',
                    extra: ''
                },
                formSent: false,
                closeModal: () => {
                    this.showModal = false;
                    this.formSent = false;
                    document.body.classList.remove('modal-open');
                },
                formSubmit: (event) => {
                    event.preventDefault();

                    const data = {
                        to: 'cyberacademy.progress@gmail.com',
                        subject: 'PG: Новая заяка от ' + this.formData.name,
                        message: 'У вас новая заявка от ' + this.formData.name
                        + '<br/> Телефон: ' + this.formData.phone
                        + ((this.formData.extra !== '') ? ('<br/> Сообщение: ' + this.formData.extra) : ''),
                    };

                    http.post('http://progressgaming.kz/mail.php', data);

                    this.formSent = true;

                    this.formData = {
                        name: '',
                        phone: '',
                        extra: ''
                    };
                }
            }
        },
        methods: {
            onFocus() {
                if (this.formData.phone === '') {
                    this.formData.phone = '+7'
                }
            }
        }
    }


</script>

<style scoped lang="scss">
    blockquote {
        background: #fff;
        border-radius: 3px;
        border-left: 10px solid #D1D0D4;
        padding: 20px 30px 0;
        height: 150px;

    }
</style>