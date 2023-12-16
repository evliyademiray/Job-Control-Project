import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError, setJobs } from "../redux/slice/jobSlice";
import Loader from "../components/Loader";
import Card from "../components/Card";
import Filter from "../components/Filter";


const JobList = () => {
  const dispatch = useDispatch();

  const state = useSelector((store) => store.jobSlice);

  //API'den verileri alıp store'a aktarır.
  const fetchData = () => {
  
    //1-Yüklenme durumunu güncelleme

    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      //veri gelirse store'a aktar
      .then((res) => dispatch(setJobs(res.data)))
      //Hata olursa store'u güncelle
      .catch((err) => dispatch(setError()));
  };

  //bileşen ekrana basıldığında verileri çek
  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="list-page">
      <Filter jobs={state.jobs}/>
      {/* 
      1) Yüklenme devam ediyorsa loader bas
      2) Yüklenme bittiyse ve hata varsa hata mesajı bas
      3) Yüklenme bittiyse ve hata yoksa verileri bas
      
      */}
      {state.isLoading ? (
        <Loader />
      ) : state.isError ? (
        <p className="error">
          Hata oluştu{" "}
          <button onClick={fetchData} type="button" class="button">
            <span class="button__text">Tekrar</span>
            <span class="button__icon">
              <img className="svg" src="refresh.svg" />
            </span>
          </button>{" "}
        </p>
      ) : (
        <div className="job-list">
          {state.jobs?.map((job) => (
            <Card key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
