import './index.scss';
import {ErrorPage, LoginPage, NotFoundPage, ProfilePage, RegisterPage} from "./pages";

function renderPage(page: string) {
  let pageComponent;

  switch (page) {
    case 'register':
      pageComponent = new RegisterPage();
      break;
    case 'profile':
      pageComponent = new ProfilePage();
      break;
    case 'chat':
      pageComponent = new RegisterPage();
      break;
    case '404':
      pageComponent = new NotFoundPage({});
      break;
    case '5xx':
      pageComponent = new ErrorPage({});
      break;
    case 'login':
    default:
      pageComponent = new LoginPage();
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
  const page = window.location.pathname.substring(1);
  renderPage(page);
});
