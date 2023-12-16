import React, { useEffect, useState } from "react";
import { statusOpt, typeOpt, sortOpt } from "../constants";
import { useDispatch } from "react-redux";
import {
  clearFilters,
  filterBySearch,
  sortJobs,
} from "../redux/slice/jobSlice";

const Filter = ({ jobs }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  //Bu şekilde kullandığımız zaman her tuş vuruşunda filtreleme yapar
  //Bu gereksiz filtreleme performans sorunu yaratır
  //Çözüm: Kullanıcı yazma işlemini kestiğinde aksiyon bir kere tetiklenmeli

  //!DEBOUNCE
  useEffect(() => {
    //bir sayaç başlat, sayaç durunca işlemi yap
    const timer = setTimeout(
      () => dispatch(filterBySearch({ field: "company", text })),
      1111
    );
    //eğer süre bitmeden tekrar useEffect çalışırsa önceki sayacı sıfırla
    return () => clearTimeout(timer);
  }, [text]);
  return (
    <section className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <div>
          <label>Şirket ismine göre ara</label>
          <input
            onChange={(e) => setText(e.target.value)}
            list="positions"
            name="position"
            type="text"
            required
          />

          <datalist id="positions">
            {jobs.map((job) => (
              <option value={job.company} />
            ))}
          </datalist>
        </div>

        <div>
          <label>Durum</label>
          <select
            onChange={(e) =>
              dispatch(
                filterBySearch({ field: "status", text: e.target.value })
              )
            }
            name="status"
          >
            <option hidden>Seçiniz</option>
            {statusOpt.map((i) => (
              <option>{i}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tür</label>
          <select
            onChange={(e) =>
              dispatch(filterBySearch({ field: "type", text: e.target.value }))
            }
            name="type"
          >
            <option hidden>Seçiniz</option>
            {typeOpt.map((text) => (
              <option>{text}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Sırala</label>
          <select
            onChange={(e) => dispatch(sortJobs(e.target.value))}
            name="type"
          >
            <option hidden>Seçiniz</option>
            {sortOpt.map((text) => (
              <option>{text}</option>
            ))}
          </select>
        </div>

        <div>
          <button
            className="add-button"
            onClick={() => dispatch(clearFilters())}
            type="reset"
          >
            <span className="button_top"> Filtreleri Sıfırla</span>
          </button>
        </div>
      </form>
    </section>
  );
};

export default Filter;
