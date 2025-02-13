import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addApartment, AppDispatch, fetchApartments, updateApartment } from '../../store';
import styles from './ApartmentModal.module.css';
import { Apartment, FormDataState } from '../../interfaces/apartment.types.ts';
import { BASE_URL } from '../../services/api.ts';

interface ApartmentModalProps {
  apartment?: Apartment,
  onClose: () => void,
  onSave?: (apartment: Apartment) => Promise<void>
}

const ApartmentModal: FC<ApartmentModalProps> = ({ apartment, onClose}) => {
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
      price: apartment?.price || 10,
      rooms: apartment?.rooms || 1,
      photos: [],
      photoPreviews: apartment?.photos || [],
    });
  }, [apartment]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
          ...fileArray.map(file => URL.createObjectURL(file))
        ]
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
        const existingCount = prev.photoPreviews.filter(url => !url.startsWith('blob:')).length;
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
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('price', formData.price.toString());
    formDataToSend.append('rooms', formData.rooms.toString());

    formData.photos.forEach((photo) => {
      formDataToSend.append('photos', photo);
    });

    formDataToSend.append('photosToRemove', JSON.stringify(photosToRemove));

    try {
      if (apartment) {
        await dispatch(updateApartment({ id: apartment.id, formData: formDataToSend }));
      } else {
        await dispatch(addApartment(formDataToSend));
      }

      setSuccess(true);

      setTimeout(async () => {
        setSuccess(false);
        onClose();
        await dispatch(fetchApartments({}));
      }, 2000);
    } catch (error) {
      console.error('Error saving apartment:', error);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2>{apartment ? 'Edit Apartment' : 'Add Apartment'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            className={styles.input}
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Заголовок"
            maxLength={90}
            required
          />
          <textarea
            className={styles.input}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Опис"
            maxLength={335}
            required
          />
          <input
            className={styles.input}
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Ціна"
            required
          />
          <select
            className={styles.input}
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

          <label htmlFor="photos">Завантажити фото:</label>
          <input type="file" name="photos" id="photos" multiple onChange={handlePhotoChange} />

          <div className={styles.photoPreviewsContainer}>
            {formData.photoPreviews.map((photo, index) => (
              <div key={index} className={styles.photoPreviewWrapper}>
                <img
                  src={photo.startsWith('blob:') ? photo : `${BASE_URL}${photo}`}
                  alt={`Перегляд: ${index}`}
                  className={styles.photoPreview}
                />
                <button
                  type="button"
                  className={styles.deletePhotoButton}
                  onClick={() => handleDeletePreview(index)}
                >
                  Видалити
                </button>
              </div>
            ))}
          </div>

          <div className={styles.buttonsContainer}>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelButton}
              disabled={success}
            >
              Закрити
            </button>
            <button type="submit" className={styles.saveButton} disabled={success}>
              {apartment ? 'Змінити' : 'Додати'}
            </button>
          </div>
          {success && (
            <p>
              Квартира {apartment ? 'змінена' : 'додана'} успішно!
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApartmentModal;
