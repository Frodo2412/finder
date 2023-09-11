'use client';

import Alert from '@/components/common/Alert';
import AlertSuccess from '@/components/common/AlertSuccess';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import TextArea from '@/components/common/TextArea';
import strings from '@/locales/strings.json';
import { useState } from 'react';

type PersonalInfoFormData = {
  name: string;
  birthdate: string;
  biography: string;
};

export default function FormPersonalInfo() {
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    name: '',
    birthdate: '',
    biography: '',
  });
  const [touched, setTouched] = useState({
    name: false,
    birthdate: false,
    biography: false,
  });
  const [successVisible, setSuccessVisible] = useState<boolean>(false);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const HandleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccessVisible(false);
    setErrorVisible(false);

    const isCurrentFormValid = event.currentTarget.checkValidity();

    if (!isCurrentFormValid) {
      setErrorMessage('Por favor rellene todos los campos correctamente');
      setErrorVisible(true);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || strings.common.error.unexpectedError
        );
      }
      setSuccessVisible(true);
      setSuccessMessage('Los cambios se han efectuado con exito');
    } catch (error) {
      setErrorMessage('Ocurrio un error inesperado, intenta de nuevo');
      setErrorVisible(true);
    }
  };

  const handleCancel = () => {
    setSuccessVisible(false);
    setErrorVisible(false);
    setFormData({
      biography: '',
      birthdate: '',
      name: '',
    });
    setTouched({
      biography: false,
      birthdate: false,
      name: false,
    });
  };

  return (
    <div className='mt-3 sm:w-full'>
      <form
        className='grid grid-rows-personal-info-form gap-5 pl-7 pr-7'
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          type='text'
          id='name'
          name='name'
          label={strings.configProfile.forms.personalInfo.nameInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.nameInput.placeholder
          }
          required
          value={formData.name}
          onChange={handleChange}
          touched={touched.name}
        />
        <Input
          type='date'
          id='birthdate'
          name='birthdate'
          label={strings.configProfile.forms.personalInfo.birthdateInput.label}
          placeholder={
            strings.configProfile.forms.personalInfo.birthdateInput.placeholder
          }
          required
          value={formData.birthdate}
          onChange={handleChange}
          touched={touched.birthdate}
        />
        <div className='block w-full'>
          <TextArea
            id='biography'
            name='biography'
            type='string'
            label={strings.configProfile.forms.personalInfo.bioTextArea.label}
            placeholder={
              strings.configProfile.forms.personalInfo.bioTextArea.placeholder
            }
            value={formData.biography}
            onChange={HandleChangeTextArea}
          />
          <div className='mt-5'>
            <AlertSuccess
              isVisible={successVisible}
              successMessage={successMessage}
            />
          </div>
          <div className='mt-5'>
            <Alert isVisible={errorVisible} errorMessage={errorMessage} />
          </div>

          <div className='mt-4 flex justify-end gap-3'>
            <Button
              type='button'
              id='cancel-button'
              text={strings.configProfile.forms.personalInfo.cancelButton.text}
              onClick={handleCancel}
              className='w-1/2 bg-red-700 hover:bg-red-400 hover:text-white'
            />
            <Button
              type='submit'
              id='confirm-button'
              text={strings.configProfile.forms.personalInfo.submitButton.text}
            />
          </div>
        </div>
      </form>
    </div>
  );
}
