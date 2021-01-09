<template>
    <div class="container container-profile">
        <div class="registration-form-profile">
            <form>
                <h2>Olá, {{ $store.state.user.name }}</h2>
                <div class="form-group">
                    <label>Atualizar nome</label>
                    <input
                        type="text"
                        class="form-control item"
                        placeholder="Nome"
                        v-model="name"
                    />
                </div>
                <div class="form-group">
                    <label>Atualizar senha</label>
                    <input
                        type="password"
                        class="form-control item"
                        placeholder="Senha"
                        v-model="password"
                    />
                </div>
                <div class="form-group">
                    <button
                        @click.prevent="onUpdateUser"
                        type="button"
                        class="btn btn-block create-account"
                    >
                        Atualizar dados
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    middleware: "redirectIfNoUser",
    data() {
        return {
            name: "",
            password: "",
        };
    },
    methods: {
        async onUpdateUser() {
            try {
                this.$axios.setToken(this.$store.state.token)
                let response = await this.$axios.$post("/user/update",{
                    name: this.name,
                    password: this.password
                });
                if(this.name){
                    this.$store.dispatch("updateUser", this.name)
                }
                this.name = "";
                this.password = "";
                this.$bvToast.toast(response.message, {
                    title: "Sucesso",
                    autoHideDelay: 3000,
                    variant: "success",
                    toaster: "b-toaster-top-center",
                    solid: true,
                });
            } catch (err) {
                this.$bvToast.toast(err.response.data.message, {
                    title: "Erro",
                    autoHideDelay: 3000,
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

.registration-form-profile {
    padding: 50px 0;
}

.registration-form-profile form {
    background-color: #fff;
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}

.registration-form-profile form h2 {
    text-align: center;
    margin-bottom: 1.5rem;
}

.registration-form-profile .item {
    border-radius: 20px;
}

.registration-form-profile .create-account {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: rgb(250, 83, 83);
    border: none;
    color: white;
    margin-top: 50px;
}

.registration-form-profile form label {
    font-size: 14px;
    margin-left: 1rem;
}

@media (max-width: 576px) {
    .registration-form-profile form {
        padding: 50px 20px;
    }
}
</style>