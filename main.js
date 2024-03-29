class Number {
	constructor(str) {
		if(str[0] === "1" && str[1] === "0" && str[2] === "^") {
			this.magnitude = new Number(str.substring(3, str.length));
			this.type = 1;
		} else {
			this.value = parseFloat(str);
		}
	}
	clean() {
		if(this.value !== undefined) {
			if(this.magnitude) {
				this.value = undefined;
				return this;
			}
			if(this.value > 1e6) {
				return new Number("10^"+Math.log10(this.value));
			} else {
				return this;
			}
		} else {
			this.magnitude = this.magnitude.clean();
			return this;
		}
		return this;
	}
	toString() {
		if(this.magnitude && this.type === 1) {
			if(this.magnitude.value) {
				let val = Math.floor(this.magnitude.value);
				let val2 = Math.floor(100*(10**(this.magnitude.value-val)))/100;
				return val2+"*10^"+val;
			}
		} else {
			return Math.floor(this.value).toString();
		}
	}
	get nests() {
		if(!this.magnitude) {
			return 0;
		} else {
			if(this.type === this.magnitude.type) {
				return this.magnitude.nests;
			} else {
				return 1;
			}
		}
	}
	get innermost() {
		if(!this.magnitude) {
			return this;
		} else {
			return this.magnitude.innermost;
		}
	}
	static comp(a,b) {
		if(a.value != undefined && b.value != undefined) {
			if(a.value > b.value) {
				return a;
			} else if(a.value < b.value) {
				return b;
			} else {
				return "equal";
			}
		} else if(a.value != undefined && b.value == undefined) {
			return b;
		} else if(b.value != undefined && a.value == undefined) {
			return a;
		} else {
			if(Number.comp(a.magnitude,b.magnitude) === a.magnitude) {
				return a;
			} else if(Number.comp(a.magnitude,b.magnitude) === b.magnitude) {
				return b;
			} else {
				return "equal";
			}
		}
	}
}
let add = 0;
let add2 = 0
let add3 = 0.0000001;
let mul = 1.001;
let number = new Number("0");
let phase = 0;
let threshold0 = new Number("1000");
let threshold1 = new Number("10^6");
let threshold2 = new Number("10^30");
function update() {
	if(phase === 0) {
		if(Number.comp(number,threshold1) !== threshold1) {
			phase = 1;
		}
		add2 += add3;
		add += add2;
		if(phase === 0) {
			number.value += add;
		}
		if(Number.comp(number,threshold0) !== threshold0) {
			add3 += 0.0000001;
		}
	}
	if(phase === 1) {
		number.innermost.value *= mul*number.nests;
	}
	number = number.clean();
	document.getElementById("number").innerHTML = number.toString();
}
setInterval(update,10);
