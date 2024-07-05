import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';

type PageType = 'chat' | 'login' | 'register' | 'profile' | '404' | '5xx';

const pages: Record<PageType, [string, any?]> = {
    'chat': [Pages.ChatPage],
    'login': [Pages.LoginPage],
    'register': [Pages.RegisterPage],
    'profile': [Pages.ProfilePage],
    '404': [Pages.NotFoundPage],
    '5xx': [Pages.ErrorPage]
};

Object.entries(Components).forEach(([name, component]) => {
    Handlebars.registerPartial(name, component);
});

function navigate(page: PageType) {
    const [source, args] = pages[page];
    const handlebarsFunct = Handlebars.compile(source);
    document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('login'));

document.addEventListener('click', (e: Event) => {
    const target = e.target as HTMLElement;
    const page = target.getAttribute('page') as PageType | null;
    if (page) {
        navigate(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
