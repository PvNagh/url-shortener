import { useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { backendUrl } from "../utils/config";
import Posts from "../components/Posts";
import { ToastContainer, toast } from "react-toastify";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {

    const [email, setEmail] = useState("");
    const [longUrl, setLongUrl] = useState('');
    const [tag, setTag] = useState('');
    const [loading, setLoading] = useState(false);
    const [shortUrl, setShortUrl] = useState('');   
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
            });

            const { shortUrlId } = response.data;

            setId(shortUrlId);
            setShortUrl(`${backendUrl}/${shortUrlId}`);
            setIsEditable(false);
            setLoading(false);

            console.log(response.data); // Handle the response as needed
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

    const handleVisitUrl = async () => {
        const response = await axiosInstance.post(`/post/update-visit/${shortId}`);
        console.log(response)
        window.open(shortUrl);
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
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
                <div className="bg-white rounded-lg shadow-lg border px-4 py-8 sm:px-8 w-[95vw] sm:w-[85vw] lg:w-[65vw]">
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
                                            className="rounded-lg border p-2 w-full focus:border-blue-500 focus:outline-none"
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
                                                className="rounded-lg border p-2 w-full focus:border-blue-500 focus:outline-none" 
                                                value={shortUrl}
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
                                            className={`rounded-lg border focus:border-blue-500 focus:outline-none p-[10px] w-full ${error ? 'border-red-500' : ''}`}
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
                                            className="rounded-lg border p-[10px] w-full focus:border-blue-500 focus:outline-none"
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
            <Posts shortUrl={shortUrl} email={email} shortId={shortId}/>
            <ToastContainer autoClose={1000}/>
        </>);
};

export default Dashboard;
