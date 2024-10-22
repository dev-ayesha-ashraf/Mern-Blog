import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, uploadBytes, uploadBytesResumable, ref } from 'firebase/storage';
import { app } from "../../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateFailure, updateStart, updateSuccess,deleteUserStart, deleteUserFailure , deleteUserSuccess , signoutSuccess} from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Alert, Modal, ModalBody , Button} from 'flowbite-react'
export default function DashProfile() {
    const { currentUser , error } = useSelector((state) => state.user);
    const [imageFile, setImagefile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadingError, setImageFileUploadingError] = useState(null);
    const [imageFileUploading, setImageFileUploading] = useState(false);
    const [upadeUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({});
    const filePickerRef = useRef();
    const dispatch = useDispatch();
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImagefile(file);
            setImageFileUrl(URL.createObjectURL(file))
        }
    }
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile])
    const uploadImage = async () => {
        // service firebase.storage {
        //     match /b/{bucket}/o {
        //       match /{allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //         request.resource.contentType.matches('image/.*')
        //       }
        //     }
        //   }
        setImageFileUploading(true)
        setImageFileUploadingError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadingError('Could Not Upload Image (file must be less than 2MB)');
                setImageFileUploadingProgress(null);
                setImagefile(null);
                setImageFileUrl(null);
                setImageFileUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                    setFormData({
                        ...formData, profilePicture: downloadURL,
                    })
                    setImageFileUploading(false)

                })
            }
        )
    }

    // Placeholder function for handling input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSuccess(null);
        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made');
            return;
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to upload');
            return;
        }
        try {
            dispatch(updateStart());
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailure(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSuccess(data));
                setUpdateUserSuccess("User's profile updated successfully");
            }
        } catch (error) {
            dispatch(updateFailure(error.message));
            setUpdateUserError(error.message);
        }
    };
    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            if (!res.ok) {
                const data = await res.json();
                dispatch(deleteUserFailure(data.message));
            } else {
                const data = await res.json();
                dispatch(deleteUserSuccess(data));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
            dispatch(deleteUserFailure(error.message));
        }
    };
    
    const handleSignout = async () => {
        try {
          const res = await fetch('/api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if (!res.ok) {
            console.log(data.message);
          } else {
            dispatch(signoutSuccess());
          }
        } catch (error) {
          console.log(error.message);
        }
      };
    return (
        <div className="max-w-lg mx-auto text-center rounded-lg max-[650px]:ml-[10vw] max-[450px]:ml-[17vw] pt-[15vh]">
            <h1 className="my-6 text-center font-semibold text-2xl md:text-3xl text-gray-800">Profile</h1>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <input type="file" accept="image/*" onChange={handleImageChange} ref={filePickerRef} className="hidden" />

                <div className="relative w-24 h-24 md:w-32 md:h-32 self-center cursor-pointer" onClick={() => filePickerRef.current.click()}>
                    {imageFileUploadingProgress && (
                        <CircularProgressbar value={imageFileUploadingProgress || 0} text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(62,152, 199, ${imageFileUploadingProgress / 100})`,
                                },
                            }} />
                    )}
                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="Profile"
                        className={`rounded-full w-full h-full border-4 md:border-8 object-cover border-gray-800 shadow-2xl ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
                    />
                </div>
                {upadeUserSuccess && (
                    <Alert color="success" className="mt-5">
                        {upadeUserSuccess}
                    </Alert>
                )}
                {updateUserError && (
                    <Alert color='failure' className='mt-5'>
                        {updateUserError}
                    </Alert>
                )}
                {imageFileUploadingError && (
                    <div className="flex items-center bg-orange-500 text-white text-sm font-bold px-4 py-3 rounded shadow-md my-4" role="alert">
                        <svg className="fill-current w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M8.257 3.099c.765-1.36 2.681-1.36 3.446 0l7.451 13.251c.717 1.277-.181 2.799-1.723 2.799H2.529c-1.543 0-2.44-1.522-1.723-2.799l7.451-13.251zM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-.993.883L9 6v4a1 1 0 0 0 1.993.117L11 10V6a1 1 0 0 0-1-1z" />
                        </svg>
                        <p>{imageFileUploadingError}</p>
                    </div>
                )}
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
                    <span className="cursor-pointer hover:text-red-500 transition duration-300" onClick={() => setShowModal(true)}>
                        Delete Account
                    </span>
                    <span className="cursor-pointer hover:text-blue-500 transition duration-300" onClick={handleSignout}>
                        Sign Out
                    </span>
                </div>
            </form>


            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes, I'm sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
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
