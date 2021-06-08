import React, { useState } from 'react';
import useInput from '../hooks/use-input';
import classes from './AddMovie.module.css';

const AddMovie = (props) => {
	let isFormValid = false;

	const [enteredTextOptional, setEnteredTextOptional] = useState('');

	const checkTitle = (title) => {
		if (title === '') {
			return [false, 'Title cannot be empty'];
		} else if (title.length < 4) {
			return [false, 'Title must be at least 4 chars long'];
		}
		return [true, 'Valid title'];
	};

	const checkDate = (date) => {
		if (date === '') {
			return [false, 'Date cannot be empty'];
		}
		return [true, 'Valid date'];
	};

	const {
		isTouched: titleIsTouched,
		enteredValue: enteredTitle,
		enteredValueIsValid: enteredTitleIsValid,
		message: titleMessage,
		valueInputIsInvalid: titleInputIsInvalid,
		changeValueHandler: changeTitleHandler,
		blurValueHandler: blurTitleHandler,
		reset: resetTitle,
	} = useInput(checkTitle);
	const {
		isTouched: dateIsTouched,
		enteredValue: enteredDate,
		enteredValueIsValid: enteredDateIsValid,
		message: dateMessage,
		valueInputIsInvalid: dateInputIsInvalid,
		changeValueHandler: changeDateHandler,
		blurValueHandler: blurDateHandler,
		reset: resetDate,
	} = useInput(checkDate);

	if (enteredTitleIsValid && enteredDateIsValid) {
		isFormValid = true;
	}

	function submitHandler(event) {
		event.preventDefault();

		const movie = {
			title: enteredTitle,
			openingText: enteredTextOptional,
			releaseDate: enteredDate,
		};

		props.onAddMovie(movie);

		resetTitle();
		resetDate();
		setEnteredTextOptional('');

		window.alert('Movie added correctly');
	}

	const changeTextOptionalHandler = (event) => {
		setEnteredTextOptional(event.target.value);
	};

	return (
		<form onSubmit={submitHandler}>
			<div
				className={
					titleInputIsInvalid
						? [classes.control, classes.invalid].join(' ')
						: titleIsTouched
						? [classes.control, classes.valid].join(' ')
						: classes.control
				}>
				<label htmlFor='title'>Title</label>
				<input
					type='text'
					id='title'
					onChange={changeTitleHandler}
					onBlur={blurTitleHandler}
					value={enteredTitle}
				/>
				{titleIsTouched && (
					<p
						className={
							titleInputIsInvalid ? classes.errTxt : classes.successTxt
						}>
						{titleMessage}
					</p>
				)}
			</div>
			<div className={classes.control}>
				<label htmlFor='opening-text'>Opening Text</label>
				<textarea
					rows='5'
					id='opening-text'
					onChange={changeTextOptionalHandler}
					value={enteredTextOptional}></textarea>
			</div>
			<div
				className={
					dateInputIsInvalid
						? [classes.control, classes.invalid].join(' ')
						: dateIsTouched
						? [classes.control, classes.valid].join(' ')
						: classes.control
				}>
				<label htmlFor='date'>Release Date</label>
				<input
					type='date'
					id='date'
					onChange={changeDateHandler}
					onBlur={blurDateHandler}
					value={enteredDate}
				/>
				{dateIsTouched && (
					<p
						className={
							dateInputIsInvalid ? classes.errTxt : classes.successTxt
						}>
						{dateMessage}
					</p>
				)}
			</div>
			<button disabled={!isFormValid} className={classes.buttonadd}>
				Add Movie
			</button>
		</form>
	);
};

export default AddMovie;
