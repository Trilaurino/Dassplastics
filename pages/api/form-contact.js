const nodemailer = require('nodemailer');
require('dotenv').config();

export default async function handler(req, res) {
	if (req.method !== 'POST') {
		res.status(405).send({ message: 'Error' });
		return;
	} else {
		let transporter = nodemailer.createTransport({
			host: 'mail.dassplastic.com.ar',
			port: 587,
			secure: false,
			auth: {
				user: process.env.STMP_EM,
				pass: process.env.STMP_PS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		let info = await transporter.sendMail({
			from: 'consulta.web@dassplastic.com.ar',
			to: process.env.RECIPIENT_EMAIL,
			subject: `Nueva consulta de la la Web de: ${req.body.values.name}`,
			text:
				req.body.values.message +
				' | Enviado por: ' +
				req.body.values.email +
				` de empresa: ${
					req.body.values.company || '<i>no aclara</i>'
				} y telefono: ${req.body.values.phone || '<i>no aclara</i>'}`,
			html: `<div>${req.body.values.message}</div><p>Enviado por: ${
				req.body.values.email
			} de empresa: ${
				req.body.values.company || '<i>o aclara</i>'
			} y telefono: ${req.body.values.phone || '<i>no aclara</i>'}</p>`,
		});
	}
	res.send('success');
}
