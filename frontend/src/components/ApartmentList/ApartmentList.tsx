import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  addApartment,
  AppDispatch,
  deleteApartment,
  fetchApartments,
  RootState,
  updateApartment,
} from '../../store';

import { PhotoModal } from '../PhotoModal';

import css from './ApartmentList.module.css';
import clear_icon from '../../images/SVG/clear_icon.svg';
import { Filters } from '../Filters';
import { Apartment } from '../../interfaces/apartment.types';
import { BASE_URL } from '../../services/api';
import ApartmentModal from '../ApartmentModal/ApartmentModal';

interface GenresProps {
  onClose?: () => void;
}

const ApartmentList: FC<GenresProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { apartments, loading, error } = useSelector(
    (state: RootState) => state.apartment,
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<
    Apartment | undefined
  >(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<{
    photo: string;
    apartmentId: string;
  } | null>(null);
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [filters, setFilters] = useState<{
    priceMin?: string;
    priceMax?: string;
    rooms?: string;
  }>({});

  useEffect(() => {
    dispatch(fetchApartments({}));
  }, [dispatch]);

  if (loading) return <p className={css.loadingMessage}>Loading...</p>;
  if (error) return <p className={css.errorMessage}>Error: {error}</p>;

  const handleAdd = () => {
    setEditingApartment(undefined);
    setIsModalOpen(true);
  };

  const handleEdit = (apartment: Apartment) => {
    setEditingApartment(apartment);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this apartment?',
    );
    if (isConfirmed) {
      try {
        await dispatch(deleteApartment(id));
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting apartment:', error);
        alert('There was an error deleting the apartment. Please try again.');
      }
    }
  };

  const applyFilters = (newFilters: {
    priceMin?: string;
    priceMax?: string;
    rooms?: string;
  }) => {
    setFilters(newFilters);
    dispatch(fetchApartments(newFilters));
  };

  const resetFilters = () => {
    setFilters({});
    dispatch(fetchApartments({}));
  };

  const handleSave = async (apartment: any) => {
    if (apartment.id) {
      await dispatch(updateApartment(apartment));
    } else {
      await dispatch(addApartment(apartment));
    }
    setIsModalOpen(false);
  };

  const handlePhotoClick = (
    photo: string,
    apartmentId: string,
    index: number,
  ) => {
    setSelectedPhoto({ photo, apartmentId });
    setPhotoIndex(index);
    setIsPhotoModalOpen(true);
  };

  const handleClosePhotoModal = () => {
    setIsPhotoModalOpen(false);
  };

  const handleNextPhoto = () => {
    if (selectedPhoto?.apartmentId) {
      const apartment = apartments.find(
        a => a.id === selectedPhoto.apartmentId,
      );
      if (apartment && apartment.photos && photoIndex !== null) {
        const nextIndex = photoIndex + 1;
        if (nextIndex < apartment.photos.length) {
          setSelectedPhoto({
            photo: apartment.photos[nextIndex],
            apartmentId: selectedPhoto.apartmentId,
          });
          setPhotoIndex(nextIndex);
        }
      }
    }
  };

  const handlePrevPhoto = () => {
    if (selectedPhoto?.apartmentId) {
      const apartment = apartments.find(
        a => a.id === selectedPhoto.apartmentId,
      );
      if (apartment && apartment.photos && photoIndex !== null) {
        const prevIndex = photoIndex - 1;
        if (prevIndex >= 0) {
          setSelectedPhoto({
            photo: apartment.photos[prevIndex],
            apartmentId: selectedPhoto.apartmentId,
          });
          setPhotoIndex(prevIndex);
        }
      }
    }
  };

  const shouldShowFilters =
    apartments.length > 0 ||
    Object.values(filters).some(value => value !== undefined && value !== '');

  // ___________________________________________________________________________________________
  return (
    <>
      <div className={css.apartmentListContainer}>
        <button className={css.addApartmentButton} onClick={handleAdd}>
          Додати квартиру
        </button>

        {shouldShowFilters && (
          <Filters
            filters={filters}
            onFilterChange={applyFilters}
            onResetFilters={resetFilters}
          />
        )}

        <button className={css.closeButton} onClick={onClose}>
          <img src={clear_icon} alt="clear_icon" />
        </button>

        <ul>
          {apartments.map(apartment => (
            <li key={apartment.id} className={css.apartmentListItem}>
              <h3 className={css.apartmentTitle}>{apartment.title}</h3>

              <div
                className={css.buttonContainer}
                style={{ display: isPhotoModalOpen ? 'none' : 'block' }}>
                <button
                  className={css.editButton}
                  onClick={() => handleEdit(apartment)}>
                  Редагувати
                </button>
                <button
                  className={css.deleteButton}
                  onClick={() => handleDelete(apartment.id)}>
                  Видалити
                </button>
              </div>

              {/* #region apartmentPhotos */}
              {apartment.photos && apartment.photos.length > 0 && (
                <div className={css.apartmentPhotos}>
                  {apartment.photos
                    .slice(0, 10)
                    .map((photo: string, index: number) => (
                      <img
                        key={photo}
                        src={`${BASE_URL}${photo}`}
                        alt={`photo: ${apartment.title}`}
                        className={`${css.apartmentImage} ${
                          selectedPhoto?.photo === photo ? css.activePhoto : ''
                        }`}
                        onClick={() =>
                          handlePhotoClick(photo, apartment.id, index)
                        }
                      />
                    ))}

                  {selectedPhoto?.apartmentId === apartment.id &&
                    isPhotoModalOpen && (
                      <PhotoModal
                        apartment={apartment}
                        selectedPhoto={selectedPhoto}
                        photoIndex={photoIndex}
                        onClose={handleClosePhotoModal}
                        onPrevPhoto={handlePrevPhoto}
                        onNextPhoto={handleNextPhoto}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    )}
                </div>
              )}
              {/* #endregion */}
            </li>
          ))}
        </ul>
      </div>

      {/* #region modalOverlay */}
      {isModalOpen && (
        <div className={css.modalOverlay}>
          <ApartmentModal
            apartment={editingApartment}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        </div>
      )}
      {/* #endregion */}
    </>
  );
};

export default ApartmentList;
