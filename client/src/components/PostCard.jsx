import { toast } from 'react-toastify';
import { MousePointerClick, ClipboardCopy, ExternalLink } from 'lucide-react';

const PostCard = ({ post }) => {
  const { createdAt, longUrl, shortUrl, text, visitCount } = post;
 
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Short url copied!", {
      position: toast.POSITION.TOP_CENTER
    });
  };


  const handleVisitUrl = () => { 
    window.location.href=shortUrl;
  };

  return (
    <div className="bg-white rounded-lg  shadow-md border p-4 flex flex-col justify-evenly">
      <h3 className="text-blue-600 text-[17px] font-semibold mb-[2px]">{shortUrl}</h3>
      <p className="text-gray-600 mb-2 font-normal truncate text-[13px]">
        {longUrl}
      </p>
      <div className="flex mb-3 gap-x-2">
        <span className="bg-gray-100 rounded-md px-2 py-1 text-sm text-gray-700 overflow-auto">
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
            <ClipboardCopy size={19} />
          </button>
          <button
            className="border border-blue-500 text-blue-500 p-2 rounded-md  hover:bg-indigo-100"
           onClick={handleVisitUrl}
          >
            <ExternalLink size={19} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
