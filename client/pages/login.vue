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
                    <button
                        @click="onLogin"
                        type="button"
                        class="btn btn-block create-account"
                    >
                        Entrar <i class="fa fa-sign-in" aria-hidden="true"></i>
                    </button>
                </div>
                <p>
                    Ainda não é cadastrado? Crie uma conta
                    <NuxtLink class="redirect" to="/register">aqui</NuxtLink>
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
            email: "",
            password: "",
        };
    },
    methods: {
        async onLogin() {
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

.registration-form .social-media {
    max-width: 600px;
    background-color: #fff;
    margin: auto;
    padding: 35px 0;
    text-align: center;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    color: #9fadca;
    border-top: 1px solid #dee9ff;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}



@media (max-width: 576px) {
    .registration-form form {
        padding: 50px 20px;
    }

}
</style>