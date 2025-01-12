import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout";

Vue.use(VueRouter)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单跳转当前页面报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: "/",
    component: Layout, // 修改为 Layout 组件
    children: [
      {
        path: 'home',
        component: () => import( '../views/Home.vue'),
        name: 'home'
      },
      {
        path: "judge/personal-summary",
        name: "JudgePersonalSummary",
        component: () => import("../views/judges/JudgePersonalSummary.vue"),
      },
      {
        path: "judge/research",
        name: "JudgeResearch",
        component: () => import("../views/judges/JudgeResearch.vue"),
      },
      {
        path: "student/personal-summary",
        name: "StudentPersonalSummary",
        component: () => import("../views/students/StudentPersonalSummary.vue"),
      },
      {
        path: "student/research",
        name: "StudentResearch",
        component: () => import("../views/students/StudentResearch.vue"),
      },
      {
        path: "judge/social",
        name: "StudentSocialExperience",
        component: () => import("../views/judges/SocialExperience.vue"),
      },
      {
        path: "student/social",
        name: "UploadSocialExperience",
        component: () => import("../views/students/SocialUpload.vue"),
      },
      {
        path: "judge/service",
        name: "StudentServiceWorks",
        component: () => import("../views/judges/ServiceWorks.vue"),
      },
      {
        path: "student/service",
        name: "UploadServiceWork",
        component: () => import("../views/students/ServiceUpload.vue"),
      },
      {
        path: "stumanager/gradesum",
        name: "StuManagergradesum",
        component: () => import("../views/stumanager/stumanagergrade/StuManagerGradeSum.vue"),
      },
      {
        path: "stumanager/gradenonsum",
        name: "StuManagergradenonsum",
        component: () => import("../views/stumanager/stumanagergrade/StuManagerGradeNonSum.vue"),
      },
      {
        path: "stumanager/eximport",
        name: "StuManagerExImport",
        component: () => import("../views/stumanager/StuManagerExImport.vue"),
      },
      {
        path: "judge/volunteer-service",
        name: "JudgeVolunteerService",
        component: () => import("../views/judges/JudgeVolunteerService.vue"),
      },
      {
        path: "judge/GPA",
        name: "JudgeGPA",
        component: () => import("../views/judges/JudgeGPA.vue"),
      },
      {
        path: "student/volunteer-service",
        name: "StudentVolunteerService",
        component: () => import("../views/students/StudentVolunteerService.vue"),
      },
      {
        path: "student/GPA",
        name: "StudentGPA",
        component: () => import("../views/students/StudentGPA.vue"),
      }
    ],
  },
  {
    path: '/beforelogin',
    component: () => import('../views/BeforeLogin.vue'),
    name: 'beforelogin',
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
