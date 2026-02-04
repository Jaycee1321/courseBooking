// After bootstrap installation, import bootstrap in main.js to be able to use bootstrap in all components.
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import "notyf/notyf.min.css";
import "./assets/main.css";

import { createApp } from "vue";
//createPinia is imported from pinia
import { createPinia } from "pinia";
import App from "./App.vue";

//Import page components that will be added into the routes.
import HomePage from "./pages/HomePage.vue";
import CoursesPage from "./pages/CoursesPage.vue";
import RegisterPage from "./pages/RegisterPage.vue";
import LoginPage from "./pages/LoginPage.vue";
import LogoutPage from "./pages/LogoutPage.vue";
import NewsPage from "./pages/NewsPage.vue";
import ErrorPage from "./pages/ErrorPage.vue";
import ProfilePage from "./pages/ProfilePage.vue";

import AddCourse from "./pages/AddCourse.vue";

//vue-router is a package
//import createRouter and createWebHistory hooks from vue-router
/*
  - createWebHistory() and createRouter() are two functions for routing in Vue.js applications.
  - createWebHistory() creates a history object based on the HTML History API, which allows us to modify the browser URL without triggering a full page refresh. It creates a history object that is passed to the createRouter() function.
  - createRouter() is a function that creates a new router instance. It takes an object as argument with properties that describes the routes for the application, and an optional history object.
  - The createRouter() function returns a router instance that can be used to navigate between routes in the application.
*/
import { createRouter, createWebHistory } from "vue-router";
import ViewCourse from "./pages/ViewCourse.vue";

/*
  - The routes property contains an array of routes.
  
  Each route object contains:
    - a path property which describes the endpoint of the url to the page.
    - a name property to describe the route. It can be used for navigating using vue-router.
    - a component property which is the component to be displayed.

  - Router switches the components displayed based on the matched URL endpoint.

  - If the browser URL is "/courses", then the router will cycle through our routes to match the endpoint and display the appropriate component.
*/
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomePage,
        },
        {
            path: "/courses",
            name: "Courses",
            component: CoursesPage,
        },
        {
            path: "/register",
            name: "Register",
            component: RegisterPage,
        },
        {
            path: "/login",
            name: "Login",
            component: LoginPage,
        },
        {
            path: "/logout",
            name: "Logout",
            component: LogoutPage,
        },
        {
            path: "/news",
            name: "News",
            component: NewsPage,
        },
        {
            path: "/profile",
            name: "Profile",
            component: ProfilePage,
        },
        {
            path: "/addCourse",
            name: "AddCourse",
            component: AddCourse,
        },
        {
            //This route allows the use of a params, denoted by a colon.
            //Which means we can switch to this page and pass data in the url.
            //ex. /courses/1234
            //We can then retrieve the data passed from the url as id.
            path: "/courses/:id",
            component: ViewCourse,
        },
        {
            path: "/:catchAll(.*)",
            component: ErrorPage,
        },
    ],
});

/* 
	- Every Vue application starts by creating a new application instance with the createApp function.
	- We then pass the App component into the createApp method. 
	- The App component is a "root component" that can contain other components as its children.    
	- The mount() method is used to render/inject the root component into the selected element from the DOM by its id.
*/
//Create an Vue Instance for application and save it as app so we can use its other methods.
const app = createApp(App);
//createPinia() is a library that will allow us to use and manage Pinia stores in our application.
app.use(createPinia());
//app.use() will allow us to use global libraries to our Vue application such as router.
app.use(router);
//mount our Vue instance in the specified element in our DOM.
app.mount("#app");
