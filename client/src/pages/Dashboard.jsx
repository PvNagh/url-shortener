import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import {  clientUrl } from "../utils/config";
import Posts from "../components/Posts";
import { ToastContainer, toast } from "react-toastify";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const [longUrl, setLongUrl] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [shortLink, setShortUrl] = useState('');
    const [isEditable, setIsEditable] = useState(true);
    const [error, setError] = useState("");
    const [shortId, setId] = useState("");

    const handleGenerateShortUrl = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axiosInstance.post('/post/create-post', {
                longUrl: longUrl,
                text: tag,
                clientUrl : clientUrl
            });

            const { shortUrlId,shortUrl } = response.data;

            setId(shortUrlId);
            setShortUrl(shortUrl);
            setIsEditable(false);
            setLoading(false);
        } catch (error) {
            if (error.status === 400) {
                setError("Invalid URL");
            }
            else {
                console.log(error);
            }
            setLoading(false);
        }
    };

    const handleVisitUrl = () => {
        window.location.href=shortLink;
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortLink);
        toast.success("Short url copied!", {
            position: toast.POSITION.TOP_CENTER
        });
    };

    const handleGoBack = () => {
        setId('');
        setLongUrl('');
        setTag('');
        setShortUrl('');
        setIsEditable(true);
    };

    return (
        <>
            <Navbar />
            <div className="flex justify-center items-center mt-6 mb-12 " >
                <div className="bg-white rounded-lg shadow-md border px-3 py-8 sm:px-8 w-[95vw] sm:w-[85vw] lg:w-[65vw]">
                    {loading ? (
                        <div className="text-center mb-4">GENERATING SHORT URL...</div>
                    ) : (
                        <>
                            {!isEditable ? (
                                <>
                                    <div className="mb-4">
                                        <label htmlFor="longUrl" className="block mb-1 font-medium">
                                            Long URL
                                        </label>
                                        <input
                                            id="longUrl"
                                            type="text"
                                            className="text-gray-600 rounded-lg border p-2 w-full focus:border-blue-500 focus:outline-none"
                                            value={longUrl}
                                            readOnly={!isEditable}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="shortUrl" className="block mb-1 font-medium">
                                            Short URL
                                        </label>
                                        <div className="flex items-center">
                                            <input
                                                id="shortUrl"
                                                type="text"
                                                className="text-gray-600 rounded-lg border p-2 w-full focus:border-blue-500 focus:outline-none"
                                                value={shortLink}
                                                readOnly
                                            />
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700"
                                                type="button"
                                                onClick={handleCopyToClipboard}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                        <button
                                            className="border border-blue-500 bg-blue-500 text-white py-2 px-4 hover:bg-blue-700 rounded-md w-full mt-4"
                                            type="button"
                                            onClick={handleVisitUrl}
                                        >
                                            Visit URL
                                        </button>
                                        <button
                                            className="border border-blue-500 text-blue-500 py-2 px-4 rounded-md  hover:bg-indigo-50 w-full mt-4"
                                            type="button"
                                            onClick={handleGoBack}
                                        >
                                            Generate New URL
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <form onSubmit={handleGenerateShortUrl}>
                                    <div className="mb-4">
                                        <label htmlFor="urlInput" className="block mb-1 font-medium ">
                                            Enter a URL
                                        </label>
                                        <input
                                            id="urlInput"
                                            type="text"
                                            className={`text-gray-600 rounded-lg border focus:border-blue-500 focus:outline-none p-[10px] w-full ${error ? 'border-red-500' : ''}`}
                                            placeholder="https://www.example.com"
                                            value={longUrl}
                                            onChange={(e) => {
                                                setLongUrl(e.target.value);
                                                setError("");
                                            }}
                                            onFocus={() => setError("")}
                                            required
                                        />
                                        {error && <p className="text-red-500">! {error}</p>}
                                    </div>
                                    <div className="mb-5">
                                        <label htmlFor="tagInput" className="block mb-1 font-medium">
                                            Add a tag
                                        </label>
                                        <input
                                            id="tagInput"
                                            type="text"
                                            className="text-gray-600 rounded-lg border p-[10px] w-full focus:border-blue-500 focus:outline-none"
                                            placeholder="educational"
                                            value={tag}
                                            onChange={(e) => setTag(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button
                                        className="border bg-blue-500 font-semibold text-md text-white px-4 py-[10px] rounded-md w-full hover:bg-blue-700 shadow-md"
                                        type="submit"
                                    >
                                        Generate Short URL
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>

            </div>
            <Posts shortId={shortId} />
            <ToastContainer autoClose={1000} />
        </>);
};

export default Dashboard;
