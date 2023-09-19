import assert from "assert"
import { Tokenizer, Token } from "../index.js"

function randomLocalPart(size) {
	let str = ""
	for(let i =0; i < size;i++) {
		str += Tokenizer.LOCAL_PARTS_CHARACTERS[Math.round(Math.random() * (Tokenizer.LOCAL_PARTS_CHARACTERS.length - 1))]
	}
	return str
}

function randomDomainPart(size) {
	let str = ""
	for(let i =0; i < size;i++) {
		str += Tokenizer.LOCAL_DOMAIN_CHARACTERS[Math.round(Math.random() * (Tokenizer.LOCAL_DOMAIN_CHARACTERS.length - 1))]
	}
	return str
}

describe("tokenizer", () => {

	it("schema", () => {
		const tokens = Tokenizer.tokenize("test@example.com")
		assert.ok(tokens instanceof Array)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_bufferIndex"), true)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_buffer"), true)
		assert.strictEqual(Object.hasOwnProperty.call(tokens[0], "_type"), true)
		assert.strictEqual(typeof tokens[0].bufferIndex, "number")
		assert.strictEqual(typeof tokens[0].buffer, "string")
		assert.strictEqual(typeof tokens[0].type, "string")
	})

	it("buffer", () => {
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[0].buffer, "test")
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[1].buffer, "fdsfds.com")
		assert.strictEqual(Tokenizer.tokenize("test@localhost")[1].buffer, "localhost")
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[0].buffer, "tescxzcxzcxzt")
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[1].buffer, "fdsfds.fr")
	})

	it("bufferIndex", () => {
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[1].bufferIndex, 5)
		assert.strictEqual(Tokenizer.tokenize("test@localhost")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("test@localhost")[1].bufferIndex, 5)
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[0].bufferIndex, 0)
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[1].bufferIndex, 14)
	})

	it("type", () => {
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[0].type, Token.TYPE.LOCAL_PART)
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[0].type, Token.TYPE.LOCAL_PART)
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds.com")[1].type, Token.TYPE.DOMAIN)
		assert.strictEqual(Tokenizer.tokenize("tescxzcxzcxzt@fdsfds.fr")[1].type, Token.TYPE.DOMAIN)
	})

	it("invalid", () => {
		assert.notStrictEqual(Tokenizer.tokenize(`${randomLocalPart(64)}@f`), false)
		assert.notStrictEqual(Tokenizer.tokenize(`${randomLocalPart(64)}@${randomDomainPart(255)}`), false)
		assert.strictEqual(Tokenizer.tokenize(`${randomLocalPart(64)}@${randomDomainPart(256)}`), false)
		assert.strictEqual(Tokenizer.tokenize(`f@${randomDomainPart(256)}`), false)
		assert.strictEqual(Tokenizer.tokenize(`${randomLocalPart(65)}@f`), false)
		assert.notStrictEqual(Tokenizer.tokenize("1@f"), false)
		assert.notStrictEqual(Tokenizer.tokenize("1@f.t"), false)
		assert.strictEqual(Tokenizer.tokenize("dsadsads"), false)
		assert.strictEqual(Tokenizer.tokenize("te st @fdsfds.com"), false)
		assert.strictEqual(Tokenizer.tokenize("test@fd sfds.com"), false)
		assert.strictEqual(Tokenizer.tokenize("@f"), false)
		assert.strictEqual(Tokenizer.tokenize("test@fdsfds..com"), false)
		assert.strictEqual(Tokenizer.tokenize("test@@fdsfds.com"), false)
		assert.strictEqual(Tokenizer.tokenize("@@fdsfds.com"), false)
		assert.strictEqual(Tokenizer.tokenize("@s@fdsfds.com"), false)
		assert.strictEqual(Tokenizer.tokenize("@s@fdsfds@.com"), false)
		assert.strictEqual(Tokenizer.tokenize("@.com"), false)
		assert.notStrictEqual(Tokenizer.tokenize("test@localhost"), false)
	})

})
