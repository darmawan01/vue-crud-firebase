import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import MeetUp from '@/components/meetup/MeetUp'
import ShowMeetup from '@/components/meetup/ShowMeetup'
import NewMeetup from '@/components/meetup/NewMeetup'
import Profile from '@/components/user/Profile'
import SignIn from '@/components/user/SignIn'
import SignUp from '@/components/user/SignUp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'MeetUp',
      component: MeetUp
    },
    {
      path: '/meetup/new',
      name: 'New MeetUp',
      component: NewMeetup
    },
    {
      path: '/meetup/:id',
      name: 'Show Meetup',
      props: true,
      component: ShowMeetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    }
  ],
  mode: 'history'
})
