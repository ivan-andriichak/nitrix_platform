import { FC } from 'react';
import css from './PhotoModal.module.css';
import { Apartment } from '../../interfaces/apartment.types';
import { BASE_URL } from '../../services/api';

interface PhotoModalContainerProps {
  apartment: Apartment;
  selectedPhoto: { photo: string; apartmentId: string };
  photoIndex: number | null;
  onClose: () => void;
  onPrevPhoto: () => void;
  onNextPhoto: () => void;
  onEdit: (apartment: Apartment) => void;
  onDelete: (id: string) => void;
}

const PhotoModal: FC<PhotoModalContainerProps> = ({
                                                    apartment,
                                                    selectedPhoto,
                                                    photoIndex,
                                                    onClose,
                                                    onPrevPhoto,
                                                    onNextPhoto,
                                                    onEdit,
                                                    onDelete,
                                                  }) => {
  return (
    <div className={css.overlay}>
      <div className={css.photoModalContainer}>
        <button className={css.closeButton} onClick={onClose}>
          ✖
        </button>

        <div className={css.photoModal}>
          <button
            className={css.photoModalPrev}
            onClick={onPrevPhoto}
            style={{
              fontSize: '2rem',
              margin: '5px',
              opacity: photoIndex === 0 ? 0.5 : 1,
              cursor: photoIndex === 0 ? 'not-allowed' : 'pointer',
            }}
            disabled={photoIndex === 0}>
            ❮
          </button>

          {selectedPhoto && selectedPhoto.photo && (
            <img
              src={`${BASE_URL}${selectedPhoto.photo}`}
              alt="Enlarged"
              className={css.enlargedPhoto}
            />
          )}

          <button
            className={css.photoModalNext}
            onClick={onNextPhoto}
            style={{
              fontSize: '2rem',
              margin: '5px',
              opacity:
                photoIndex === (apartment.photos?.length ?? 0) - 1 ? 0.5 : 1,
              cursor:
                photoIndex === (apartment.photos?.length ?? 0) - 1
                  ? 'not-allowed'
                  : 'pointer',
            }}
            disabled={photoIndex === (apartment.photos?.length ?? 0) - 1}>
            ❯
          </button>
        </div>

        <div className={css.apartmentInfo}>
          <div className={css.apartmentInfoText}>
            <h3 className={css.apartmentTitle}>{apartment.title}</h3>
            <p className={css.apartmentDescription}>{apartment.description}</p>
            <p className={css.apartmentDescription}>Ціна: ${apartment.price}</p>
            <p className={css.apartmentDescription}>
              Кімнати : {apartment.rooms}
            </p>
          </div>

          <div className={css.buttonContainer}>
            <button className={css.editButton} onClick={() => onEdit(apartment)}>
              Редагувати
            </button>
            <button
              className={css.deleteButton}
              onClick={() => onDelete(apartment.id)}>
              Видалити
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PhotoModal };
