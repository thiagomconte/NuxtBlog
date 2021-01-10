<template>
    <div class="container">
        <div class="registration-form">
            <form>
                <div class="form-icon">
                    <span
                        ><i class="fa fa-user-o" aria-hidden="true"></i>
                    </span>
                </div>
                <div class="form-group">
                    <input
                        type="text"
                        class="form-control item"
                        id="username"
                        placeholder="Seu nome"
                        v-model="name"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="email"
                        class="form-control item"
                        id="email"
                        placeholder="Email"
                        v-model="email"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control item"
                        id="password"
                        placeholder="Senha"
                        v-model="password"
                    />
                </div>
                <div class="form-group">
                    <input
                        type="password"
                        class="form-control item"
                        id="checkpassword"
                        placeholder="Confirme a senha"
                        v-model="checkpassword"
                    />
                </div>
                <div class="form-group">
                    <button
                        @click="onRegisterUser"
                        type="button"
                        class="btn btn-block create-account"
                    >
                        Criar uma Conta
                    </button>
                </div>
                <p>
                    Já possui uma conta? Entre
                    <NuxtLink class="redirect" to="/login">aqui</NuxtLink>
                </p>
                <div class="overlay" v-if="showSpinner">
                    <div class="overlay__wrapper">
                        <div class="overlay__spinner">
                            <b-spinner class="spinner"></b-spinner>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "redirectIfUser",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            checkpassword: "",
            showSpinner: false,
        };
    },
    methods: {
        async onRegisterUser() {
            try {
                this.showSpinner = true;
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    checkpassword: this.checkpassword,
                };

                let responseR = await this.$axios.$post("/user/register", data);
                if (responseR.success) {
                    this.$store
                        .dispatch("login", {
                            email: this.email,
                            password: this.password,
                        })
                        .catch((err) => {
                            this.$bvToast.toast(err, {
                                title: "Erro",
                                autoHideDelay: 3000,
                                variant: "danger",
                                toaster: "b-toaster-top-center",
                                solid: true,
                            });
                        });
                }
            } catch (err) {
                this.showSpinner = false;
                this.$bvToast.toast(err.response.data.message, {
                    title: "Erro",
                    autoHideDelay: 5000,
                    variant: "danger",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            }
        },
    },
};
</script>

<style>
.spinner {
    height: 3rem;
    width: 3rem;
    text-align: center;
    display: block;
    margin: 0 auto;
}

.registration-form {
    padding: 50px 0;
}

.registration-form form {
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form .form-icon {
    text-align: center;
    background-color: rgb(250, 83, 83);
    border-radius: 50%;
    font-size: 40px;
    color: white;
    width: 100px;
    height: 100px;
    margin: auto;
    margin-bottom: 50px;
    line-height: 100px;
}

.registration-form .item {
    border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}

.registration-form .create-account {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: rgb(250, 83, 83);
    border: none;
    color: white;
    margin-top: 20px;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
}

.overlay__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}

.overlay__spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.spinner {
    display: block;
    margin: 0 auto;
    height: 5rem;
    width: 5rem;
    color: rgb(255, 83, 83);
}

@media (max-width: 576px) {
    .registration-form form {
        padding: 50px 20px;
    }
}
</style>