class Number {
	constructor(str,parent) {
		this.array = [];
		this.separators = [];
		let subArray = false;
		let parentheses = 0;
		let separator = false;
		let marker = 0;
		this.layer = 0;
		if(!parent) {
			this.parent = null;
		} else {
			this.parent = parent;
		}
		if(str[1] === "s") {
			str = str.substring(2, str.length - 1); 
			for(let i = 0; i < str.length; i++) {
				if(subArray) {
					if(str[i] === "(") {
						parentheses++;
					}
					if(str[i] === ")") {
						parentheses--;
					}
					if(parentheses === 0) {
						subArray = false;
					}
					if(str[i] === ",") {
						str = str.replace(",","c");
					}if(str[i] === "{") {
						str = str.replace("{","b");
					}
					if(str[i] === "}") {
						str = str.replace("}","d");
					}
					if(str[i] === "`") {
						str = str.replace("`","g");
					}
				} else if(separator) {
					if(str[i] === "{") {
						parentheses++;
					}
					if(str[i] === "}") {
						parentheses--;
					}
					if(parentheses === 0) {
						separator = false;
						let sep = str.substring(marker,i+1);
						this.separators.push(new Separator(sep,this));
						str = str.replace(sep," ");
						i = marker;
					}
				} else {
					if(str[i] === ",") {
						str = str.replace(","," ");
						this.separators.push(new Separator(",",this));
					}
					if(str[i-1] === "s" && str[i] === "(") {
						subArray = true;
						parentheses++;
					}
					if(str[i] === "{") {
						separator = true;
						parentheses++;
						marker = i;
					}
				}
			}
			str = str.replace(/c/g,",");
			str = str.replace(/b/g,"{");
			str = str.replace(/d/g,"}");
			let array = str.split(" ");
			for(let i = 0; i < array.length; i++) {
				if(array[i][0] === "s") {
					array[i] = new SanArray(array[i],this);
				} else {
					array[i] = parseInt(array[i]);
				}
			}
			this.array = array;
			this.base = this.array.shift();
			this.iterator = this.array.shift();
			this.separators.shift();
		}
	}
	toString() {
		let str = "s(";
		str+=this.base+","+this.iterator;
		for(let i = 0; i < this.array.length; i++) {
			if(this.separators[i]) {
				str+=this.separators[i].toString();
			}
			if(this.array[i]) {
				if(this.array[i] instanceof SanArray) {
					
				} else {
					str+=this.array[i]+"";
				}
			}
		}
		str += ")";
		return str;
	}
	
}
