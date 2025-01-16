import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
	.prompt([
		{
			name: 'url',
			message: 'Which URL would you like to convert?',
			type: 'input',
		},
	])
	.then((answers) => {
		const url = answers.url;

		const qr_png = qr.image(url, { type: 'png' });
		const fileName = 'qr.png';

		qr_png.pipe(fs.createWriteStream(fileName));

		fs.writeFile(
			'URL.text',
			`User generated QR Code for URL: ${url}`,
			(err) => {
				if (err) throw err;
				console.log(`Done! - Please check ${fileName}`);
			}
		);
	})
	.catch((err) => {
		console.error('An error occurred:', err.message);
	});
