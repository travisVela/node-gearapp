import mongoose from "mongoose";

const gearSchema = new mongoose.Schema(
	{
		type: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		year: {
			type: Number,
		},
		serial_number: {
			type: String
		},
		description: {
			type: String,
		},
		owner_id : {
			type: String
		}
	},
	{ timestamps: true }
);

const Gear = mongoose.model("Gear", gearSchema);

export default Gear;
