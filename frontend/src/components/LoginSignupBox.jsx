export default function LoginSignupBox ({ title, username, setUsername, password, setPassword, errorMsg, handleSubmit }) {
    return (
        <div className="container">
                <div className="text-xl font-semibold text-gray-800 mb-5">{title}</div>
                <form onSubmit={handleSubmit} className="form">
                    {errorMsg && <div className="error">{errorMsg}</div>}
                    <div className="inputGroup">
                        <label className="label">Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div className="inputGroup">
                        <label className="label">Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input"
                        />
                    </div>
                    <button type="submit" className="button">{title}</button>
                </form>
            </div>
    );
}