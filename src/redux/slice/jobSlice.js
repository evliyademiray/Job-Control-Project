import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mainJobs: [], //API'den gelen asla filtrelemediğimiz
  jobs: [], //Filtreleme sonucu elde ettiklerimizi aktardığımız
  isLoading: false,
  isError: false,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    //Yüklenme durumunu günceller
    setLoading: (state) => {
      state.isLoading = true;
    },

    //API'dan gelen verileri state'e aktarır
    setJobs: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.jobs = action.payload;
      state.mainJobs = action.payload;
    },

    //Hata durumunu günceller
    setError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },

    //Yeni iş ekler
    createJob: (state, action) => {
      state.jobs.push(action.payload);
    },

    //aratılan şirket ismine göre filtreleme yapma
    filterBySearch: (state, action) => {
      //Arama terimini küçük harfe dönüştür
      const query = action.payload.text.toLowerCase();
      // terimi içeren işleri fitrele
      const filtred = state.mainJobs.filter((job) =>
        job[action.payload.field].toLowerCase().includes(query)
      );

      //state'i günceller
      state.jobs = filtred;
    },

    //Sıralama
    sortJobs: (state, action) => {
      switch (action.payload) {
        case "a-z":
          state.jobs.sort((a, b) => b.company.localeCompare(a.company));
          break;

        case "z-a":
          state.jobs.sort((a, b) => a.company.localeCompare(b.company));
          break;

        case "En Yeni":
          state.jobs.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;

        case "En Eski":
          state.jobs.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    },

    //Sıfırlama
    clearFilters: (state) => {
      state.jobs = state.mainJobs;
    },
    //İş silme
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter((i) => i.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setJobs,
  setError,
  createJob,
  filterBySearch,
  deleteJob,
  sortJobs,
  clearFilters,
} = jobSlice.actions;

export default jobSlice.reducer;
