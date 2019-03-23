const Modification = require('../models/Modification');

const modifications = [];

const modification1 = new Modification({
	name: 'Mod1',
	acronym: 'M1',
	description: 'This is modification 1'
});

modifications.push(modification1);

const modification2 = new Modification({
	name: 'Mod2',
	acronym: 'M2',
	description: 'This is modification 2'
});

modifications.push(modification2);

module.exports = modifications;
