import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../services/api';
import {
  Apartment,
  ApartmentState,
  ApiApartment,
} from '../../interfaces/apartment.types';

const initialState: ApartmentState = {
  apartments: [],
  loading: false,
  error: null,
};

const multipartHeaders = {
  'Content-Type': 'multipart/form-data',
};

/// 📌 Fetching all apartments with filters
export const fetchApartments = createAsyncThunk<
  Apartment[],
  { priceMin?: string; priceMax?: string; rooms?: string }
>('apartments/fetchAllApartments', async (filters = {}) => {
  const queryParams = new URLSearchParams(filters).toString();
  const response = await api.get(`/apartments?${queryParams}`);
  return response.data.map((apt: ApiApartment) => ({
    ...apt,
    id: apt._id,
  }));
});

// 📌 Adding a new apartment
export const addApartment = createAsyncThunk(
  'apartments/addNewApartment',
  async (apartment: FormData) => {
    const response = await api.post('/apartments', apartment, {
      headers: multipartHeaders,
    });
    return response.data;
  },
);

// 📌 Updating an apartment
export const updateApartment = createAsyncThunk(
  'apartments/update',
  async ({ id, formData }: { id: string; formData: FormData }) => {
    const response = await api.put(`/apartments/${id}`, formData, {
      headers: multipartHeaders,
    });
    return { ...response.data, id: response.data.id };
  },
);

// 📌 Deleting an apartment
export const deleteApartment = createAsyncThunk(
  'apartments',
  async (id: string) => {
    await api.delete(`/apartments/${id}`);
    return id;
  },
);

const apartmentSlice = createSlice({
  name: 'apartments',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchApartments.pending, state => {
        state.loading = true;
      })
      .addCase(fetchApartments.fulfilled, (state, action) => {
        state.loading = false;
        state.apartments = action.payload;
      })

      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || action.error?.stack || 'Unknown error';
      })

      // ✅ Adding an apartment
      .addCase(addApartment.fulfilled, (state, action) => {
        state.apartments.push(action.payload);
      })

      // ✅ Updating an apartment
      .addCase(updateApartment.fulfilled, (state, action) => {
        const updatedApartment = action.payload;
        const index = state.apartments.findIndex(
          apartment => apartment.id === updatedApartment.id,
        );
        if (index !== -1) {
          state.apartments[index] = updatedApartment;
        }
      })

      // ✅ Deleting an apartment
      .addCase(deleteApartment.fulfilled, (state, action) => {
        state.apartments = state.apartments.filter(
          apt => apt.id !== action.payload,
        );
      });
  },
});

const apartmentReducer = apartmentSlice.reducer;
export { apartmentReducer };
