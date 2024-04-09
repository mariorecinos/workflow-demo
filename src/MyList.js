import * as React from 'react';
import { useState } from 'react';
import './style.css';
import ListItem from './ListItem';

export default function MyList(props) {
	const [toDoItemArray, addNewItemToArray] = useState([...props.theList]);
	const [newItem, setNewItem] = useState('');

	const todoItems = toDoItemArray.map((item, index) => (
		<ListItem doThis={item} key={index} />
	));
	return (
		<div>
			<h1>Things I should stop procrastinating:</h1>
			<ul>{todoItems}</ul>
			{newItem}
			<form>
				<input
					type="text"
					placeholder="Type an item here"
					onChange={(e) => setNewItem(e.target.value)}
					value={newItem}
				/>
				<button
					onClick={(e) => {
						e.preventDefault();
						addNewItemToArray([...toDoItemArray, newItem]);
						setNewItem('');
					}}
				>
					Add it!
				</button>
			</form>
			<button
				onClick={() => {
					console.log('Clearing list!');
					addNewItemToArray([]);
				}}
			>
				Finished the list!
			</button>
		</div>
	);
}

