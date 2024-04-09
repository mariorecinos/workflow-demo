import { render, fireEvent } from '@testing-library/react';
import MyList from '../../MyList';
const toDos = ['Buy ice cream', 'Eat ice cream', 'Go to the gym'];

test('Header contains the text "Things I should stop procrastinating:"', () => {
	const myList = render(<MyList theList={toDos} />);
	const heading = myList.getByRole('heading');
	expect(heading).toHaveTextContent('Things I should stop procrastinating:');
});

test('Entering text into text input and clicking "Add it!" button adds the item to the list', () => {
	const myList = render(<MyList theList={toDos} />);
	const input = myList.getByPlaceholderText('Type an item here');
	const button = myList.getByText("Add it!");

	fireEvent.change(input, { target: { value: "Eat more ice cream" } });
	fireEvent.click(button);

	const list = myList.getByRole("list");
	expect(list.lastElementChild).toHaveTextContent("Eat more ice cream");
});

test('Clicking on "Finished the list!" will delete all elements in the list', () => {
	const myList = render(<MyList theList={toDos} />);
	const button = myList.getByText("Finished the list!");

	fireEvent.click(button);

	const list = myList.queryAllByRole("listitem");
	expect(list.length).toBe(0);
})
