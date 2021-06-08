import { useState } from 'react';

const useInput = (checkValue) => {
	const [enteredValue, setEnterdValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	// validazione/invalidazione nome
	const [enteredValueIsValid, message] = checkValue(enteredValue);
	const valueInputIsInvalid = !enteredValueIsValid && isTouched;

	const changeValueHandler = (event) => {
		// setto il valore con quello in input
		setEnterdValue(event.target.value);
	};

	const blurValueHandler = () => {
		// ogni volta che il campo input perde il focus => touched
		setIsTouched(true);
	};
	const reset = () => {
		setEnterdValue('');
		setIsTouched(false);
	};

	return {
		isTouched,
		enteredValue,
		enteredValueIsValid,
		message,
		valueInputIsInvalid,
		changeValueHandler,
		blurValueHandler,
		reset,
	};
};

export default useInput;
