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
authorSchema.virtual('lifespan').get(function() {
	let lifetime_string = '';
	if (this.date_of_birth) {
	  lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
	}
	lifetime_string += ' - ';
	if (this.date_of_death) {
	  lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
	}
	return lifetime_string;
});

// Virtual for author's url
authorSchema
.virtual('url')
.get(function() {
	return '/catalog/author/' + this._id
});

authorSchema
.virtual('date_of_birth_yyyy_mm_dd')
.get(function() {
	return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});
  
authorSchema
.virtual('date_of_death_yyyy_mm_dd')
.get(function() {
	return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
  });


module.exports = mongoose.model("Author", authorSchema);
