import Token from "./token.js"

/**
 * @global
 */
 class Tokenizer {

	static STATE_LOCAL_PART = "STATE_LOCAL_PART"
	static STATE_DOMAIN = "STATE_DOMAIN"

	static ALPHANUMERICS = "abcdefghijklmnopqrstuvwxyz1234567890"

	static LOCAL_PARTS_CHARACTERS = [...Tokenizer.ALPHANUMERICS, ..."!#$%&'*+-/=?^_`{|}~."]
	static LOCAL_DOMAIN_CHARACTERS = [...Tokenizer.ALPHANUMERICS, ..."-."]


	/**
	* @param  {string} input
	* @return {Token[]}
	*/
	static tokenize(input) {
		const characters = [...input]
		let state = Tokenizer.STATE_LOCAL_PART
		const tokens = []
		let token = new Token(Token.TYPE.LOCAL_PART, "", 0)
		for(const [index, character] of characters.entries()) {
			if(state === Tokenizer.STATE_LOCAL_PART && Tokenizer.LOCAL_PARTS_CHARACTERS.includes(character.toLowerCase())) {
				if(character === "."  && (index === 0 || characters[index + 1] === "@" || characters[index - 1] === ".")) {
					return false
				} else {
					token._buffer += character
				}
			} else if(state === Tokenizer.STATE_DOMAIN && Tokenizer.LOCAL_DOMAIN_CHARACTERS.includes(character.toLowerCase())) {
				if(character === "-" && (index === 0 || index === characters.length  -1)
					|| character === "."  && (index === token.bufferIndex || characters[index - 1] === "." || index === characters.length - 1)) {
					return false
				} else {
					token._buffer += character
				}
				if(index === characters.length - 1) {
					tokens.push(token)
				}
			} else if(state === Tokenizer.STATE_LOCAL_PART && character === "@") {
				tokens.push(token)
				token = new Token(Token.TYPE.DOMAIN, "", index + 1)
				state = Tokenizer.STATE_DOMAIN
			} else {
				return false
			}
		}
		if(tokens.length < 2) {
			return false
		}
		return tokens
	}

}

export default Tokenizer
