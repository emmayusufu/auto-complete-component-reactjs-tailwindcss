import * as React from 'react';

function App() {
  const [options, setOptions] = React.useState([
    'emma',
    'joe',
    'peter',
    'simon',
    'judas',
  ]);
  const [filteredOptions, setFilteredOptions] = React.useState([]);
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);

    if (event.target.value.length > 0) {
      setIsOpen(true);
      const filtered = options
        .filter((state) => state.includes(event.target.value))
        .sort((a, b) => a.localeCompare(b));
      setFilteredOptions(filtered);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <div className="w-full m-0 relative z-50">
        <div className="h-11 border w-full flex flex-row items-center p-2 rounded shadow-sm">
          <input
            className="h-full w-full outline-none text-sm"
            placeholder="Type something"
            value={value}
            type="text"
            onChange={handleChange}
          />
          <div className="px-2 text-gray-500">
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
        <div
          className={`absolute w-full shadow-md rounded p-2 mt-1 bg-white transition ease-in-out delay-150 ${
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 pointer-events-none -translate-y-2.5'
          }`}
        >
          {filteredOptions.length === 0 ? (
            <span className="text-sm text-gray-400">No matching results</span>
          ) : (
            [...filteredOptions].map((item, index) => {
              return (
                <div
                  key={index}
                  className={`w-full cursor-pointer hover:bg-gray-100 text-sm p-2 rounded`}
                  onClick={() => {
                    setIsOpen(false);
                    setValue(item);
                  }}
                >
                  {item}
                </div>
              );
            })
          )}
        </div>
      </div>
      {/* ============================= backdrop */}
      <div
        className={`bg-black z-10 absolute h-full w-full top-0 left-0 bg-opacity-0 ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}

const ChevronUp = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  </svg>
);
const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export default App;
