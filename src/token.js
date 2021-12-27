/**
 * @global
 */
class Token {

	/**
	 * @typedef {string} TokenType
	 * @enum {TokenType}
	 */
	static TYPE = {
		LOCAL_PART: "LOCAL_PART",
		DOMAIN: "DOMAIN"
	}

	/**
	 * @param   {TokenType} type
	 * @param   {string}    buffer
	 * @param   {number}    bufferIndex
	 */
	constructor(type, buffer, bufferIndex) {
		this._type = type
		this._buffer = buffer
		this._bufferIndex = bufferIndex
	}

	/**
	 * @type {TokenType}
	 */
	get type() {
		return this._type
	}

	/**
	 * @type {string}
	 */
	get buffer() {
		return this._buffer
	}

	/**
	 * @type {number}
	 */
	get bufferIndex() {
		return this._bufferIndex
	}

}

export default Token
