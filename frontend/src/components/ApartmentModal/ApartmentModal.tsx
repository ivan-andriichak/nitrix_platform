import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  addApartment,
  AppDispatch,
  fetchApartments,
  updateApartment,
} from '../../store';
import css from './ApartmentModal.module.css';
import { Apartment, FormDataState } from '../../interfaces/apartment.types';
import { BASE_URL } from '../../services/api';

interface ApartmentModalProps {
  apartment?: Apartment;
  onClose: () => void;
  onSave?: (apartment: Apartment) => Promise<void>;
}

const ApartmentModal: FC<ApartmentModalProps> = ({ apartment, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const [photosToRemove, setPhotosToRemove] = useState<string[]>([]);

  const [formData, setFormData] = useState<FormDataState>({
    title: '',
    description: '',
    price: 0,
    rooms: 0,
    photos: [] as File[],
    photoPreviews: [] as string[],
  });

  useEffect(() => {
    setFormData({
      title: apartment?.title || '',
      description: apartment?.description || '',
      price: apartment?.price ?? 0,
      rooms: apartment?.rooms || 1,
      photos: [],
      photoPreviews: apartment?.photos || [],
    });
  }, [apartment]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]:
        name === 'price' || name === 'rooms'
          ? Number(value)
          : value,
    }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...fileArray],
        photoPreviews: [
          ...prev.photoPreviews,
          ...fileArray.map(file => URL.createObjectURL(file)),
        ],
      }));
    }
  };

  const handleDeletePreview = (index: number) => {
    setFormData(prev => {
      const newPreviews = [...prev.photoPreviews];
      const removedPreview = newPreviews.splice(index, 1)[0];

      if (!removedPreview.startsWith('blob:')) {
        setPhotosToRemove(prevRemove => [...prevRemove, removedPreview]);
      } else {
        const existingCount = prev.photoPreviews.filter(
          url => !url.startsWith('blob:')
        ).length;
        if (index >= existingCount) {
          const newFileIndex = index - existingCount;
          const newPhotos = [...prev.photos];
          if (newFileIndex < newPhotos.length) {
            newPhotos.splice(newFileIndex, 1);
            return {
              ...prev,
              photoPreviews: newPreviews,
              photos: newPhotos,
            };
          }
        }
      }
      return {
        ...prev,
        photoPreviews: newPreviews,
      };
    });
  };

  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!apartment && formData.photoPreviews.length === 0) {
      alert('Будь ласка, завантажте хоча б одне фото.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('rooms', formData.rooms.toString());

    formData.photos.forEach(photo => {
      formDataToSend.append('photos', photo);
    });

    formDataToSend.append('photosToRemove', JSON.stringify(photosToRemove));

    try {
      if (apartment) {
        await dispatch(
          updateApartment({ id: apartment.id, formData: formDataToSend })
        );
      } else {
        await dispatch(addApartment(formDataToSend));
      }

      setSuccess(true);

      setTimeout(async () => {
        setSuccess(false);
        onClose();
        await dispatch(fetchApartments({}));
      }, 500);
    } catch (error) {
      console.error('Error saving apartment:', error);
    }
  };
// _____________________________________________________________________________________
  return (
    <div className={css.modalOverlay} onClick={onClose}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <h2 style={{ color: 'darkgreen' }}>
          {apartment ? 'Редагувати квартиру' : 'Додати квартиру'}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            className={css.input}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Заголовок"
            maxLength={90}
            required
          />
          <textarea
            className={css.input}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опис"
            maxLength={335}
            required
          />
          <input
            className={css.input}
            name="price"
            type="number"
            value={formData.price || ''}
            onChange={handleChange}
            placeholder="Ціна"
            required
          />
          <select
            className={css.input}
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            required
          >
            {[1, 2, 3].map(num => (
              <option key={num} value={num}>
                {num} Квартира(ри)
              </option>
            ))}
          </select>

          <label style={{ color: 'darkgreen' }} htmlFor="photos">
            Завантажити фото:
          </label>
          <input
            type="file"
            name="photos"
            id="photos"
            multiple
            onChange={handlePhotoChange}
          />

          <div className={css.photoPreviewsContainer}>
            {formData.photoPreviews.map((photo, index) => (
              <div key={index} className={css.photoPreviewWrapper}>
                <img
                  src={photo.startsWith('blob:') ? photo : `${BASE_URL}${photo}`}
                  alt={`Preview: ${index}`}
                  className={css.photoPreview}
                />
                <button
                  type="button"
                  className={css.deletePhotoButton}
                  onClick={() => handleDeletePreview(index)}
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>

          <div className={css.buttonsContainer}>
            <button
              type="button"
              onClick={onClose}
              className={css.cancelButton}
              disabled={success}
            >
              Закрити
            </button>
            <button type="submit" className={css.saveButton} disabled={success}>
              {apartment ? 'Змінити' : 'Додати'}
            </button>
          </div>
          {success && (
            <p>Квартира {apartment ? 'змінена' : 'додана'} успішно!</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApartmentModal;
