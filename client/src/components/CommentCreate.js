import axios from 'axios';
import { useState } from 'react';

const PORT_COMMENTS_SERVICE = 4001

const CommentCreate = ({postId}) => {

    const [formState, setFormState] = useState({
        content: '',
    });

    const handleChange = event => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const ENDPOINT = `${process.env.REACT_APP_URL_COMMENTS_SERVICE}/posts/${postId}/comments`;
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log(formState);
        const response=await axios.post(ENDPOINT,formState);
        setFormState({id:postId,content:''})
        await console.log(response.data);
        // submit the form to create the post
    };

    return (
        <form
            className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
        >
            
            {/* Content-input-section */}
             <div className="mb-4">
                <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="content"
                >
                  <h1 className='text-sm'> New Comment</h1>
                </label>
                <textarea
className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="content"
                    name="content"
                    value={formState.content}
                    onChange={handleChange}
                />
            </div> 

            <div className="flex items-center justify-between">
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};


export default CommentCreate;