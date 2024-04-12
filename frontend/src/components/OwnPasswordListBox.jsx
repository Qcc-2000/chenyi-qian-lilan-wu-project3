
export default function OwnPasswordListBox({ owner, passwordListState, deletePassword, setEditingPassword }) {

    const selfPasswordList = passwordListState.filter(item => item.owner == owner);
    // rememenber to add date
    //<div className="text-sm text-gray-600">Date: {item.date}</div>

    return (
        <div className="mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
            <div className="text-lg font-semibold text-gray-800 mb-5">Here are all your passwords: </div>


            <ul className="list-none space-y-4">
                {selfPasswordList.map((item, index) => (
                    <li key={index} className="flex justify-between items-center bg-white p-1 rounded border-b-4 border-red-900">
                        <div>
                        <div>URL: {item.url}</div>
                        <div>Password: {item.password}</div>
                        <div className="text-sm text-gray-600">Date: </div>
                        </div>


                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setEditingPassword(item.url, item.password, item._id)}
                                className="bg-amber-600 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => deletePassword(item._id)}
                                className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}