import { save, load } from './storage.js';
import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

function loadFormData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (error) {
      console.error('Error parsing saved data:', error);
      return null;
    }
  }
  return null;
}

function inputFormFields(formData) {
  const emailInput = feedbackForm.querySelector('input[name="email"]');
  const messageInput = feedbackForm.querySelector('textarea[name="message"]');

  if (formData) {
    emailInput.value = formData.email || '';
    messageInput.value = formData.message || '';
  } else {
    emailInput.value = '';
    messageInput.value = '';
  }
}

const saveFormDataThrottled = throttle(formData => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}, 500);

window.addEventListener('load', () => {
  const savedFormData = loadFormData();
  inputFormFields(savedFormData);
});

feedbackForm.addEventListener('input', () => {
  const emailValue = feedbackForm.querySelector('input[name="email"]').value;
  const messageValue = feedbackForm.querySelector(
    'textarea[name="message"]'
  ).value;

  const formData = {
    email: emailValue,
    message: messageValue,
  };

  saveFormDataThrottled(formData);
});

feedbackForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = loadFormData();

  if (formData) {
    console.log('Form Data:', formData);
    localStorage.removeItem(STORAGE_KEY);
  }
});
