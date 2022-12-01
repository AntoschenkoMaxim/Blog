module.exports = class PostDto {
	title;
	description;
	location;
	createdAt;
	// postedBy;
	id;
	// image;

	constructor(model) {
		this.title = model.title;
		this.description = model.description;
		this.location = model.location;
		this.createdAt = model.createdAt;
		// this.postedBy = model.postedBy;
		this.id = model._id;
		// this.image = model.image;
	}
}