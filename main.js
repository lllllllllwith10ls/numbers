class Number {
	constructor(str) {
		this.type = "number";
		if(str[0] === "1" && str[1] === "0" && str[2] === "^") {
			this.magnitude = new Number(str.substring(3, str.length));
		} else {
			this.value = parseFloat(str);
		}
	}
	clean() {
		if(this.type === "number") {
			if(this.value != undefined) {
				if(this.value > 1e6) {
					return new Number("10^"+Math.log10(this.value).toString());
				} else {
					return this;
				}
			} else {
				this.magnitude = this.magnitude.clean();
				return this;
			}
		}
	}
	toString() {
		if(this.magnitude) {
			if(this.magnitude.value) {
				let val = Math.floor(this.magnitude.value);
				let val2 = Math.floor(100*(10**(this.magnitude.value-val)))/100"
				return val2+"*10^"+val;
			}
		} else {
			return Math.floor(this.value).toString();
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
let mul = 1.0001;
let number = new Number("0");
let phase = 0;
let threshold1 = new Number("10^6");
function update() {
	if(phase === 0) {
		add2 += add3;
		add += add2;
		if(phase === 0) {
			number.value += add;
		}
		if(Number.comp(number,threshold1) !== threshold1) {
			phase = 1;
		}
	}
	if(phase === 1) {
		number.magnitude *= mul;
	}
	number = number.clean();
	document.getElementById("number").innerHTML = number.toString();
}
setInterval(update,10);
