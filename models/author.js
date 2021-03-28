const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
	first_name: { type: String, required: true, maxlength: 100 },
	family_name: { type: String, required: true, maxlength: 100 },
	date_of_birth: Date,
	date_of_death: Date,
});

// Virtual for author's full name

authorSchema
.virtual("name")
.get(function () {
	return this.family_name + ", " + this.first_name;
});

// Virtual for author's lifespan
authorSchema
.virtual('lifespan')
.get(function() {
	return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString();
});

// Virtual for author's url
authorSchema
.virtual('url')
.get(function() {
	return '/catalog/author/' + this._id
});


module.exports = mongoose.model("Author", authorSchema);
