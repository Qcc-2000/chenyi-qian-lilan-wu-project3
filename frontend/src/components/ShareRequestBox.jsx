import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function ShareRequestBox({ sender }) {
  const [errorMsg, setErrorMsg] = useState("");
  const [receiver, setReceiver] = useState("");

  async function handleShareRequest() {
    console.log(receiver);
    setErrorMsg("");
    if (!receiver) {
      setErrorMsg("Please enter the username of the receiver.");
      return;
    }

    try {
      console.log(sender);
      const response = await axios.post("/api/messages", {
        sender: sender,
        receiver: receiver,
      });
      console.log(response);
      setReceiver("");
      toast.success("message sent successfully!");
    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data || "Add receiver failed");
      } else if (error.request) {
        setErrorMsg("No response from the server");
      } else {
        setErrorMsg("Error: " + error.message);
      }
    }
  }

  return (
    <div className="mx-auto my-10 p-6 bg-white shadow-md rounded-lg">
      <div className="text-lg font-semibold text-gray-800 mb-5">
        Send a share request to share each other's passwords with another user
      </div>
      {errorMsg && (
        <h1 className="mb-4 text-red-600 text-l font-bold">{errorMsg}</h1>
      )}
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">
            Receiver:
          </label>
          <input
            className="appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={receiver}
            onInput={(event) => setReceiver(event.target.value)}
          />
        </div>

        <div>
          <button
            className="bg-red-900 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => handleShareRequest()}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
