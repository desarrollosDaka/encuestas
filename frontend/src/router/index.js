import { createRouter, createWebHistory } from 'vue-router'
import obtenerCookiesUsuario  from '../composables/cookies'
// import AboutView from '../views/aboutView.vue'
// import Auth from '../views/authView.vue'
//import NoFoundPage from '../views/noFoundPageView.vue'
// import MySurveysView from '@/views/mySurveysView.vue'
 import IsActiveUuid from '../composables/isActiveUuid'
// import Profile from '../views/profileUserView.vue'
// import CreateUsersView from '../views/createUsersView.vue'
// import CreateSurvey from '../views/createSurveyView.vue'
// import TakeSurvey from '../views/takeSurveyView.vue'
// import EndSurvey from '../views/endSurveyView.vue'
// import SurveyResult from '../views/surveyResultView.vue'
// import Library from '../views/libraryView.vue'
// import DrapDrop from '../views/orderQuestionsView.vue'
const routes = [
 

    
    {
        path: '/',
        name: '/',
        component: () => import('@/views/aboutView.vue'),
        meta:{
          requireAuth: true
        }
      },
      
      {
        path: '/profileuser',
        name: 'profile',
        component: () => import('@/views/profileUserView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/auth',
        name: 'auth',
        component: () => import('@/views/authView.vue'),
        meta:{
          requireAuth: false
        }
      },

      {
        path: '/mysurveys',
        name: 'mysurveys',
        component: () => import('@/views/mySurveysView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/createUsers',
        name: 'createUsers',
        component: () => import('@/views/createUsersView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/createSurvey/:id?',
        name: 'createSurvey',
        component: () => import('@/views/createSurveyView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/t/:id',
        name: 'takeSurvey',
        component: () => import('@/views/takeSurveyView.vue'),
        meta:{
          requireAuth: false
        }
      },

      {
        path: '/endSurvey/:id?/:idEncuesta?', //parametro opcional 
        name: 'endSurvey',
        component: () => import('@/views/endSurveyView.vue'),
        meta:{
          requireAuth: false
        }
      },

      {
        path: '/SurveyResult/:id?/:idUser?',
        name: 'SurveyResult',
        component: () => import('@/views/surveyResultView.vue'),
        meta:{
          requireAuth: false
        }
      },

      {
        path: '/Library/:id',
        name: 'library',
        component: () => import('@/views/libraryView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/OrderQuestions/:id',
        name: 'OrderQuestions',
        component: () => import('@/views/orderQuestionsView.vue'),
        meta:{
          requireAuth: true
        }
      },

      {
        path: '/:pathMatch(.*)*',
        name: 'nofoundpage',
        component: () => import('@/views/noFoundPageView.vue'),
        meta:{
          requireAuth: false
        }
      },

      
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


  router.beforeEach(async (to, from , next) => {

    const objUser = $cookies.get(obtenerCookiesUsuario().nameCookies)
    const uuid = objUser ? objUser.uuid : ''

    let setIsAuthenticated = objUser ? await IsActiveUuid(uuid) : ''

    const needAuth = to.meta.requireAuth

    if(needAuth && !setIsAuthenticated){
      next('auth')
    }else{
      next()
    }
  })

export default router