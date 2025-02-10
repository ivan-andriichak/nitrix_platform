import { FC } from 'react';
import { useForm } from 'react-hook-form';

import css from './UserInfo.module.css';

interface UserInfoProps {
    onClose: () => void;
}

const UserInfo: FC<UserInfoProps> = ({onClose}) => {
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={css.form}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        placeholder="Номер телефону, ім'я користувача"
                        type="text" id="username" {...register('username', {required: true})} />
                    {errors.username && <span>Це поле обов'язкове</span>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        placeholder="Електронна пошта"
                        type="email" id="email" {...register('email', {required: true, pattern: /^\S+@\S+$/i})} />
                    {errors.email && <span>Введіть коректну електронну адресу</span>}
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        placeholder="Пароль"
                        type="password" id="password" {...register('password', {required: true, minLength: 6})} />
                    {errors.password && <span>Пароль повинен містити принаймні 6 символів</span>}
                </div>
                <button type="submit" onClick={onClose}>Зареєструватися</button>
                <button type="button" onClick={onClose}>Закрити</button>
            </div>
        </form>
    );
};

export {UserInfo};
