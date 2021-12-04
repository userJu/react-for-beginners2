import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState("");
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json);
    setVideo(json);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <img src={video.data.movie.large_cover_image} alt="" />
          <h1>
            {" "}
            {video.data.movie.title} (❤️ = {video.data.movie.like_count})
          </h1>
          <h3>rating : {video.data.movie.rating}</h3>
          <h3>genres</h3>
          <ul>
            {video.data.movie.genres.map((genre) => (
              <li>{genre}</li>
            ))}
          </ul>
          <p>{video.data.movie.description_full}</p>
        </div>
      )}
    </div>
  );
}
export default Detail;
