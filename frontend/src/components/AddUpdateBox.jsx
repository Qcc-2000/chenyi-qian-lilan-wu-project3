
export default function AddUpdateBox ( { editingState, errorState, urlState, setUrlState, passwordState, setPasswordState, useAlphabet, useNumerals, useSymbols, setUseAlphabet, setUseNumerals, setUseSymbols, length, setLength, handleSubmit, handleCancel }) {
  const inputFieldTitleText = editingState.isEditing ? "Edit Password" : "Add new password";  
  return (
        <div className="mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
          <div className="text-lg font-semibold text-gray-800 mb-5">{inputFieldTitleText}</div>
          {errorState && (
            <h1 className="mb-4 text-red-600 text-l font-bold">
              {errorState}
            </h1>
          )}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Url:</label>
              <input
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={urlState}
                onInput={(event) => setUrlState(event.target.value)}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-semibold mb-2">Password:</label>
              <input
                type="password"
                className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={passwordState}
                onInput={(event) => setPasswordState(event.target.value)}
              />
            </div>
            <div className="flex gap-4">
            <div className="flex items-center">
              <input
                id="alphabet-checkbox"
                type="checkbox"
                checked={useAlphabet}
                onChange={(e) => setUseAlphabet(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="alphabet-checkbox" className="ml-2 block text-sm text-gray-700">
                Alphabet
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="numerals-checkbox"
                type="checkbox"
                checked={useNumerals}
                onChange={(e) => setUseNumerals(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="numerals-checkbox" className="ml-2 block text-sm text-gray-700">
                Numerals
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="symbols-checkbox"
                type="checkbox"
                checked={useSymbols}
                onChange={(e) => setUseSymbols(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="symbols-checkbox" className="ml-2 block text-sm text-gray-700">
                Symbols
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Length:
              <input
                type="number"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value, 10))}
                className="mt-1 block px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </label>
          </div>
            <div>
              <button
                className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => handleSubmit()}
              >
                Submit
              </button>
              {editingState.isEditing && (<button
                className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mx-6"
                onClick={() => handleCancel()}
              >
                Cancel
              </button>)}
            </div>
          </div>
        </div>
    );
}