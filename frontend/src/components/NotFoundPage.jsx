import { Link } from "react-router-dom";

export default function NotFoundPage () {
    return (
        <div className="flex flex-col gap-2">
            Not Found 404
            <Link to="/">
            Home
            </Link>
        </div>
    );
}