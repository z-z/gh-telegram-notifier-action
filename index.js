const core   = require('@actions/core');
const github = require('@actions/github');
const https  = require('https');

try
{
	const botApiKey = core.getInput('botApiKey');
	const chats     = (core.getInput('botApiKey')).split(',');
	const msg       = core.getInput('msg');

	for(let i in chats)
		https.request(`https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chats}&text=${msg}`);
}
catch (error)
{
	core.setFailed(error.message);
}
