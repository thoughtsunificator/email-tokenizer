import assert from "assert"
import { Token } from "../index.js"

describe("token", () => {

	it("types", () => {
		assert.strictEqual(Token.TYPE.LOCAL_PART, "LOCAL_PART")
		assert.strictEqual(Token.TYPE.DOMAIN, "DOMAIN")
	})

	it("instance", () => {
		const route = new Token(Token.TYPE.DOMAIN, "test", 1)
		assert.strictEqual(route.type, Token.TYPE.DOMAIN)
		assert.deepEqual(route.buffer, "test")
		assert.deepEqual(route.bufferIndex, 1)
	})

})
