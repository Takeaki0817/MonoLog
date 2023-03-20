import { useState, useRef } from 'react';

interface Props {
	onSearch?: (searchTerm: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
	const [searchTerm, setSearchTerm] = useState('');
	const inputRef = useRef<HTMLInputElement | null>(null);

	const handleFocus = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (onSearch) {
			onSearch(searchTerm);
		}
	};

	return (
		<form onFocus={handleFocus} onSubmit={handleSubmit}>
			<input
				type='text'
				id='search'
				value={searchTerm}
				onChange={handleChange}
				ref={inputRef}
			/>
			<button type='submit'>Search</button>
		</form>
	);
};

export default SearchBar;
