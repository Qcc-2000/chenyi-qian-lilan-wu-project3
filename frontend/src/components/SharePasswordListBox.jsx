
export default function SharePasswordListBox({ owner, passwordListState }) {

    const sharePasswordList = passwordListState.filter(item => item.owner != owner);
    const hasShare = sharePasswordList.length > 0 ? true : false;

    return (
        <div>
            {hasShare && (
                <div className="mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
                    <div className="text-lg font-semibold text-gray-800 mb-5">Here are the passwords from shares: </div>

                    <ul className="list-none space-y-4">
                        {sharePasswordList.map((item, index) => (
                            <li key={index} className="flex justify-between items-center bg-white p-1 rounded border-b-4 border-red-900">
                                <div>
                                    <div>URL: {item.url}</div>
                                    <div className="w-50">Password: {item.password}</div>
                                    <div className="w-50 text-sm text-gray-600">Date: {item.update_time}</div>
                                </div>
                                <div className="w-50">Shared by: {item.owner}</div>
                            </li>
                        ))}
                    </ul>
                </div>

            )}
        </div>
    );

}