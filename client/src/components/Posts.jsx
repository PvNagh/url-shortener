import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import PostCard from "./PostCard";
import { Link } from "lucide-react";

const Posts = ({shortId }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allPosts, setAllPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const [buttonClicked, setButtonClicked] = useState(false);

    useEffect(() => {
        const fetchAllPosts = async () => {
            try {
                const response = await axiosInstance.get(`/post/all`);
                const { data } = response;
                setAllPosts(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllPosts();
    }, [shortId]);

    useEffect(() => {
        const fetchFilteredPosts = async () => {
            try {
                const response = await axiosInstance.get(`/post/search?search=${searchTerm}`);
                const { data } = response;
                setFilteredPosts(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (buttonClicked) {
            if (searchTerm.trim() !== '') {
                fetchFilteredPosts();
            } else {
                setFilteredPosts(allPosts); 
            }
            setButtonClicked(false);
        }
        else {
            setFilteredPosts(allPosts);
        }
    }, [searchTerm, allPosts, buttonClicked]);

    const handleSearch = () => {
        setButtonClicked(true);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setButtonClicked(true);
        }
    };

    return (
        <div className="w-[95vw] sm:w-[85vw] lg:w-[65vw] mx-auto pb-9">
            <div className="flex justify-between w-full flex-col sm:flex-row gap-y-2">
            <div className="flex items-center text-blue-500 gap-x-2">
            <Link size={28}/><span className="text-2xl font-semibold mb-1 sm:mb-0">My URLs</span>
            </div>
             
                <div className="flex items-center justify-between gap-y-2 flex-wrap">
                    <input
                        type="text"
                        className="text-gray-600 flex-grow rounded-lg border  border-gray-300 p-2 sm:w-64 focus:outline-none focus:border-blue-500"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
                
            </div>
            <hr className="border-gray-300 my-4" />
            <div className="grid md:grid-cols-2  gap-4 grid-cols-1">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))
                ) : (
                    <p>No posts found</p>
                )}
            </div>
        </div>
    );
};

export default Posts;
