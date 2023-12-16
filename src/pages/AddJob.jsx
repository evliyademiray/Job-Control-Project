import React, { useEffect } from "react";
import { statusOpt, typeOpt, sortOpt } from "../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createJob } from "../redux/slice/jobSlice";
import { setLoading, setError, setJobs } from "../redux/slice/jobSlice";

import { v4 } from "uuid";
import axios from "axios";

const AddJob = () => {
  const state = useSelector((store) => store.jobSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //API'den verileri alıp store'a aktarır.
  const fetchData = () => {
    //1-Yüklenme durumunu güncelleme
  };

  //bileşen ekrana basıldığında verileri çek
  useEffect(() => {
    dispatch(setLoading());

    axios
      .get("http://localhost:4500/jobs")
      //veri gelirse store'a aktar
      .then((res) => dispatch(setJobs(res.data)))
      //Hata olursa store'u güncelle
      .catch((err) => dispatch(setError()));
  }, []);

  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault();
    //inputtan verileri al
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    //işe id ve oluşturulma tarihi ekle
    data.id = v4();
    data.date = new Date().toLocaleDateString();

    //hem API'ye hem store'a işi ekle
    axios.post("http://localhost:4500/jobs", data).then(() => {
      navigate("/");
      dispatch(createJob(data));
      toast.success("Eklendi");
    });
  };
  return (
    <div className="add-page">
      <section className="add-sec">
        <h2>Yeni iş ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pozisyon</label>
            <input list="positions" name="position" type="text" required />

            <datalist id="positions">
              {state.jobs.map((job) => (
                <option value={job.position} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Şirket</label>
            <input list="companies" name="company" type="text" required />

            <datalist id="companies">
              {state.jobs.map((job) => (
                <option value={job.company} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Lokasyon</label>
            <input list="locations" name="location" type="text" required />
            <datalist id="locations">
              {state.jobs.map((job) => (
                <option value={job.location} />
              ))}
            </datalist>
          </div>

          <div>
            <label>Durum</label>
            <select name="status" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {statusOpt.map((i) => (
                <option>{i}</option>
              ))}
            </select>
          </div>

          <div>
            <label>Tür</label>
            <select name="type" required>
              <option value={""} hidden>
                Seçiniz
              </option>
              {typeOpt.map((text) => (
                <option>{text}</option>
              ))}
            </select>
          </div>

          <div>
            <button className="add-button" type="submit">
              <span className="button_top"> Oluştur</span>
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddJob;
