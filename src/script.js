const form = document.getElementById('form');

const area = document.getElementById('area');
const lights = document.getElementById('lights');
const consult = document.getElementById('consult');

const name = document.getElementById('name');
const phone = document.getElementById('phone');
const message = document.getElementById('message');

const results = document.getElementById('results');

const number = document.getElementById('number');
const address = document.getElementById('address');

const setMask = () => {
    let matrix = "+38 (###) ###-##-##";

    let i = 0, val = phone.value.replace(/\D/g, '');

    phone.value = matrix.replace(/(?!\+)./g, function(a) {
        return /[#\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
}

phone.addEventListener('input', () => {
	setMask();
	if(!phone.value.startsWith("+38") && phone.value.length <= 3) phone.value = '+38';
});
phone.addEventListener('focus', () => {
	if(!phone.value.startsWith("+38") && phone.value.length <= 3) phone.value = '+38';
});

const fixCaret = () => {
	if(phone.selectionStart < 3) phone.selectionStart = 3;
}

phone.addEventListener('click', () => fixCaret());
phone.addEventListener('keyup', () => fixCaret());
phone.addEventListener('keydown', () => fixCaret());

phone.addEventListener('blur', () => {
	if (phone.value.length <= 3) phone.value = '';
});

const updatePrice = (event) => {
    event.target.value = event.target.value.replace(/[^0-9.]/g, '');
    if (event.target.value === '0') event.target.value = '';

    const formData = new FormData(form);
    results.textContent = `Орієнтовна вартість - ${formData.get("area") * 1200 + formData.get("lights") * 600 + formData.get("consult") * 6000} ₴`;
};


area.addEventListener('input', (event) => updatePrice(event));
lights.addEventListener('input', (event) => updatePrice(event));
consult.addEventListener('input', (event) => updatePrice(event));

const validateTexts = (event) => {
	if(event.target.value.startsWith(' ')) event.target.value = event.target.value.slice(1);
}

name.addEventListener("input", (event) => validateTexts(event));
message.addEventListener("input", (event) => validateTexts(event));

form.addEventListener("submit", (event) => {
	let valid = true;

	if(phone.value.length !== 19) {
		valid = false;
		phone.focus();
	}
	console.log(phone.value.length, valid);
  
	if (!valid) event.preventDefault();
});

const copyField = (text) => {
	if (window.isSecureContext && navigator.clipboard) {
	  navigator.clipboard.writeText(text);
	} else {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		try {
			document.execCommand('copy');
		} catch(err) {
			console.error('Unable to copy to clipboard', err);
		}
		document.body.removeChild(textArea);
	}
};

number.addEventListener("click", (event) => copyField(event.target.textContent));
address.addEventListener("click", (event) => copyField(event.target.textContent));