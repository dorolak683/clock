const Clock = Vue.extend({
	template: '#Clock',
	props: {
		tz: { default: moment.tz.guess() }
	},
	data: () => ({
		t: 0
	}),
	computed: {
		emoji: ({ t }) => 0x1F550 + (0 | t/12 + t*11 + 11) % 12,
		style: ({ t }) => `transform: rotate(${t*30 % 360}deg)`
	},
	methods: {
		tick() {
			const m = moment().tz(this.tz);
			this.t = m.hours()*12 + m.minutes()/5 | 0;
			setTimeout(this.tick, 3e5 - m%3e5);
		}
	},
	created() {
		this.tick();
	},
	filters: {
		fromCode: String.fromCodePoint
	}
});

const App = Vue.extend({
	components: { Clock }
});

new App({ el: 'main' });