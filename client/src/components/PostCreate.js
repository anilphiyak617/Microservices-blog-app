import axios from 'axios';
import { useState } from 'react';

const PostCreate = () => {

    const [formState, setFormState] = useState({
        title: '',
        // content: '',   !!!!!!!  this is the error to be fixed after modification of post service
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const ENDPOINT = 'http://localhost:4000/posts';
    const handleSubmit = async event => {
        event.preventDefault();
        const response=await axios.post(ENDPOINT,formState);
        // await console.log(response);
        // submit the form to create the post
    };

    return (
        <form
            className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                >
                    Title:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    name="title"
                    value={formState.title}
                    onChange={handleChange}
                />
            </div>
            {/* Content-input-section */}
            {/* <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                >
                    Content:
                </label>
                <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="content"
                    name="content"
                    value={formState.content}
                    onChange={handleChange}
                />
            </div> */}

            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Create Post
                </button>
            </div>
        </form>
    );
};


export default PostCreate;