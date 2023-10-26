// eslint-disable-next-line no-undef
const URL_PARAMS = new URLSearchParams(window.location.search);
const TOKEN = URL_PARAMS.get('token');

// Show an element
const show = (selector) => {
  // eslint-disable-next-line no-undef
  document.querySelector(selector).style.display = 'block';
};

// Hide an element
const hide = (selector) => {
  // eslint-disable-next-line no-undef
  document.querySelector(selector).style.display = 'none';
};

if (TOKEN) {
  hide('.content.unauthorized');
  show('.content.authorized');
}