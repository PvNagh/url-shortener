import { toast } from 'react-toastify';
import { MousePointerClick, ClipboardCopy, ExternalLink } from 'lucide-react';


const PostCard = ({ post }) => {
  const { createdAt, longUrl, shortUrl, text, visitCount } = post;

  // Convert createdAt to real time
  const formattedTime = new Date(createdAt).toLocaleString();

  // Copy the short URL to the clipboard
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short url copied!", {
      position: toast.POSITION.TOP_CENTER
    });
  };

  // Open the short URL in a new tab
  const handleVisitUrl = () => {
    window.open(shortUrl, '_blank');

  };

  return (
    <div className="bg-white rounded-lg  shadow-md border p-4 flex flex-col justify-evenly">
      <h3 className="text-blue-700 text-md font-semibold ">{shortUrl}</h3>
      <p className="text-black mb-2 font-small truncate text-xs">
        {longUrl}
      </p>
      <p className="text-gray-700 mb-2 font-light text-xs">{formattedTime}</p>

      <div className="flex mb-3 gap-x-2">
        <span className="bg-gray-200 rounded-md px-2 py-1 text-sm text-gray-700">
          {text}
        </span>
      </div>
      <div className="flex items-center justify-between text-center">
        <div className="flex items-center text-gray-500 text-center">
          <MousePointerClick className="mr-2" size={24} />
          <span>{visitCount} clicks</span>
        </div>
        <div className='flex items-center text-center'>
          <button
            className="border border-blue-500 text-blue-500 p-2 rounded-md mr-2 hover:bg-indigo-100"
            onClick={handleCopyUrl}
          >
            <ClipboardCopy size={18} />
          </button>

          <button
            className="border border-blue-500 text-blue-500 p-2 rounded-md  hover:bg-indigo-100"
            onClick={handleVisitUrl}
          >
            <ExternalLink size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
