import { expect } from "chai";
import { createVueField, trigger, checkAttribute } from "../util";

import Vue from "vue";
import fieldInput from "src/fields/core/fieldInput.vue";

Vue.component("fieldInput", fieldInput);

let el, vm, field;

function createField(test, schema = {}, model = null, disabled = false, options) {
	[el, vm, field] = createVueField(test, "fieldInput", schema, model, disabled, options);
}

describe("fieldInput.vue", function() {

	describe("check template", () => {
		let schema = {
			type: "input",
			inputType: "text",
			label: "Name",
			model: "name",
			autocomplete: "off",
			placeholder: "Field placeholder",
			readonly: false
		};
		let model = { name: "John Doe" };
		let input;

		before(() => {
			createField(this, schema, model, false);
			input = el.getElementsByTagName("input")[0];
		});

		it("should contain an input text element", () => {
			expect(field).to.be.exist;
			expect(field.$el).to.be.exist;

			expect(input).to.be.defined;
			expect(input.type).to.be.equal("text");
			expect(input.classList.contains("form-control")).to.be.true;
		});

	

	});

});
