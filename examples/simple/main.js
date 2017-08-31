var NextForm = window.NextForm;

var vm = new Vue({
	el: "#app",
	components: {
		"next-form": NextForm.component
	},

	methods: {
		prettyJSON: function(json) {
			if (json) {
				json = JSON.stringify(json, undefined, 4);
				json = json.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
				return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
					var cls = "number";
					if (/^"/.test(match)) {
						if (/:$/.test(match)) {
							cls = "key";
						} else {
							cls = "string";
						}
					} else if (/true|false/.test(match)) {
						cls = "boolean";
					} else if (/null/.test(match)) {
						cls = "null";
					}
					return "<span class=\"" + cls + "\">" + match + "</span>";
				});
			}
		}
	},

	data: {
		model: {
			id: 1,
			name: ""
		},
		schema: {
			fields: [
				{
					type: "input",
					inputType: "text",
					label: "Name",
					model: "name",
					readonly: false,
					featured: true,
					required: true,
					disabled: false,
					placeholder: "User's name",
					id: "test"
					//validator: NextForm.validators.string
				}
			]
		},

		formOptions: {
			validateAfterLoad: true,
			validateAfterChanged: true
		}
	}
});