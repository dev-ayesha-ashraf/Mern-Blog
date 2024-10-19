import { useSelector } from "react-redux";

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);

    // Placeholder function for handling input changes
    const handleChange = (e) => {
        console.log(e.target.value);
    };

    return (
        <div className="max-w-lg mx-auto text-center rounded-lg max-[650px]:ml-[10vw] max-[450px]:ml-[17vw] pt-[15vh]">
            <h1 className="my-6 text-center font-semibold text-2xl md:text-3xl text-gray-800">Profile</h1>
            <form className="flex flex-col space-y-6">
                <div className="w-24 h-24 md:w-32 md:h-32 self-center cursor-pointer">
                    <img
                        src={currentUser.profilePicture}
                        alt="Profile"
                        className="rounded-full w-full h-full border-4 md:border-8 object-cover border-gray-800 shadow-2xl"
                    />
                </div>
                <TextInput
                    type="text"
                    id="username"
                    placeholder="Username"
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                    className="text-center text-gray-700"
                />
                <TextInput
                    type="email"
                    id="email"
                    placeholder="Email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className="text-center text-gray-700"
                />
                <TextInput
                    type="password"
                    id="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="text-center text-gray-700"
                />
                <button className="bg-yellow-500 py-2 rounded-lg hover:bg-yellow-600 transition duration-300">
                    Update
                </button>
                <div className="flex justify-between items-center mt-4 text-sm md:text-base text-gray-600">
                    <span className="cursor-pointer hover:text-red-500 transition duration-300">
                        Delete Account
                    </span>
                    <span className="cursor-pointer hover:text-blue-500 transition duration-300">
                        Sign Out
                    </span>
                </div>
            </form>
        </div>
    );
}

// Placeholder TextInput Component
const TextInput = ({ type, id, placeholder, defaultValue, onChange, className }) => (
    <input
        type={type}
        id={id}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onChange={onChange}
        className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
    />
);
