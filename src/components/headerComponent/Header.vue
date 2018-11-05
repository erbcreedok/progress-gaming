<template>
    <header>
        <b-navbar fixed='top' toggleable="lg" type="light">
            <div class="container">
                <router-link to="/" class="navbar-brand mr-0 mr-xl-4">
                    <img src="../../assets/logo.png" alt="" height="60px">
                </router-link>
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse" class="justify-content-around ml-0 text-center text-lg-left">

                    <b-navbar-nav class="my-3 my-lg-0 main-nav">
                        <li class="nav-item my-2">
                            <router-link to="/about" class="nav-link" active-class="active">
                                <span class="text-uppercase">О нас</span>
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/media" class="nav-link" active-class="active">
                                <span class="text-uppercase">Медиа</span>
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/news" class="nav-link" active-class="active">
                                <span class="text-uppercase">Новости</span>
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/partners" class="nav-link" active-class="active">
                                <span class="text-uppercase">Партнеры</span>
                            </router-link>
                        </li>
                        <li class="nav-item my-2">
                            <router-link to="/contacts" class="nav-link" active-class="active">
                                <span class="text-uppercase">Контакты</span>
                            </router-link>
                        </li>
                    </b-navbar-nav>

                    <b-navbar-nav class="my-3 my-lg-0 d-block d-lg-inline-block">
                        <b-button variant="black" @click="openModal">
                            <span class="text-uppercase">Записаться</span>
                        </b-button>
                    </b-navbar-nav>

                    <ul class="social-links my-3 my-lg-0 d-inline-flex">
                        <li class="social-link">
                            <a href="https://www.facebook.com/CybersportAcademy/" target="_blank" class="no-appearance">
                                <span class="icon-facebook-full"></span>
                            </a>
                        </li>
                        <li class="social-link">
                            <a href="https://www.youtube.com/channel/UC_BYyd6pqWMLDTy6NzA02Kw" target="_blank" class="no-appearance">
                                <span class="icon-youtube"></span>
                            </a>
                        </li>
                        <li class="social-link">
                            <a href="https://www.instagram.com/progress_gaming" target="_blank" class="no-appearance">
                                <span class="icon-instagram-full"></span>
                            </a>
                        </li>
                        <li class="social-link">
                            <a href="https://vk.com/progress_gaming" target="_blank" class="no-appearance">
                                <span class="icon-vk"></span>
                            </a>
                        </li>
                    </ul>

                </b-collapse>
            </div>
        </b-navbar>
        <transition name="modal">
            <div class="modal fade show" :key="2" v-if="showModal" id="callbackModal" style="display: block; padding-left: 0px;">
                <div class="modal-backdrop fade show" @click="closeModal" style="cursor: pointer; z-index:1;" :key="1"></div>
                <div class="modal-dialog modal-form" v-if="!formSent" style="z-index: 2">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p class="modal-title" id="callbackModalLabel">Отправьте заявку и запишитесь на пробную&nbsp;<span class="color-orange">тренировку</span></p>
                            <button type="button" class="close modal-closer" style="font-size: 1.6rem;line-height: 3rem;" @click="closeModal">
                                <span aria-hidden="true">
                                    <span class="icon-cancel"></span>
                                </span>
                            </button>
                            <hr class="modal-hr">
                            <form id="callbackForm" class="row" @submit="formSubmit">
                                <div class="form-group col-md-6 mb-5">
                                    <label for="name">Имя: *</label>
                                    <input type="text" required="" name="name" id="name" class="form-control" placeholder="Ваше имя"
                                           v-model="formData.name">
                                </div>
                                <div class="form-group col-md-6 mb-5">
                                    <label for="phone">Номер телефона: *</label>
                                    <input type="text" required="" name="phone" id="phone" class="form-control" placeholder="Ваш номер телефона"
                                           v-mask="'+# (###) ### ## ##'"
                                           v-model="formData.phone" @focus="onFocus">
                                </div>
                                <div class="form-group col-md-12 mb-20">
                                    <label for="extra">Дополнительно: </label>
                                    <textarea name="extra" id="extra" class="form-control" placeholder="Введите ваше сообщение"
                                              v-model="formData.extra"></textarea>
                                </div>
                                <p class="col-md-12 notifier" style="margin-bottom: 46px">
                                    * Внимание! Мы не передаем никаких данных 3-м лицам. Все конфиденциально.
                                </p>
                                <div class="col-md-12">
                                    <button class="btn btn-black">
                                        <span class="text-uppercase">Отправить</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-dialog modal-thanks" v-if="formSent" style="z-index: 2">
                    <div class="modal-content">
                        <div class="modal-body">
                            <p class="h2 text-center font-weight-bold my-6">
                                Большое спасибо! :D<br>
                                Ваша заявка принята <span class="icon-checkmark"></span>
                            </p>
                            <p class="notifier text-right">
                                <a href="#" data-dismiss="modal" class="color-gray" @click="closeModal">Закрыть</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </header>
</template>

<script>
    import Vue from 'vue'
    import VueMask from 'v-mask'
    import Resource from 'vue-resource';

    Vue.use(VueMask);
    Vue.use(Resource);
    Vue.http.options.emulateJSON = true;
    const http = Vue.http;

    export default {
        name: 'Header',
        props: {
        },
        data() {
            return {
                formData: {
                    name: '',
                    phone: '',
                    extra: ''
                },
                showModal: false,
                formSent: false,
                openModal: () => {
                    document.body.classList.add('modal-open');
                    this.showModal = true;
                    this.formSent = false;
                },
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

<style scoped lang="scss" src="./Header.scss"></style>