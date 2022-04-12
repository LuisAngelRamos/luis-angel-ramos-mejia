'use strict';
const jwt = require("jwt-simple");

const AplicationsDB = require("../db/Aplications");
const AuthorizationsDB = require("../db/Authorizations");
const Joi = require('joi'); 

class AuthController {

	async auth(req, res, next) {
		try {
			let name_app = req.body.name;
			const data_app = await AplicationsDB.findOne({ name: name_app });

			if(!data_app) {
				return res.status(400).json({
					message: "Not found."
				});
			}

			const token = jwt.encode(JSON.stringify({
				name_app,
				date: (new Date()).toLocaleString()
			}), "e-backend-logger");

			let authorization = await AuthorizationsDB.findOne({ application_id: data_app.id });

			if(!authorization) {
				await AuthorizationsDB.create({
					application_id: data_app.id,
					token: token
				});
			} else {
				await AuthorizationsDB.updateOne({
					id: authorization.id
				}).set({
					token: token
				});
			}

			return res.status(200).json({
				token: token
			});

		} catch(e) {
			return res.status(400).json({
				message: "Not found."
			});
		}
	}

	async create(req, res, next) {
		const { body } = req;

		const schemaCreate = Joi.object().keys({ 
			name: Joi.string().required()
		}); 

		const result = schemaCreate.validate(body); 

		const { value, error } = result;

		const valid = error == null;

		if (!valid) { 
			res.status(422).json({ 
				message: 'Invalid request', 
				data: body 
			});
		} else {
			let aplication = AplicationsDB.findOne({ name: body.name });
			if(aplication) {
				res.status(400).json({ 
					message: 'Already Registered' 
				});
			} else {
				await AplicationsDB.create({
					name: body.name
				});

				res.json({ message: 'Success' });
			}
		}
	}
}

module.exports = new AuthController();
