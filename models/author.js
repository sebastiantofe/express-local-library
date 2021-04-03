const mongoose = require("mongoose");
const { Schema } = mongoose;

const { DateTime } = require('luxon');

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

authorSchema
.virtual('date_of_birth_formatted')
.get(function() {
	return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

authorSchema
.virtual('date_of_death_formatted')
.get(function() {
	return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

module.exports = mongoose.model("Author", authorSchema);
