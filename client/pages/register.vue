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
                        id="password"
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
        };
    },
    methods: {
        async onRegisterUser() {
            try {
                let data = {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    checkpassword: this.checkpassword,
                };

                let responseR = await this.$axios.$post(
                    "/user/register",
                    data
                );
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
body {
    background-color: rgba(221, 221, 221, 0.3);
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



@media (max-width: 576px) {
    .registration-form form {
        padding: 50px 20px;
    }

}
</style>