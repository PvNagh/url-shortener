import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendUrl } from "../utils/config";
import Spinner from "../components/Spinner";
import ErrorPage from "./ErrorPage";


const Redirect = () => {
  const { shortId } = useParams();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const response = await fetch(`${backendUrl}/${shortId}`);
        console.log(response);

        if (response.status === 404) {
          setError(true);
          setLoading(false);
          return;
        }

        const data = await response.json();
        console.log(data)
        console.log("dasn")


        window.location.href = data;
        setLoading(false)
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchUrl();
  }, []);


  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {error && (
        <ErrorPage />
      )}
    </div>
  );
};

export default Redirect;
