const { Schema, model, default: mongoose } = require('mongoose');

const PostSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	location: { type: String, required: true },
	postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	// image: { type: String },
	// likeCount: {
	// 	type: Number,
	// 	default: 0
	// },
}, {
	timestamps: true
})

module.exports = model('Post', PostSchema)