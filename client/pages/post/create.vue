<template>
    <div class="container container-create">
        <h1>Criar nova postagem</h1>
        <hr class="hr-create" />
        <form>
            <label>Título</label>
            <input type="text" v-model="title" />
            <label>Descrição</label>
            <input type="text" v-model="description" />
            <label>Slug</label>
            <input type="text" v-model="slug" />
            <label>Conteúdo</label>
            <b-form-textarea
                id="textarea-rows-create"
                placeholder="Comente aqui"
                rows="5"
                v-model="content"
            ></b-form-textarea>
            <label>Link da imagem</label>
            <input type="text" v-model="img" />
            <label>Autor da imagem</label>
            <input type="text" v-model="imgOwner" />
            <a
                @click.prevent="onPostCreate"
                href="#"
                class="pull-left button-create mb-5"
                >POSTAR</a
            >
        </form>
    </div>
</template>

<script>
export default {
    middleware: "redirectIfNoUser",
    data() {
        return {
            title: "",
            description: "",
            slug: "",
            content: "",
            img: "",
            imgOwner: "",
        };
    },
    methods: {
        async onPostCreate(event) {
            try {
                let data = {
                    title: this.title,
                    description: this.description,
                    slug: this.slug,
                    content: this.content,
                    img: this.img,
                    imgOwner: this.imgOwner,
                };

                let response = await this.$axios.$post(
                    "/post/add",
                    data
                );
                this.$router.push("/", () => {
                    this.$root.$bvToast.toast(response.message, {
                        title: "Sucesso",
                        autoHideDelay: 3000,
                        variant: "success",
                        toaster: "b-toaster-top-center",
                        solid: true,
                    });
                });
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
.container-create {
    margin: 3rem auto;
    padding: 1rem;
    border-radius: 0.3rem;
    background: rgba(221, 221, 221, 0.3);
}

h1 {
    text-align: center;
    margin-bottom: 2rem;
}

.hr-create {
    border: 1px solid black;
}

label {
    margin-top: 2rem;
    font-size: 24px;
}

input {
    width: 100%;
    border-radius: 0.3rem;
    border: 1px solid rgba(150, 149, 149, 0.5);
    height: 2rem;
    font-size: 19px;
    color: rgb(60, 60, 60);
}

input:focus {
    border: 1px solid rgba(80, 80, 80, 0.5);
    outline: none;
}

#textarea-rows-create {
    background: white;
    border-radius: 0.3rem;
    padding: 1 1rem;
    font-size: 1rem;
    transition: 0.2s;
    color: rgb(60, 60, 60);
}

#textarea-rows-create:focus {
    outline: none;
    border: 1px solid gray;
    box-shadow: 0 0 0 0;
}

.button-create {
    display: block;
    width: 115px;
    height: 45px;
    background: rgb(250, 83, 83);
    padding: 10px;
    text-align: center;
    border-radius: 5px;
    color: white;
    font-weight: bold;
    line-height: 25px;
    margin-top: 2rem;
}

.button-create:hover {
    text-decoration: none;
    color: white;
    background: rgb(247, 0, 0);
}
</style>