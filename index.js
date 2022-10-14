const core   = require('@actions/core');
const github = require('@actions/github');
const https  = require('https');

try
{
	const botApiKey = core.getInput('botApiKey');
	const chats     = (core.getInput('chats')).split(',');
	let msg         = core.getInput('msg');

	msg = encodeURI(msg);
	msg = msg.replace(/(\[[^\][]*]\(http[^()]*\))|[_*[\]()~>#+=|{}.!-]/gi, (x,y) => y ? y : '\\' + x);

	for(let i in chats)
	{
		let chat = chats[i].trim();
		https.get(`https://api.telegram.org/bot${botApiKey}/sendMessage?chat_id=${chat}&text=${msg}&parse_mode=MarkdownV2&disable_web_page_preview=1`);
	}
}
catch (error)
{
	core.setFailed(error.message);
}
