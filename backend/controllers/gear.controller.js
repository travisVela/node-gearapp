import mongoose from "mongoose";
import Gear from "../models/gear.model.js";
import User from "../models/user.model.js";


export const getGear = async (req, res) => {

    //SAVE TO GEAR COLLECTION
    try {
        const auth_user = req.user
        const auth_gear = await Gear.find({owner_id: auth_user.id})
        if (!auth_gear) {
            return res.status(204).json({"message": "No gear available"})
        }
        return res.status(200).json({auth_gear})
    } catch (error) {
        console.log("Error in getting gear controller", error.message);
		res.status(500).json({ message: error.message });
    }
}
export const addGear = async (req, res) => {
    let requestBody;
	if (Buffer.isBuffer(req.body)) {
		try {
		  requestBody = JSON.parse(req.body.toString('utf8'));
		} catch (error) {
		  console.error('Error parsing buffer as JSON:', error);
		  return res.status(400).send('Invalid JSON in request body.');
		}
	  } else {
		requestBody = req.body; // Assuming it's already parsed if not a Buffer
	  }

    try {
        const owner_id = req.user.id
        const {type, brand, model, year, description, serial_number} = requestBody
        const add = await Gear.create({
            type, brand, model, year, description, serial_number, owner_id
        })

        res.status(201).json(add);

    } catch (error) {
        console.log("Error in adding gear", error.message);
		res.status(500).json({ message: error.message });
    }
}
export const updateGear = async (req, res) => {
    let requestBody;
	if (Buffer.isBuffer(req.body)) {
		try {
		  requestBody = JSON.parse(req.body.toString('utf8'));
		} catch (error) {
		  console.error('Error parsing buffer as JSON:', error);
		  return res.status(400).send('Invalid JSON in request body.');
		}
	  } else {
		requestBody = req.body; // Assuming it's already parsed if not a Buffer
	  }
    try {
        const update_info = requestBody
        const gear_to_update = await Gear.findById(requestBody._id)

         if (!req.user) {
            return res.sendStatus(401)
        }

        if (!gear_to_update) {
            return res.status(404).json({"message": "Item not found"})
        }

        if (req.user) {
            gear_to_update.type = update_info.type
            gear_to_update.brand = update_info.brand
            gear_to_update.model = update_info.model
            gear_to_update.year = update_info.year
            gear_to_update.description = update_info.description
            gear_to_update.serial_number = update_info.serial_number
            gear_to_update.save()
        }

        res.status(200).json({gear_to_update})

    } catch (error) {
        console.log("Error in adding gear", error.message);
		res.status(500).json({ message: error.message });
    }
}
export const deleteGear = async (req, res) => {

    try {
        if (!req.user) {
            return res.sendStatus(401)
        }
        const gear_to_delete = await Gear.findByIdAndDelete(req.params.id)

        if (!gear_to_delete) {
            res.sendStatus(404)
        }
        res.status(200).json({'message': 'Item deleted successfully'})

    } catch (error) {

    }
}
