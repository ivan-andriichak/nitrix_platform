import {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addApartment, AppDispatch, deleteApartment, fetchApartments, RootState, updateApartment} from '../../store';
import ApartmentModal from '../ApartmentModal/ApartmentModal';
import css from './ApartmentList.module.css';
import clear_icon from '../../images/SVG/clear_icon.svg';
import {Apartment} from "../../interfaces/apartment.types.ts";

const BASE_URL = 'http://localhost:5000'; // Бекенд працює локально

interface GenresProps {
  onClose?: () => void;
}

const ApartmentList: FC<GenresProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { apartments, loading, error } = useSelector((state: RootState) => state.apartment);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingApartment, setEditingApartment] = useState<Apartment | undefined>(undefined);
  const [selectedPhoto, setSelectedPhoto] = useState<{ photo: string; apartmentId: string } | null>(null);

  useEffect(() => {
    dispatch(fetchApartments());
  }, [dispatch]);

  console.log(apartments);

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
    const isConfirmed = window.confirm('Are you sure you want to delete this apartment?');
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

  const handleSave = async (apartment: any) => {
    if (apartment.id) {
      await dispatch(updateApartment(apartment));
    } else {
      await dispatch(addApartment(apartment));
    }
    setIsModalOpen(false);
  };

  const handlePhotoClick = (photo: string, apartmentId: string) => {
    setSelectedPhoto({ photo, apartmentId });
  };

  return (
    <>
      <div className={css.apartmentListContainer}>
        <button className={css.addApartmentButton} onClick={handleAdd}>
          Додати квартиру
        </button>

        <button className={css.closeButton} onClick={onClose}>
          <img src={clear_icon} alt="clear_icon"/>
        </button>
        <div className={css.apartmentList}>
          <ul>
            {apartments.map((apartment) => (
              <li key={apartment.id} className={css.apartmentListItem}>
                <div className={css.apartmentInfo}>
                  <h3 className={css.apartmentTitle}>{apartment.title}</h3>
                  <p className={css.apartmentDescription}>{apartment.description}</p>
                  <p className={css.apartmentDescription}>Ціна: ${apartment.price}</p>
                  <p className={css.apartmentDescription}>Кімнати : {apartment.rooms}</p>
                </div>
                {apartment.photos && apartment.photos.length > 0 && (

                  <div className={css.apartmentPhotos}>
                    {apartment.photos.map((photo: string) => (
                      <img
                        key={`${photo}`}
                        src={`${BASE_URL}${photo}`}
                        alt={`photo: ${apartment.title}`}
                        className={css.apartmentImage}
                        onClick={() => handlePhotoClick(photo, apartment.id)}
                      />
                    ))}


                  </div>
                )}

                <div className={css.photoModalContainer}>
                  {selectedPhoto?.apartmentId === apartment.id && (
                    <div className={css.photoModal} onClick={() => setSelectedPhoto(null)}>
                      <img src={`${BASE_URL}${selectedPhoto.photo}`} alt="Enlarged" className={css.enlargedPhoto}/>
                    </div>
                  )}
                </div>

                <div className={css.buttonContainer}>
                  <button className={css.editButton} onClick={() => handleEdit(apartment)}>
                    Редагувати
                  </button>
                  <button className={css.deleteButton} onClick={() => handleDelete(apartment.id)}>
                    Видалити
                  </button>
                </div>

              </li>
            ))}
          </ul>
        </div>

        {isModalOpen && (
          <div className={css.modalOverlay}>
            <ApartmentModal
              apartment={editingApartment}
              onClose={() => setIsModalOpen(false)}
              onSave={handleSave}
            />
          </div>
        )}
      </div>
    </>
  );
};

export {ApartmentList};