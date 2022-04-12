'use strict';

const LogsDB = require("../db/Logs");
const Joi = require('joi'); 

class MainController {

	async all(req, res, next) {
		var logs = await LogsDB.find({});
		res.json({ logs });
	}

	async create(req, res, next) {

		const { body } = req;

		const schemaCreate = Joi.object().keys({ 
			type: Joi.string().required().valid('error','info', 'warning'),
			priority: Joi.string().required().valid('lowest','low', 'medium', 'high', 'highest'),
			path: Joi.string().required(),
			message: Joi.string().required(),
			request: Joi.any().required(),
			response: Joi.any().required()
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
			await LogsDB.create({
				application_id: res.auth.application_id._id,
				type: body.type,
				priority: body.priority,
				path: body.path,
				message: body.message,
				request: body.request,
				response: body.response
			});

			res.json({ message: 'Success' });
		}
	}

	async info(req, res, next) {
		var log = await LogsDB.findOne({
			_id: req.params.id
		});
		if(!log) {
			res.status(400).json({ 
				message: 'Register Not Found'
			});
		} else {
			res.json({ log });
		}
	}

	async update(req, res, next) {
		const { body } = req;

		const schemaUpdate = Joi.object().keys({ 
			type: Joi.string().valid('error','info', 'warning').optional(),
			priority: Joi.string().valid('lowest','low', 'medium', 'high', 'highest').optional(),
			path: Joi.string().optional(),
			message: Joi.string().optional(),
			request: Joi.any().optional(),
			response: Joi.any().optional()
		}); 
		
		const result = schemaUpdate.validate(body); 

		const { value, error } = result;

		const valid = error == null;

		if (!valid) { 
			res.status(422).json({ 
				message: 'Invalid request', 
				data: body 
			});
		} else { 
			let log = await LogsDB.findOne({_id: req.params.id});
			if(!log) {
				res.status(400).json({ 
					message: 'Register Not Found'
				});
			} else {
				return LogsDB.updateOne(
					{ 
						_id: req.params.id 
					},
					{ 
						$set: {
							...body
						} 
				}).then(result => {
					res.json({ message: 'Success' });
				});
			}
		}
	}

	async delete(req, res, next) {
		await LogsDB.deleteOne({_id: req.params.id});
		res.json({ message: 'Success' });
	}
}

module.exports = new MainController();
