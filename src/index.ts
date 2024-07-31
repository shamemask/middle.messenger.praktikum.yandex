
import './index.scss';
import RegisterPage from "./pages/register";
import LoginPage from "./pages/login";

function renderPage(page: string) {
  let pageComponent;

  switch(page) {
    case 'register':
      pageComponent = new RegisterPage({});
      break;
    case 'login':
    default:
      pageComponent = new LoginPage({});
      break;
  }
  console.log(pageComponent);
  const app = document.getElementById('app');
  if (app) {
    app.innerHTML = '';
    app.appendChild(pageComponent.getContent()!);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.includes('register') ? 'register' : 'login';
  renderPage(page);
});
