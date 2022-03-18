const pipe_manage = () =>
  import("@/views/main/pipe/pipe_manage/pipe_manage.vue");

export default {
  path: "/main/pipe/pipe_manage",
  name: "pipe_manage",
  component: pipe_manage,
  children: [],
};
