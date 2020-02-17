<template>
	<div id="counter">
		<div class="change-currency">
			<span>Your currency: </span>
			<select v-model="currency">
				<option>EUR</option>
				<option>USD</option>
				<option>UAH</option>
				<option>RUB</option>
			</select>
		</div>
		<div class="counters-wrapper">
			<button @click="output_currency = 'EUR'">
				<span>EUR</span>
				<span v-if="currency=='EUR'">{{ currencies.baseEUR.EUR }}</span>
				<span v-if="currency=='USD'">{{ currencies.baseUSD.EUR }}</span>
				<span v-if="currency=='UAH'">{{ currencies.baseUAH.EUR }}</span>
				<span v-if="currency=='RUB'">{{ currencies.baseRUB.EUR }}</span>
			</button>
			<button @click="output_currency = 'USD'">
				<span>USD</span>
				<span v-if="currency=='EUR'">{{ currencies.baseEUR.USD }}</span>
				<span v-if="currency=='USD'">{{ currencies.baseUSD.USD }}</span>
				<span v-if="currency=='UAH'">{{ currencies.baseUAH.USD }}</span>
				<span v-if="currency=='RUB'">{{ currencies.baseRUB.USD }}</span>
			</button>
			<button @click="output_currency = 'UAH'">
				<span>UAH</span>
				<span v-if="currency=='EUR'">{{ currencies.baseEUR.UAH }}</span>
				<span v-if="currency=='USD'">{{ currencies.baseUSD.UAH }}</span>
				<span v-if="currency=='UAH'">{{ currencies.baseUAH.UAH }}</span>
				<span v-if="currency=='RUB'">{{ currencies.baseRUB.UAH }}</span>
			</button>
			<button>
				<span @click="output_currency = 'RUB'">RUB</span>
				<span v-if="currency=='EUR'">{{ currencies.baseEUR.RUB }}</span>
				<span v-if="currency=='USD'">{{ currencies.baseUSD.RUB }}</span>
				<span v-if="currency=='UAH'">{{ currencies.baseUAH.RUB }}</span>
				<span v-if="currency=='RUB'">{{ currencies.baseRUB.RUB }}</span>
			</button>
		</div>
		<converter-form :currency="currency" :currencies="currencies" @switch_counter_currency="switch_counter_currency"></converter-form>
		<chart></chart>
	</div>
</template>

<script>
import ConverterForm from "./Converter"
import Chart from "./Chart"
import { output_bus } from '../../main.js'

export default {
	components: {ConverterForm, Chart},
  name: "Counter",
  data() {
	return {
		currency: "EUR",
		currencies: {
			"baseEUR": {
				"EUR": 1,
				"USD": 1.09,
				"UAH": 26.65,
				"RUB": 68.72
			},
			"baseUSD": {
				"EUR": 0.92,
				"USD": 1,
				"UAH": 24.42,
				"RUB": 62.98
			},
			"baseUAH": {
				"EUR": 0.038,
				"USD": 0.041,
				"UAH": 1,
				"RUB": 2.58
			},
			"baseRUB": {
				"EUR": 0.015,
				"USD": 0.016,
				"UAH": 0.39,
				"RUB": 1
			},
		},
		output_currency: ""
	}
  },
  methods: {
	switch_counter_currency(input_select) {
		this.currency = input_select
	}
  },
	watch: {
		output_currency: function () {
			output_bus.$emit("switch_output_currency",this.output_currency)
		}
	}
}
</script>

<style type="text/css" scoped>
	.change-currency {
		max-width: 500px;
		display: flex;
		justify-content: flex-end;
		margin-bottom: 50px;
	}	
	.change-currenct span {
		/*float: right;*/
	}
	.counters-wrapper {
		display: flex;
		max-width: 500px;
		justify-content: center;
	}
	.counters-wrapper button {
		display: flex;
		flex-direction: column;
		width: 60px;
		height: 40px;
		align-items: center;
		justify-content: center;
		border-radius: 15px;
		border-width: 0px;
		background-color: gray;
		margin-right: 25px;
		outline: none;
		user-select: none;
	}
	.counters-wrapper button:hover {
		cursor: pointer;
	}
	.counters-wrapper button span {
		color: #00FF00;
		font-weight: bold;
	}
</style>
