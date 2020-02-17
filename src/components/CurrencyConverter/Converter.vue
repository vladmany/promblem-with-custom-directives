<template>
    <div id="converter-form">
        <div class="conv-wrapper">
            <div class="input-form">
                <select @change="convert(),switch_counter_currency(input_select)" v-model="input_select">
                    <option>EUR</option>
                    <option>USD</option>
                    <option>UAH</option>
                    <option>RUB</option>
                </select>
                <input type="text" v-model="input_field" @keyup="convert">
            </div>
            <div class="switch-form">
                <button @click="switch_data(),convert()">⇄</button>
            </div>
            <div class="output-form">
                <select @change="convert" v-model="output_select">
                    <option>EUR</option>
                    <option>USD</option>
                    <option>UAH</option>
                    <option>RUB</option>
                </select>
                <input type="text" v-model="output_field" disabled>
            </div>
        </div>
    </div>
</template>

<script>

    import { output_bus } from '../../main.js'

export default {
    name: "ConverterForm",
    props: {
        currency : {
            type: String
        },
        currencies: {
            type: Object
        }
    },
    data() {
        return {
            input_field: 1,
            output_field: 0,
            input_select: "EUR",
            output_select: "USD",
            tmp: "",
            output_currency: ""
        }
    },
    methods: {
        switch_data() {
            this.tmp = this.input_field
            this.input_field = this.output_field
            this.output_field = this.tmp
            this.tmp = this.input_select
            this.input_select = this.output_select
            this.output_select = this.tmp
        },
        convert() {
            this.output_field = (this.currencies['base' + this.input_select][this.output_select] * +this.input_field).toFixed(2)
        },
        switch_counter_currency(input_select) {
            this.$emit('switch_counter_currency',input_select)
        }
    },
    created() {
        this.convert()
        output_bus.$on("switch_output_currency", data => {
            this.output_currency = data
        })
    },
    watch: {
        output_currency: function () {
            this.output_select = this.output_currency
        }
    }
}
</script>

<style scoped>
    .conv-wrapper {
        display: flex;
        justify-content: space-between;
        margin-top: 40px;
        max-width: 500px;
        /*height: 300px;*/
        borber: 3px solid black;
    }
    .input-form {
        display: flex;
        flex-direction: column;
    }
    .input-form input {
        margin-top: 20px;
    }
    .switch-form button {
        height: 60px;
        width: 60px;
        font-size: 30px;
    }
    .output-form {
        display: flex;
        flex-direction: column;
    }
    .output-form input {
        margin-top: 20px;
    }
</style>